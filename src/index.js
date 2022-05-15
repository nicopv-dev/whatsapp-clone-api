import express from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import cors from "cors";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import passportSetup from "./config/passport.js";
import http from "http";
import { CLIENT_URL } from "./utils/constants.js";
import Users from "./utils/users.js";

// Routes
import AuthRoutes from "./routes/auth.js";
import { findUsers } from "./controllers/searchUser.js";
import ChatRoutes from "./routes/chat.routes.js";
import MessageRoutes from "./routes/message.routes.js";
import UserRoutes from "./routes/user.routes.js";

// constants
const app = express();
const SERVER_PORT = 8000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["Nicolas"],
    maxAge: 1000 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

passportSetup();

app.use("/api/auth", AuthRoutes);
app.get("/api/search", findUsers);
app.use("/api/chats", ChatRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/users", UserRoutes);

const users = new Users();

io.on("connection", (socket) => {
  // User connected
  socket.on("user_connected", (user) => {
    console.log("new user connection...");
    const newUser = {
      userId: user._id,
      socketId: socket.id,
    };
    const usersExist = users.verifyUserExist(newUser);
    if (!usersExist) {
      users.addUser(newUser);
    }
    io.sockets.emit("users", users.getAllUsers());
  });

  // Join to chat by chatId / chat
  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
  });

  // New message from user to especific chat and send to all users
  socket.on("new_message", (data) => {
    io.to(data.chatId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    users.deleteUser(socket.id);
    io.sockets.emit("users", users.getAllUsers());
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
