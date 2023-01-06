import express from "express";
import sequelize from "./database.js";
import postRouter from "./routes/PostRouter.js";
import commentRouter from "./routes/CommentRouter.js";
import userRouter from "./routes/UserRouter.js";
import likeRouter from "./routes/LikesRouter.js";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json()); //for jsons
app.use(cors()); //for reacts

app.use("/posts", postRouter); //for routes
app.use("/comments", commentRouter); //for routes
app.use("/auth", userRouter); //for routes
app.use("/likes", likeRouter); //for routes

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server 3001 Portunda Çalışıyor");
  });
});
