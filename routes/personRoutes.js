const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware, generateJwtAuthToken } = require("../jwt.js");
const Person = require("../models/person.js");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    const payload = {
      id: response.id,
      name: response.name,
      email: response.email,
      work: response.work,
    };
    const authToken = generateJwtAuthToken(payload);
    res.status(200).json({ message: "Data saved", response, authToken });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

router.post("/login", async (req, res) =>{
  try {
    const {email, password} = req.body;
    const user = await Person.findOne({email})
    if(!user){
      res.status(404).json({message: "User not found"})
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: email,
      work: user.work,
    };

    const authToken = generateJwtAuthToken(payload);
    res.status(200).json({ message: "Successfully login", user, authToken });

  } catch (error) {
    console.log("error : ",error)
    res.status(500);
    res.send(error);
  }
})

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const person = await Person.find();
    res.status(200).json({ message: "User details", person });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "waiter" ||
      workType === "manager"
    ) {
      const response = await Person.find({
        work: workType,
      });
      res.status(200).json({ message: "Response fetched", response });
    } else {
      res.status(404).json("Work type not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updateData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json({ message: "Person updated successfully", response });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findOneAndDelete({ _id: personId });
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({ message: "Person deleted successfully", response });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
