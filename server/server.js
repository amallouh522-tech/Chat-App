const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to your client URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const db = mysql.createConnection({
  host: "localhost",
  database: "Chati",
  password: "",
  user: "root",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database.");
  }
});

app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors({
  origin: "*", // Adjust this to your client URL
  methods: ["GET", "POST"],
  credentials: true,
}));

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM `users` WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.error("Error during login query:", err);
        res.status(500).json({ succ: false, msg: "Server error" });
      } else {
        if (result.length > 0) {
          req.session.user = username;
          req.session.IsLoggedIn = true;
          res.json({ succ: true, msg: "Login successful" });
        } else {
          res.json({ succ: false, msg: "Invalid credentials" });
        };
      };
    }
  );
});

app.post("/api/signup", (req, res) => {
  const { username, password, email } = req.body;
  db.query(
    "INSERT INTO `users` (username , password , Email) VALUES ( ? , ? , ? )",
    [username, password, email],
    (err, result) => {
      if (err) {
        console.error("Error during signup query:", err);
        res.status(500).json({ succ: false, msg: "Server error" });
      } else {
        res.json({ succ: true, msg: "Signup successful" });
      };
    }
  );
});

app.post("/api/mustlogin", (req, res) => {
  if (req.session.IsLoggedIn) {
    res.json({ Islogin: true });
  } else {
    res.json({ Islogin: false });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      res.status(500).json({ succ: false, msg: "Server error" });
    } else {
      res.json({ succ: true, msg: "Logout successful" });
    }
  });
});

app.post("/api/getusername", (req, res) => {
  if (req.session.IsLoggedIn) {
    res.json({ succ: true, username: req.session.user });
  } else {
    res.json({ succ: false });
  };
});

app.post("/api/addpost", (req, res) => {
  const { title, text } = req.body;
  db.query(
    "INSERT INTO `posts`(`username`, `title`, `Text`) VALUES ( ? , ? , ?)",
    [req.session.user, title, text],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        if (result.affectedRows > 0) {
          res.json({ succ: true });
        } else {
          res.json({ succ: false });
        };
      };
    }
  );
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("loadPosts", () => {
    db.query(
      "SELECT * FROM `posts` ORDER BY ID DESC",
      [],
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          if (result.length > 0) {
            socket.emit("getPosts", result);
          };
        };
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:" + 3000);
});

