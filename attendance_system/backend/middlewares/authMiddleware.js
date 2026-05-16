const cookieParser = require("cookie-parser");

const protect = (req, res, next) => {
  const token = req.signedCookies.admin_id;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied." });
  }

  try {
    req.admin = { admin_id: token };
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = { protect };
