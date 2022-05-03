import express from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import cors from "cors";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import passportSetup from "./config/passport.js";
import http from "http";
import { CLIENT_URL } from "./utils/constants.js";

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

io.on("connection", (socket) => {
  // Join to chat by id
  socket.on("join_chat", (chat) => {
    socket.join(chat);
    // console.log(`User with Socket ID ${socket.id} joined chat ${chat}`);
  });

  // New message from user to especific chat and send to all users
  socket.on("new_message", (data) => {
    io.to(data.chatId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
