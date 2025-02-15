# 🐶 NutriPet

**Feeding Smartly, Living Healthy** 🥣✨

NutriPet is an IoT-powered smart pet feeder that helps automate and monitor pet feeding schedules. It ensures your pet gets the right amount of food while keeping track of food levels and providing AI-powered insights about your pet via Telegram. 📡🐕

## 🚀 Features

- 🥘 **Automated Feeding:** Dispenses food based on schedule or manual trigger.
- 📊 **Food Level Monitoring:** Tracks the weight of food in the bowl and bag.
- 📡 **MQTT Communication:** Uses publisher-subscriber architecture for real-time updates.
- 🤖 **AI Pet Expert:** Telegram bot that provides expert insights and answers about your dog.
- ⚡ **FastAPI Control:** Manages MQTT communication and feeding logic.

## 🛠️ Prerequisites

Before running NutriPet, ensure you have the following:

- 🗄️ **MongoDB Connection String** (for database storage)
- 🧠 **Groq API Key** (for AI insights)
- 📩 **Telegram API Key** (for AI pet expert chatbot)

## 📥 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/nutripet.git
   cd nutripet
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add:

   ```env
   MONGO_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   TELEGRAM_API_KEY=your_telegram_api_key
   ```

4. Start the project:

   ```sh
   npm start
   ```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📜 License

This project is licensed under the MIT License.

---

### 📞 Connect with Us

For any questions or support, reach out via Telegram or open an issue on GitHub! 🐾

