const router = require("express").Router();
const hospitalRouter = require("./hospitals");
const ownerRouter = require("./owners");
const petRouter = require("./pets");
const vetRouter = require("./vets");
const loginRouter = require("./login");
const logoutRouter = require("./logout");

router.use("/", require("./swagger"))
router.get("/", (req, res) => {
  //#swagger.tags=['Welcome User']
  res.send("Welcome to the Jose Care Pet API (routes)");
});

router.use("/hospitals", hospitalRouter)
router.use("/owners", ownerRouter)
router.use("/pets", petRouter)
router.use("/vets", vetRouter)

module.exports = router;
