import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // Safely access cookies
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated. Token missing.",
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token.",
          success: false,
        });
      }

      // Attach user ID to the request
      req.id = decode.userId;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      message: "Internal server error during authentication.",
      success: false,
    });
  }
};

export default isAuthenticated;
