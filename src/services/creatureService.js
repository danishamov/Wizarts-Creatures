const Creature = require("../models/Creature");

exports.create = (createData) => Creature.create(createData);

exports.gerAll = () => Creature.find().lean();

exports.getSingleCreature = (creatureId) =>
  Creature.findById(creatureId).populate("votes");

exports.update = (creatureId, creatureData) =>
  Creature.findByIdAndUpdate(creatureId, creatureData);

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

exports.getMyCreatures = (ownerId) =>
  Creature.find({ owner: ownerId }).lean().populate("owner");

exports.addVotes = async (creatureId, userId) => {
  const creature = await this.getSingleCreature(creatureId);
  //   console.log({ votes: creature.votes });
  //   console.log(userId);
  const isExistingInVotes = creature.votes.some((v) => v == userId);
  //   console.log(isExistingInVotes);

  if (isExistingInVotes) {
    return;
  }

  creature.votes.push(userId);
  return creature.save();
};
