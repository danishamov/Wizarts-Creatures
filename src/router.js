const router = require("express").Router();

const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const allPostController = require("./controllers/postController");

router.use(homeController);
router.use("/user", userController);
router.use("/posts", allPostController);

// router.get("*", (req, res) => {
//   res.redirect("/404");
// });

module.exports = router;
