const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv");

dotenv.config();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({ error: "Not authorized, invalid token!" });
        }
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token!" });
    }
};

module.exports = protect;
