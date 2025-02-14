const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderFood = require("./orderFood");

require("dotenv").config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "SmartPetFeeder",
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define Schema
const sensorSchema = new mongoose.Schema(
  {
    timestamp: Number,
    bowl_weight: Number,
    food_bag_weight: Number,
    feeder_door: String,
  },
  { collection: "SensorData" }
);

const SensorData = mongoose.model("SensorData", sensorSchema);

// API Route to get latest sensor data
app.get("/api/latest-data", async (req, res) => {
  try {
    console.log("Starting query...");
    const count = await SensorData.countDocuments();
    console.log("Number of documents in collection:", count);

    const latestData = await SensorData.find().sort({ timestamp: -1 }).limit(1);
    console.log("Query completed");
    console.log("Latest data:", latestData);

    if (!latestData || latestData.length === 0) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    res.json(latestData[0]);
  } catch (err) {
    console.error("Detailed error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/send-to-groq", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: text }],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error sending to Groq:", error);
    res.status(500).json({ error: "Failed to communicate with Groq" });
  }
});
app.get("/order-food", async (req, res) => {
  try {
    // Run the Puppeteer script
    await orderFood();
    res.status(200).send("Order processed successfully");
  } catch (error) {
    console.error("Error running orderFood:", error);
    res.status(500).send("Error processing order");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
