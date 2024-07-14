// Db connection
// const { response } = require("express");
const mongodb = require("../data/database");
// unique id, the primaryKey
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  //#swagger.tags=['Vets']
  const result = await mongodb.getDatabase().db().collection("vets").find();
  result.toArray().then((vets) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(vets);
  });
};

const getById = async (req, res) => {
  //#swagger.tags=['Vets']
  // res.send("I will be the get Id: " + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vetlId to find a Vet.");
  }
  try {
    const vetId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("vets")
      .findOne({ _id: vetId });

    if (result) {
      res.setHeader("Content-type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).send("Vet not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createVet = async (req, res) => {
  //#swagger.tags=['Vets']
  const vet = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    hospitalId: req.body.hospitalId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("vets")
    .insertOne(vet);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Inserting the vet");
  }
};

const updateVet = async (req, res) => {
  //#swagger.tags=['Vet']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vetId to find an Vet.");
  }
  const vetId = new ObjectId(req.params.id);
  const vet = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    hospitalId: req.body.hospitalId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("vets")
    .replaceOne({ _id: vetId }, vet);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Updating the vet");
  }
};

const deleteVet = async (req, res) => {
  //#swagger.tags=['Vets']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vetId to find a vet.");
  }
  const vetId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("vets")
      .deleteOne({ _id: vetId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Vet successfully deleted
    } else {
      res.status(404).json("Vet not found"); // No vet found with the given ID
    }
  } catch (e) {
    res.status(500).json(e.toString()); // Handle any errors
  }
};

module.exports = {
  getAll,
  getById,
  createVet,
  updateVet,
  deleteVet,
};
