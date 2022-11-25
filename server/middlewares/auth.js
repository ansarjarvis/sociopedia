import jwt from "jsonwebtoken";

/* Authorization */
export let varifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.lenght).trimLeft();
    }

    let varified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = varified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
