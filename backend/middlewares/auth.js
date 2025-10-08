// auth , isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

// it is used to check authentication

exports.auth = (req, res, next) => {
    try {

        // fetch token----> 3 ways to Fetch 
        // we need to pass token to body ---> so that we can fetch token From body
        // we need to cookie-parser to Fetch token From cookie
        // we need to body-parser to Fetch token From body


        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("bearer ", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token missing"
            })
        }

        // verify the token

        try {

            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            // adding user to req and assining user:payload
            req.user = payload; // this payload containing role we will use it in isStudent, isAdmin

        } catch (error) {
            res.status(401).json({
                success: false,
                message: "token is invalid"
            })

        }
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "something went wrong, while verifying the token"
        })

    }
}

// Student middleware (student and admin both are used for authorization)
// it is used to check authorization

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            res.status(401).json({
                success: false,
                message: "This route is protected for students"
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not matching"

        })

    }
}

// admin middleware 
// it is also used to check authorization

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            res.status(401).json({
                success: false,
                message: "This route is protected for Admin"
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not matching"
        })


    }
}