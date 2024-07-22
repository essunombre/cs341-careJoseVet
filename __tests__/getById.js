const request = require("supertest");
const app = require("../app");
const mockingoose = require("mockingoose");
const Owner = require("../models/owner");
const Hospital = require("../models/hospital");
const Pet = require("../models/pet");
const Vet = require("../models/pet");

// Mock the middleware
jest.mock("../middleware/authenticate", () => ({
  isAuthenticated: (req, res, next) => next(), // Mock to bypass authentication
}));

// Mock the OwnerController methods
jest.mock("../controllers/owners", () => ({
  getAll: jest.fn(),
  createOwner: jest.fn(),
  updateOwner: jest.fn(),
  deleteOwner: jest.fn(),
  getById: jest.fn().mockImplementation((req, res) => {
    res.status(200).json({
      _id: "12345",
      firstName: "Jose",
      lastName: "Robles",
      email: "jose@gmail.com",
      gender: "male",
      phoneNumber: "3212517301",
    });
  }),
}));

// Mock the HospitalController methods
jest.mock("../controllers/hospitals", () => ({
  getAll: jest.fn(),
  createHospital: jest.fn(),
  updateHospital: jest.fn(),
  deleteHospital: jest.fn(),
  getById: jest.fn().mockImplementation((req, res) => {
    res.status(200).json({
      _id: "67890",
      name: "Test Hospital",
      address: "Test Address",
      phoneNumber: "1234567890",
    });
  }),
}));
// Mock the PetController methods
jest.mock("../controllers/pets", () => ({
  getAll: jest.fn(),
  createPet: jest.fn(),
  updatePet: jest.fn(),
  deletePet: jest.fn(),
  getById: jest.fn().mockImplementation((req, res) => {
    res.status(200).json({
      _id: "67890",
      animal: "pet",
      age: "4",
      sex: "female",
      name: "Pongo",
      status: "waiting",
      ownerId: "123kjh124234241",
      vetId: "456kjh124234241",
    });
  }),
}));
// Mock the VetController methods
jest.mock("../controllers/vets", () => ({
  getAll: jest.fn(),
  createVet: jest.fn(),
  updateVet: jest.fn(),
  deleteVet: jest.fn(),
  getById: jest.fn().mockImplementation((req, res) => {
    res.status(200).json({
      _id: "67890",
      firstName: "Vet Test",
      lastName: "Vet last Name",
      phoneNumber:"3218765566",
      hospitalId: "123kjh124234241"
    });
  }),
}));

describe("API Tests", () => {
  // Owner Tests
  describe("Owner API", () => {
    beforeAll(() => {
      const mockOwner = {
        _id: "12345",
        firstName: "Jose",
        lastName: "Robles",
        email: "jose@gmail.com",
        gender: "male",
        phoneNumber: "3212517301",
      };
      mockingoose(Owner).toReturn(mockOwner, "findOne");
    });

    it("GET /owners/:id should return Owner data with status 200", async () => {
      const response = await request(app).get("/owners/12345").send();
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
      expect(response.body).toEqual({
        _id: "12345",
        firstName: "Jose",
        lastName: "Robles",
        email: "jose@gmail.com",
        gender: "male",
        phoneNumber: "3212517301",
      });
    });

    afterAll(() => {
      mockingoose.resetAll();
    });
  });

  // Hospital Tests
  describe("Hospital API", () => {
    beforeAll(() => {
      const mockHospital = {
        _id: "67890",
        name: "Test Hospital",
        address: "Test Address",
        phoneNumber: "1234567890",
      };
      mockingoose(Hospital).toReturn(mockHospital, "findOne");
    });

    it("GET /hospitals/:id should return Hospital data with status 200", async () => {
      const response = await request(app).get("/hospitals/67890").send();
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
      expect(response.body).toEqual({
        _id: "67890",
        name: "Test Hospital",
        address: "Test Address",
        phoneNumber: "1234567890",
      });
    });

    afterAll(() => {
      mockingoose.resetAll();
    });
  });
  
  // Pet Tests
  describe("Pet API", () => {
    beforeAll(() => {
      const mockPet = {
        _id: "67890",
        animal: "pet",
        age: "4",
        sex: "female",
        name: "Pongo",
        status: "waiting",
        ownerId: "123kjh124234241",
        vetId: "456kjh124234241",
      };
      mockingoose(Pet).toReturn(mockPet, "findOne");
    });

    it("GET /pets/:id should return Pet data with status 200", async () => {
      const response = await request(app).get("/pets/67890").send();
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
      expect(response.body).toEqual({
        _id: "67890",
        animal: "pet",
        age: "4",
        sex: "female",
        name: "Pongo",
        status: "waiting",
        ownerId: "123kjh124234241",
        vetId: "456kjh124234241",
      });
    });

    afterAll(() => {
      mockingoose.resetAll();
    });
  });

  // Vet Tests
  describe("Vet API", () => {
    beforeAll(() => {
      const mockVet = {
        _id: "67890",
        firstName: "Vet Test",
        lastName: "Vet last Name",
        phoneNumber:"3218765566",
        hospitalId: "123kjh124234241"
      };
      mockingoose(Vet).toReturn(mockVet, "findOne");
    });

    it("GET /vets/:id should return Pet data with status 200", async () => {
      const response = await request(app).get("/vets/67890").send();
      expect(response.status).toBe(500);
      expect(response.headers["content-type"]).toContain("application/json");
      expect(response.body).toEqual({
        _id: "67890",
        firstName: "Vet Test",
        lastName: "Vet last Name",
        phoneNumber:"3218765566",
        hospitalId: "123kjh124234241"
      });
    });

    afterAll(() => {
      mockingoose.resetAll();
    });
  });
});
