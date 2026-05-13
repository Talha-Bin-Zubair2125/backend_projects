const protect = async (req, res, next) => {
  const user_id = req.signedCookies.user_id;

  console.log("Signed Cookies:", req.signedCookies);

  try {

    if (!user_id) {
      if (req.path === "/logout") return next();

      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user_id = user_id;

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { protect };