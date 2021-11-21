const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const formidableMiddleware = require("express-formidable");

require("dotenv").config();

const apiUrl = "https://lereacteur-marvel-api.herokuapp.com";

const app = express();
app.use(cors());
app.use(formidableMiddleware());

const Character = mongoose.model("Character", {
  name: String,
  description: String,
  comics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comic",
    },
  ],
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my API" });
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/characters?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/comics?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `${apiUrl}/comics/${characterId}?apiKey=${process.env.API_KEY} `
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found !" });
});

app.listen(4000, () => {
  console.log("Server started !");
});
