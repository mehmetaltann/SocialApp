import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "Kullanıcı Girişi Yapılmadı" });
  } else {
    const validToken = jwt.verify(accessToken, "sivefa");
    req.user = validToken;
    if (validToken) {
      return next();
    } else {
      return res.json({ error: "Kullanıcı Doğulanamadı" });
    }
  }
};

export default validateToken;
