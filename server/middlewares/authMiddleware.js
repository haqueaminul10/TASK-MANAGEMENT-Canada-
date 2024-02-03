const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Token is missing" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, "ABCDE", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Token is invalid" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
