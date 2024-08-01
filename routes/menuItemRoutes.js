const express = require("express");
const router = express.Router();

const MenuItem = require("../models/menuItem.js");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    res.status(200).json({ message: "Added new menu item", response });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json({ message: "Menu items", menuItems });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
