const router = require("express").Router();
const createService = require("../services/creatureService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandlers");

router.get("/all", async (req, res) => {
  const creatures = await createService.gerAll();

  res.render("post/all-posts", { creatures });
});

router.get("/create", isAuth, (req, res) => {
  res.render("post/create");
});
router.post("/create", async (req, res) => {
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };
  try {
    await createService.create(payload);
    res.redirect("/posts/all");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("post/create", { errorMessages });
  }
});

router.get("/profile", isAuth, async (req, res) => {
  const { user } = req;

  const myCreatures = await createService.getMyCreatures(user?._id);

  res.render("post/profile", { myCreatures });
});

router.get("/:creatureId/details", async (req, res) => {
  const { creatureId } = req.params;

  const creature = await createService.getSingleCreature(creatureId).lean();
  // console.log({ creature });

  const { user } = req;
  const { owner } = creature;
  const isOwner = user?._id == owner;
  const hasVoted = creature.votes?.some((v) => v?._id.toString());
  const allVotersEmails = creature.votes.map((v) => v.email).join(", ");

  console.log({ votes: creature.votes });
  console.log({ userId: user?._id });
  console.log({ hasVoted });

  res.render("post/details", { creature, isOwner, hasVoted, allVotersEmails });
});

router.get("/:creatureId/edit", async (req, res) => {
  const { creatureId } = req.params;

  const creature = await createService.getSingleCreature(creatureId).lean();

  res.render("post/edit", { creature });
});

router.post("/:creatureId/edit", async (req, res) => {
  const { creatureId } = req.params;
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };

  await createService.update(creatureId, payload);
  res.redirect(`/posts/${creatureId}/details`);
});

router.get("/:creatureId/delete", async (req, res) => {
  const { creatureId } = req.params;
  await createService.delete(creatureId);

  res.redirect("/posts/all");
});

router.get("/:creatureId/vote", async (req, res) => {
  const { creatureId } = req.params;
  const { _id } = req.user;
  // console.log(_id);

  await createService.addVotes(creatureId, _id);
  // const creature = await createService.getSingleCreature(creatureId);

  res.redirect(`/posts/${creatureId}/details`);
});
module.exports = router;
