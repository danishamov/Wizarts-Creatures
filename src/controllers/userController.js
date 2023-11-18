const router = require("express").Router();
const userService = require("../services/userService");

router.get("/register", (req, res) => {
  res.render("user/register");
});
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;

  //   if (password !== repeatPassword) {
  //     throw new Error("userController error");
  //   }
  await userService.register({
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
  });
  res.redirect("/user/login");
});

router.get("/login", (req, res) => {
  res.render("user/login");
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.redirect("/");
});

module.exports = router;