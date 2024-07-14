// Db connection
// const { response } = require("express");
const mongodb = require("../data/database");
// unique id, the primaryKey
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  //#swagger.tags=['Pets']
  const result = await mongodb.getDatabase().db().collection("pets").find();
  result.toArray().then((pets) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(pets);
  });
};

const getById = async (req, res) => {
  //#swagger.tags=['Pets']
  // res.send("I will be the get Id: " + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid petlId to find a Pet.");
  }
  try {
    const petId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("pets")
      .findOne({ _id: petId });

    if (result) {
      res.setHeader("Content-type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).send("Pet not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createPet = async (req, res) => {
  //#swagger.tags=['Pets']
  const pet = {
    animal: req.body.animal,
    age: req.body.age,
    reason: req.body.reason,
    sex: req.body.sex,
    name: req.body.name,
    status: req.body.status,
    ownerId: req.body.ownerId,
    vetId: req.body.vetId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("pets")
    .insertOne(pet);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Inserting the pet");
  }
};

const updatePet = async (req, res) => {
  //#swagger.tags=['Pet']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid petId to find an Pet.");
  }
  const petId = new ObjectId(req.params.id);
  const pet = {
    animal: req.body.animal,
    age: req.body.age,
    reason: req.body.reason,
    sex: req.body.sex,
    name: req.body.name,
    status: req.body.status,
    ownerId: req.body.ownerId,
    vetId: req.body.vetId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("pets")
    .replaceOne({ _id: petId }, pet);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Updating the pet");
  }
};

const deletePet = async (req, res) => {
  //#swagger.tags=['Pets']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid petId to find a pet.");
  }
  const petId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("pets")
      .deleteOne({ _id: petId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Pet successfully deleted
    } else {
      res.status(404).json("Pet not found"); // No Pet found with the given ID
    }
  } catch (e) {
    res.status(500).json(e.toString()); // Handle any errors
  }
};

module.exports = {
  getAll,
  getById,
  createPet,
  updatePet,
  deletePet,
};
