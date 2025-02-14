import React, { useEffect, useState } from "react";
import {
  Soup as Bowl,
  Power,
  ShoppingBag,
  AlertCircle,
  Loader2,
  WandSparkles,
  SendHorizonal,
} from "lucide-react";
import logo from "../assets/logo_transparent.png";

type FeederStatus = "open" | "closed" | "error";

function App() {
  const [feederStatus, setFeederStatus] = useState<FeederStatus>("closed");
  const [bowlWeight, setBowlWeight] = useState(500); // grams
  const [bagWeight, setBagWeight] = useState(5); // kg
  const [isFeeding, setIsFeeding] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/latest-data");
        const jsonData = await response.json();
        // Only update state if valid data is returned
        if (jsonData && jsonData.bowl_weight !== undefined) {
          setBowlWeight(jsonData.bowl_weight);
          setBagWeight(jsonData.food_bag_weight / 1000); // Convert grams to kg
          setFeederStatus(
            jsonData.feeder_door === "closed" ? "closed" : "open"
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, you can keep isLoading true to show the spinner,
        // or set it to false to show an error message within your UI.
      }
    };

    fetchData(); // Fetch immediately on mount
    const interval = setInterval(fetchData, 1200); // Fetch every 1.2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleOrderFood = async () => {
    setIsOrdering(true);
    try {
      const response = await fetch("http://localhost:5001/order-food");
      if (response.ok) {
        console.log("Order processed successfully");
        // Optionally, display a success message or update state here
      } else {
        const errorText = await response.text();
        console.error("Error processing order:", errorText);
        // Optionally, display an error message to the user here
      }
    } catch (error) {
      console.error("Error ordering food:", error);
      // Optionally, display an error message to the user here
    } finally {
      setIsOrdering(false);
    }
  };

  const handleManualFeed = async () => {
    if (isFeeding || bagWeight <= 0) return; // Prevent feeding if already feeding or no food

    setIsFeeding(true);
    setIsError(false);

    try {
      const response = await fetch("http://localhost:5000/open-feeder", {
        method: "GET",
      });
      if (!response.ok) {
        setIsError(true);
        console.error("Failed to open feeder");
      }
    } catch (error) {
      setIsError(true);
      console.error("Error during fetch:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsFeeding(false);
    }
  };

  const getStatusColor = (status: FeederStatus) => {
    switch (status) {
      case "open":
        return "#3A3A3A";
      case "closed":
        return "#8BA17A";
      case "error":
        return "#E74C3C";
      default:
        return "#8BA17A";
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9E3]">
      {/* AppBar */}
      <header className="bg-[#EBF0CD] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#3A3A3A] flex items-center gap-2">
              <img src={logo} alt="Smart Pet Feeder Logo" className="h-8 w-8" />
              NutriPet
            </h1>
            <p className="text-sm italic text-[#547057] ml-3 mt-0.5">
              Feeding Smart, Living Healthy
            </p>
          </div>
        </div>
      </header>

      {/* Loader when data hasn't loaded yet */}
      {isLoading ? (
        <div
          className="flex justify-center items-center"
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <Loader2 className="animate-spin h-8 w-8 text-[#3A3A3A]" />
        </div>
      ) : (
        // Main Content
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Status Card */}
            <div className="bg-[#DDE6B1] rounded-lg shadow-sm p-6 border border-[#EBF0CD]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#3A3A3A]">
                  Feeder Status
                </h2>
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getStatusColor(feederStatus) }}
                />
              </div>
              <div className="flex items-center gap-4">
                <Power className="h-8 w-8 text-[#3A3A3A]" />
                <div>
                  <p className="text-sm text-[#3A3A3A]">Current Status</p>
                  <p className="text-lg font-medium capitalize text-[#3A3A3A]">
                    {feederStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Bowl Weight Card */}
            <div className="bg-[#DDE6B1] rounded-lg shadow-sm p-6 border border-[#EBF0CD]">
              <h2 className="text-lg font-semibold text-[#3A3A3A] mb-4">
                Bowl Weight
              </h2>
              <div className="flex items-center gap-4">
                <Bowl className="h-8 w-8 text-[#3A3A3A]" />
                <div>
                  <p className="text-sm text-[#3A3A3A]">Current Weight</p>
                  <p className="text-lg font-medium text-[#3A3A3A]">
                    {bowlWeight.toFixed(0)}g
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-[#EBF0CD] rounded-full">
                <div
                  className="h-2 bg-[#3A3A3A] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((bowlWeight / 500) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Bag Weight Card */}
            <div className="bg-[#DDE6B1] rounded-lg shadow-sm p-6 border border-[#EBF0CD]">
              <h2 className="text-lg font-semibold text-[#3A3A3A] mb-4">
                Storage Bag
              </h2>
              <div className="flex items-center gap-4">
                <ShoppingBag className="h-8 w-8 text-[#3A3A3A]" />
                <div>
                  <p className="text-sm text-[#3A3A3A]">Remaining Food</p>
                  <p className="text-lg font-medium text-[#3A3A3A]">
                    {bagWeight.toFixed(1)}kg
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-[#EBF0CD] rounded-full">
                <div
                  className="h-2 bg-[#3A3A3A] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((bagWeight / 5) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              onClick={handleManualFeed}
              disabled={isFeeding || bagWeight <= 0}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#8BA17A] text-white rounded-lg hover:bg-[#7A9371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isFeeding ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Filling ...
                </>
              ) : (
                <>
                  <Bowl className="h-5 w-5" />
                  Manual Feed
                </>
              )}
              {isError && (
                <span className="text-red-500 text-sm">
                  Failed to feed, try again
                </span>
              )}
            </button>

            <button
              onClick={handleOrderFood}
              disabled={isOrdering}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#8BA17A] text-white rounded-lg hover:bg-[#7A9371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isOrdering ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Ordering...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  Order Food
                </>
              )}
            </button>
          </div>

          {/* Alert Container - Allow it to grow with content */}
          <div className="mt-6 min-h-[90px]">
            <div className="space-y-4">
              {bagWeight <= 4.5 && (
                <div className="p-4 bg-[#EBF0CD] border border-[#8BA17A] rounded-lg flex items-center gap-2 text-[#3A3A3A]">
                  <AlertCircle className="h-5 w-5" />
                  <p>Food storage running low! Consider ordering more food.</p>
                </div>
              )}

              {bowlWeight < 150 && (
                <div className="p-4 bg-[#EBF0CD] border border-[#8BA17A] rounded-lg flex items-center gap-2 text-[#3A3A3A]">
                  <AlertCircle className="h-5 w-5" />
                  <p>Bowl is almost empty! Time for a refill.</p>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 bg-[#EBF0CD] rounded-lg shadow-sm p-6 border border-[#8BA17A]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4 max-w-3xl">
                <div className="flex-shrink-0 hidden sm:block">
                  <WandSparkles className="h-12 w-12 text-[#8BA17A]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3A3A3A] mb-1">
                    Speak With Our AI Pet Expert!
                  </h3>
                  <p className="text-sm text-[#3A3A3A]">
                    Get personalized feeding plans, behavior advice, and answers
                    to all your pet care questions from our AI assistant on
                    Telegram.
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex-shrink-0">
                <a
                  href="https://t.me/nutripet_smartbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#8BA17A] text-white rounded-lg hover:bg-[#7A9371] transition-colors"
                >
                  <SendHorizonal className="h-4 w-4" />
                  Chat With AI Expert
                </a>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
