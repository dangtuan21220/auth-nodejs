const authController = require("../controllers/authController");

const router = require("express").Router();
const { verifyToken } = require("../controllers/verifyToken");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description:
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     requestBody:
 *       description: Auth object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                username: "John Doe"
 *                email: "john@gmail.com"
 *                password: "123456"
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 *       400:
 *         description: Invalid request
 */
//REGISTER
router.post("/register", authController.registerUser);

//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);

//LOG IN
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       description: Auth object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                username: "John Doe"
 *                password: "123456"
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 *       400:
 *         description: Invalid request
 */
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", verifyToken, authController.logOut);

module.exports = router;
