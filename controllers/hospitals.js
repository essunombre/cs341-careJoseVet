// Db connection
// const { response } = require("express");
const mongodb = require("../data/database");
// unique id, the primaryKey
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  //#swagger.tags=['Hospitals']
  const result = await mongodb.getDatabase().db().collection("hospitals").find();
  result.toArray().then((hospitals) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(hospitals);
  });
};

const getById = async (req, res) => {
  //#swagger.tags=['Hospitals']
  // res.send("I will be the get Id: " + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid hopstialId to find a Hospital.");
  }
  try {
    const hospitalId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("hospitals")
      .findOne({ _id: hospitalId });

    if (result) {
      res.setHeader("Content-type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).send("Hospital not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createHospital = async (req, res) => {
  //#swagger.tags=['Hospitals']
  const hospital = {
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("hospitals")
    .insertOne(hospital);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Inserting the hospital");
  }
};

const updateHospital = async (req, res) => {
  //#swagger.tags=['Hospital']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid hospitalId to find a Hospital.");
  }
  const hospitalId = new ObjectId(req.params.id);
  const hospital = {
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("hospitals")
    .replaceOne({ _id: hospitalId }, hospital);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Updating the hospital");
  }
};

const deleteHospital = async (req, res) => {
  //#swagger.tags=['Hospitals']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid hospitalId to find a hospital.");
  }
  const hospitalId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("hospitals")
      .deleteOne({ _id: hospitalId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Hospital successfully deleted
    } else {
      res.status(404).json("Hospital not found"); // No Hospital found with the given ID
    }
  } catch (e) {
    res.status(500).json(e.toString()); // Handle any errors
  }
};


module.exports = {
  getAll,
  getById,
  createHospital,
  updateHospital,
  deleteHospital,
};
