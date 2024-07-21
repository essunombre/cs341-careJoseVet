const validator = require("../helpers/validate");

const saveHospital = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    address: "required|string",
    phoneNumber: "required|min:1000000000",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Hospital validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveOwner = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    gender:"required|string",
    phoneNumber:  "required|min:1000000000"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Owner validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};
const savePet = (req, res, next) => {
  const validationRule = {
    animal: "required|string",
    age: "required|min:0|max:15",
    reason: "required|string",
    sex: "required|string",
    name: "required|string",
    status: "required|string",
    ownerId: "required|string",
    vetId: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Pet validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveVet = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    phoneNumber: "required|min:1000000000",
    hospitalId: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Pet validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
    saveHospital,
    saveOwner,
    savePet,
    saveVet,
};
