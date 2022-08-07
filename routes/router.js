const express = require("express");
const leads = require("../models/leadSchema");
const router = express.Router();

// router.get("/", (req, res) => {
//   console.log("connect");
// });

// /register lead

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, age, phone, profession, status, address } = req.body;

  if (!name || !email || !age || !phone || !profession || !status || !address) {
    res.status(422).json("Please fill all the fields");
  }

  try {
    const prevLead = await leads.findOne({ email: email });
    console.log(prevLead);

    if (prevLead) {
      res.status(422).json("This lead is already present");
    } else {
      const addLead = new leads({
        name,
        email,
        age,
        phone,
        profession,
        status,
        address,
      });

      await addLead.save();
      res.status(201).json(addLead);
      console.log(addLead);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// /getdata

router.get("/getdata", async (req, res) => {
  try {
    const leadData = await leads.find();
    res.status(201).json(leadData);
    console.log(leadData);
  } catch (error) {
    res.status(422).json(error);
  }
});

// /getlead -- get individual leads

router.get("/getlead/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const leadIndividual = await leads.findById({ _id: id });
    console.log(leadIndividual);
    res.status(201).json(leadIndividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// /updatelead

router.patch("/updatelead/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedLead = await leads.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updatedLead);
    res.status(201).json(updatedLead);
  } catch (error) {
    res.status(422).json(error);
  }
});

// /deletelead

router.delete("/deletelead/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLead = await leads.findByIdAndDelete({ _id: id });

    console.log(deletedLead);
    res.status(201).json(deletedLead);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
