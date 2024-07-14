// Db connection
// const { response } = require("express");
const mongodb = require("../data/database");
// unique id, the primaryKey
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  //#swagger.tags=['Owners']
  const result = await mongodb.getDatabase().db().collection("owners").find();
  result.toArray().then((owners) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(owners);
  });
};

const getById = async (req, res) => {
  //#swagger.tags=['Owners']
  // res.send("I will be the get Id: " + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid ownerlId to find an Owner.");
  }
  try {
    const ownerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("owners")
      .findOne({ _id: ownerId });

    if (result) {
      res.setHeader("Content-type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).send("Owner not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createOwner = async (req, res) => {
  //#swagger.tags=['Owners']
  const owner = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("owners")
    .insertOne(owner);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Inserting the owner");
  }
};

const updateOwner = async (req, res) => {
  //#swagger.tags=['Owners']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid ownerId to find an Owner.");
  }
  const ownerId = new ObjectId(req.params.id);
  const owner = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("owners")
    .replaceOne({ _id: ownerId }, owner);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Updating the owner");
  }
};

const deleteOwner = async (req, res) => {
  //#swagger.tags=['Owners']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid ownerId to find an owner.");
  }
  const onwerId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("owners")
      .deleteOne({ _id: onwerId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Owner successfully deleted
    } else {
      res.status(404).json("Owner not found"); // No Owner found with the given ID
    }
  } catch (e) {
    res.status(500).json(e.toString()); // Handle any errors
  }
};

module.exports = {
  getAll,
  getById,
  createOwner,
  updateOwner,
  deleteOwner,
};
