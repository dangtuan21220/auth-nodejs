const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description:
 */

//GET ALL USERS
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of all user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/", verifyToken, userController.getAllUsers);

//DELETE USER
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *         example:
 *             658918e852a0131af4c0aab1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  verifyTokenAndUserAuthorization,
  userController.deleteUser
);

module.exports = router;
