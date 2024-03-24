const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { authrization } = req.headers;
  if (authrization) {
    const token = authrization.split("Bearer ")[1];

    // const { accessToken } = req.cookies;

    if (!token) {
      return res.status(409).json({ error: "Please login first" });
    } else {
      try {
        const deCodeToken = await jwt.verify(token, process.env.SECRET);
        req.role = deCodeToken.role;
        req.id = deCodeToken.id;
        next();
      } catch (error) {
        return res.status(400).json({
          error: "Please Login",
        });
      }
    }
  } else {
    return res.status(400).json({
      error: "Please Login",
    });
  }
};
