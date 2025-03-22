const authenticateRole = (requiredRole) => {
    return (req, res, next) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.type !== requiredRole) {
          return res.status(403).json({ message: "Forbidden" });
        }
        req.user = decoded;
        next();
      } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
      }
    };
  };
  
  // Example usage
//   app.get("/admin/dashboard", authenticateRole("admin"), (req, res) => {
//     res.send("Welcome Admin!");
//   });
  