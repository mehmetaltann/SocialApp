import { Router } from "express";
import { Users } from "../models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateToken from "../middlewares/AuthMiddleware.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Success");
  });
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (user) {
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const accessToken = jwt.sign(
          { username: user.username, id: user.id },
          "sivefa"
        );

        res.json({ token: accessToken, username: username, id: user.id });
      } else {
        res.json({ error: "Girilen Şifre Hatalıdır" });
      }
    });
  } else {
    res.json({ error: "Kullanıcı Bulunamadı" });
  }
});

userRouter.get("/test", validateToken, (req, res) => {
  res.json(req.user);
});

userRouter.get("/basicInfo/:id", async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(basicInfo);
});

userRouter.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) {
      res.json({ err: "Eski Şifreyi Yanlış Girdiniz" });
    } else {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          { password: newPassword },
          { where: { username: req.user.username } }
        );
        res.json({ err: "Şifre Başarıyla Değiştirildi" });
      });
    }
  });
});

export default userRouter;
