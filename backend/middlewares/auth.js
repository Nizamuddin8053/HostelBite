const jwt = require("jsonwebtoken");

const ROLES = ["student", "staff", "admin"];

exports.auth = (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({
            success: false,
            message: "Authentication service is not configured",
        });
    }

    const authorization = req.get("Authorization");
    const match = authorization?.match(/^Bearer\s+(\S+)$/i);
    if (!match) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }

    try {
        const payload = jwt.verify(match[1], secret);
        if (
            typeof payload !== "object" ||
            typeof payload.id !== "string" ||
            !ROLES.includes(payload.role)
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token",
            });
        }

        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token",
        });
    }
};

exports.authorize = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: "You do not have permission to access this resource",
        });
    }

    next();
};

exports.isStudent = exports.authorize("student");
exports.isStaff = exports.authorize("staff");
exports.isAdmin = exports.authorize("admin");
exports.isStaffOrAdmin = exports.authorize("staff", "admin");
exports.isStudentOrStaff = exports.authorize("student", "staff");

exports.isSelfOrAdmin = (parameter, roleParameter, selfRole) => (req, res, next) => {
    const isSelf =
        req.user?.role &&
        (!selfRole || req.user.role === selfRole) &&
        (!roleParameter || req.params[roleParameter] === req.user.role) &&
        req.params[parameter] === req.user.id;

    if (!isSelf && req.user?.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "You do not have permission to access this resource",
        });
    }

    next();
};
