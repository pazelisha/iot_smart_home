import os
from fastapi import FastAPI
import asyncio
import paho.mqtt.client as mqtt
import time
import threading
import random
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

# MQTT Broker Settings
BROKER = "broker.hivemq.com"
PORT = 1883

# MQTT Topics
BOWL_WEIGHT_TOPIC = "pet_feeder/bowl_weight"
FOOD_BAG_TOPIC = "pet_feeder/food_bag"
FEEDER_DOOR_TOPIC = "pet_feeder/feeder_door"

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI")

try:
    print("Attempting to connect to MongoDB...")
    client_mongo = MongoClient(MONGO_URI)
    client_mongo.admin.command('ping')
    print("✅ Successfully connected to MongoDB")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {str(e)}")
    raise

db = client_mongo["SmartPetFeeder"]
collection = db["SensorData"]

# Global state
bowl_weight = 500         # in grams
food_bag_weight = 5000    # in grams
feeder_door = "closed"
override_decrease = False  # When True, natural consumption is paused

# Setup MQTT Client
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.connect(BROKER, PORT, 60)
client.loop_start()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # You can add other origins as needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
@app.get("/api/latest-data")
async def latest_data():
    """
    API endpoint for the UI to fetch the latest sensor data.
    """
    return {
        "bowl_weight": bowl_weight,
        "food_bag_weight": food_bag_weight,
        "feeder_door": feeder_door
    }

@app.get("/open-feeder")
async def open_feeder():
    """
    Manual refill endpoint.
    Opens the feeder door, refills the bowl until it reaches 500g, then closes the door.
    Uses asyncio.sleep to avoid blocking the event loop.
    (Note: This endpoint does not adjust the food bag weight.)
    """
    global bowl_weight, food_bag_weight, feeder_door, override_decrease

    print("\n🔄 Manual Feeder Open Request Received")
    override_decrease = True  # Temporarily disable automatic consumption

    # Open the feeder door for manual refill
    feeder_door = "open"
    client.publish(FEEDER_DOOR_TOPIC, feeder_door)

    # Refill the bowl until it reaches 500g
    while bowl_weight < 500:
        await asyncio.sleep(1)  # Non-blocking sleep
        increment = min(500 - bowl_weight, random.randint(20, 50))
        bowl_weight += increment
        client.publish(BOWL_WEIGHT_TOPIC, str(bowl_weight))
        print(f"Manual refill: Adding {increment}g... Bowl weight: {bowl_weight}g, Food bag: {food_bag_weight}g")
        collection.insert_one({
            "timestamp": time.time(),
            "bowl_weight": bowl_weight,
            "food_bag_weight": food_bag_weight,
            "feeder_door": feeder_door,
            "refill_type": "manual"
        })

    # Close the feeder door after refill
    feeder_door = "closed"
    client.publish(FEEDER_DOOR_TOPIC, feeder_door)
    override_decrease = False  # Re-enable natural consumption
    print("✅ Manual refill complete, returning to normal mode.")

    return {"message": "Bowl filled to 500g. Returning to normal mode."}

def simulate_food_consumption():
    """
    Simulates natural food consumption and triggers an automatic refill when the bowl is empty.
    During the automatic refill:
      - The feeder door remains closed.
      - The bowl is refilled faster with larger increments.
      - The food bag weight is adjusted incrementally as food is transferred.
    """
    global bowl_weight, food_bag_weight, feeder_door, override_decrease

    while True:
        time.sleep(1)  # Consumption cycle every second
        if not override_decrease and bowl_weight > 0:
            decrement = random.randint(20, 50)
            bowl_weight = max(0, bowl_weight - decrement)
            client.publish(BOWL_WEIGHT_TOPIC, str(bowl_weight))
            print(f"Simulated consumption: Decreased by {decrement}g. New bowl weight: {bowl_weight}g, Food bag: {food_bag_weight}g")
            collection.insert_one({
                "timestamp": time.time(),
                "bowl_weight": bowl_weight,
                "food_bag_weight": food_bag_weight,
                "feeder_door": feeder_door,
                "action": "consumption"
            })

            # Trigger automatic refill if bowl is empty
            if bowl_weight == 0:
                print("\n🔄 Automatic refill triggered!")
                while bowl_weight < 500 and food_bag_weight > 0:
                    time.sleep(1)  # Faster refill interval
                    # Calculate increment: do not add more than what is left in the bag
                    increment = min(500 - bowl_weight, random.randint(50, 100), food_bag_weight)
                    bowl_weight += increment
                    food_bag_weight -= increment  # Deduct the same amount from the bag
                    client.publish(BOWL_WEIGHT_TOPIC, str(bowl_weight))
                    client.publish(FOOD_BAG_TOPIC, str(food_bag_weight))
                    print(f"Automatic refill: Adding {increment}g... Bowl weight: {bowl_weight}g, Food bag: {food_bag_weight}g")
                    collection.insert_one({
                        "timestamp": time.time(),
                        "bowl_weight": bowl_weight,
                        "food_bag_weight": food_bag_weight,
                        "feeder_door": feeder_door,  # Door remains closed
                        "refill_type": "automatic"
                    })
                if bowl_weight < 500:
                    print("⚠️ Not enough food in bag to fully refill the bowl.")
                else:
                    print("✅ Automatic refill complete!")

def delayed_simulation():
    """
    Waits for 5 seconds before starting the natural food consumption simulation.
    """
    print("Waiting 5 seconds before starting food consumption simulation...")
    time.sleep(5)
    simulate_food_consumption()

# Start the background thread for natural consumption and automatic refill simulation after a 5-second delay
threading.Thread(target=delayed_simulation, daemon=True).start()

if __name__ == '__main__':
    import uvicorn
    # Running on port 5001 so your UI updates (fetching from /api/latest-data) work as expected.
    uvicorn.run(app, host='0.0.0.0', port=5000)
