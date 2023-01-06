import { Router } from "express";
import { Posts, Likes } from "../models.js";
import validateToken from "../middlewares/AuthMiddleware.js";

const postRouter = Router();

postRouter.get("/", validateToken, async (req, res) => {
  const listOfPost = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPost, likedPosts });
});

postRouter.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

postRouter.get("/byUserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

postRouter.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

postRouter.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update(
    { title: newTitle },
    {
      where: {
        id: id,
      },
    }
  );
  res.json(newTitle);
});

postRouter.put("/postText", validateToken, async (req, res) => {
  const { newPostText, id } = req.body;
  await Posts.update(
    { postText: newPostText },
    {
      where: {
        id: id,
      },
    }
  );
  res.json(newPostText);
});

postRouter.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({ where: { id: postId } });
  res.json("Başarılı Olarak Silindi");
});

export default postRouter;
