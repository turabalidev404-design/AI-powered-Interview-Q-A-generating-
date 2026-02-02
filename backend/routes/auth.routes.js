import express from "express";
import { signup, login, logout } from "../controllers/auth.controllers.js";
import upload from "../middlewares/uploadMiddleware.js";
import protect from "../middlewares/protect.js";


const router = express.Router()

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */

// router.post("/register", registerUser);

router.post("/signup", signup)


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login User
 *       400:
 *         description: Bad request
 */

// router.post("/register", registerUser);
router.post("/login", login)

/**
 * @swagger
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post("/logout",protect, logout)

router.post("/upload-image", upload.single("image"), (req, res) => {
    if(!req.file){
        return res.status(400).json({message: "No file upload"})
    }
    const imageurl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}}`;
    res.status(200).json({imageurl})
})


export default router;