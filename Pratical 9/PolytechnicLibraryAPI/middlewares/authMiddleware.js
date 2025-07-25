const jwt = require("jsonwebtoken");

const roles = {
  "GET /books": ["member", "librarian"],
  "PUT /books/[0-9]+/availability": ["librarian"]
};

module.exports = function verifyJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    const routeKey = `${req.method} ${req.path}`;
    const isAuthorized = Object.entries(roles).some(([route, allowedRoles]) => {
      const regex = new RegExp(`^${route}$`);
      return regex.test(routeKey) && allowedRoles.includes(decoded.role);
    });

    if (!isAuthorized) return res.status(403).json({ message: "Forbidden" });

    req.user = decoded;
    next();
  });
};
