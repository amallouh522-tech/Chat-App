const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const http = require("http");
const {Server} = require("socket.io");
const app = express();
const cors = require("cors");


const server = http.createServer(app);
const io = new Server(server , {
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

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:" + 3000);
});

