import { Router } from "express";
import { Comments } from "../models.js";
import validateToken from "../middlewares/AuthMiddleware.js";

const commentRouter = Router();

commentRouter.get("/:postid", async (req, res) => {
  const postid = req.params.postid;
  const comments = await Comments.findAll({ where: { PostId: postid } });
  res.json(comments);
});

commentRouter.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  comment.username = req.user.username;
  await Comments.create(comment);
  res.json(comment);
});

commentRouter.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({ where: { id: commentId } });

  res.json("Başarılı Olarak Silindi");
});

export default commentRouter;
