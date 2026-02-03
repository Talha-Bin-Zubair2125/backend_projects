const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization; // access the authorization header that comes as a req from frontend
 
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // remove 'Bearer' part
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies the token
      req.user = decoded; // attach user to request

      next(); // if verified req is transmitted to next middleware
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { protect };
