const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
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

function generateRID(callback) {
  const RID = Math.floor(Math.random() * 90000) + 10000;

  db.query(
    "SELECT RID FROM users WHERE RID = ?",
    [RID],
    (err, result) => {
      if (err) return callback(err);

      if (result.length > 0) {
        // موجود؟ جرّب واحد جديد
        generateRID(callback);
      } else {
        // تمام، فاضي
        callback(null, RID);
      }
    }
  );
}

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
          req.session.RID = result[0].RID;
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
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ succ: false, msg: "Server error" });
      }

      if (result.length > 0) {
        return res.json({ succ: false, msg: "Username or email already exists" });
      }

      generateRID((err, RID) => {
        if (err) {
          return res.status(500).json({ succ: false, msg: "Server error" });
        }

        db.query(
          "INSERT INTO users (username, password, email, RID) VALUES (?, ?, ?, ?)",
          [username, password, email, RID],
          (err) => {
            if (err) {
              return res.status(500).json({ succ: false, msg: "Server error" });
            }

            res.json({ succ: true, msg: "Signup successful", RID });
          }
        );
      });
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

app.post("/api/addpost", upload.single('img'), (req, res) => {
  const { title, text } = req.body;
  const img = req.file ? req.file.filename : null;
  db.query(
    "INSERT INTO `posts`(`username`, `title`, `Text`, `RID` , `img`, `Likes` ) VALUES ( ? , ? , ? , ?, ? , 0)",
    [req.session.user, title, text, req.session.RID, img],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ succ: false });
      } else {
        if (result.affectedRows > 0) {
          db.query(
            "SELECT `Posts_num` FROM `users` WHERE `RID`=?",
            [req.session.RID],
            (err, result) => {
              if (err) {
                console.error(err);
              }
              if (result.length > 0) {
                const num = result[0].Posts_num;
                db.query(
                  "UPDATE `users` SET `Posts_num`=? WHERE `RID`=?",
                  [num + 1, req.session.RID],
                  () => {

                  }
                )
              }
            }
          )
          res.json({ succ: true });
        } else {
          res.json({ succ: false });
        };
      };
    }
  );
});

app.post("/api/addlike", (req, res) => {
  const { ID } = req.body;
  const username = req.session.user;
  // Check if user already liked this post
  db.query(
    "SELECT * FROM `likes` WHERE post_id = ? AND username = ?",
    [ID, username],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ succ: false });
      }
      if (result.length > 0) {
        // Already liked, so unlike: delete from likes and decrement Likes
        db.query(
          "DELETE FROM `likes` WHERE post_id = ? AND username = ?",
          [ID, username],
          (err, deleteResult) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ succ: false });
            }
            db.query(
              "UPDATE `posts` SET `Likes` = `Likes` - 1 WHERE `ID` = ?",
              [ID],
              (err, updateResult) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ succ: false });
                }
                res.json({ succ: true, liked: false });
              }
            );
          }
        );
      } else {
        // Not liked, so like: insert into likes and increment Likes
        db.query(
          "INSERT INTO `likes` (post_id, username) VALUES (?, ?)",
          [ID, username],
          (err, insertResult) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ succ: false });
            }
            db.query(
              "UPDATE `posts` SET `Likes` = `Likes` + 1 WHERE `ID` = ?",
              [ID],
              (err, updateResult) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ succ: false });
                }
                res.json({ succ: true, liked: true });
              }
            );
          }
        );
      }
    }
  );
});

app.post("/api/getprofile", (req, res) => {
  const { ID } = req.body;
  if (ID === null) {
    db.query(
      "SELECT * FROM `users` WHERE RID=?",
      [req.session.RID],
      (err, result) => {
        if (err) {
          console.error("Err In '/api/getprofile'" + err);
        }
        if (result.length > 0) {
          res.json({ succ: true, result: result });
        } else {
          res.json({ succ: false })
        }
      }
    );
  } else {
    db.query(
      "SELECT * FROM `users` WHERE RID=?",
      [ID],
      (err, result) => {
        if (err) {
          console.error("Err In '/api/getprofile'" + err);
        }
        if (result.length > 0) {
          res.json({ succ: true, result: result });
        } else {
          res.json({ succ: false })
        }
      }
    );
  };
});

app.post("/api/getprofileposts", (req, res) => {
  const { ID } = req.body;
  const RID = ID ?? req.session.RID;

  db.query(
    "SELECT * FROM `posts` WHERE RID=? ORDER BY ID DESC",
    [RID],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ result: [] });
      }
      res.json({ result });
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
            io.emit("getPosts", result);
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

