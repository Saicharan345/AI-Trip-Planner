import { useState } from "react";
import "./design.css";

function App() {
  const [fromCity, setFromCity] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [groupType, setGroupType] = useState("solo");
  const [transport, setTransport] = useState("flight");
  const [tripPlan, setTripPlan] = useState("");
  const [loading, setLoading] = useState(false);

  async function generatePlan() {
    if (!fromCity || !destination || !budget || !days) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setTripPlan("");

    try {
      const response = await fetch("https://ai-trip-planner-server-jbed.onrender.com/generate", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromCity,
          destination,
          budget,
          days,
          groupType,
          transport,
        }),
      });

      const data = await response.json();
      setTripPlan(data.plan || "No plan generated.");
    } catch (err) {
      setTripPlan("Error generating plan.");
    }

    setLoading(false);
  }

  return (
    <div className="app-root">

      {/* Floating UI */}
      <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" className="globe" />
      <img src="https://cdn-icons-png.flaticon.com/512/201/201623.png" className="floating-plane" />
      <img src="https://pngimg.com/uploads/cloud/cloud_PNG16.png" className="cloud cloud1" />
      <img src="https://pngimg.com/uploads/cloud/cloud_PNG16.png" className="cloud cloud2" />

      <div className="app-container">

        <h1 className="app-title">AI Trip Planner ✈️</h1>
        <p className="app-subtitle">Generate a complete travel plan in seconds using AI</p>

        <div className="form-row">
          <div>
            <label className="input-label">From City</label>
            <input className="input-box" value={fromCity} onChange={(e) => setFromCity(e.target.value)} />
          </div>

          <div>
            <label className="input-label">Destination</label>
            <input className="input-box" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>

          <div>
            <label className="input-label">Transport</label>
            <select
              className="input-box"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            >
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="bus">Bus</option>
            </select>
          </div>

          <div>
            <label className="input-label">Budget (₹)</label>
            <input className="input-box" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>

          <div>
            <label className="input-label">Days</label>
            <input className="input-box" type="number" value={days} onChange={(e) => setDays(e.target.value)} />
          </div>

          <div>
            <label className="input-label">Members</label>
            <select className="input-box" value={groupType} onChange={(e) => setGroupType(e.target.value)}>
              <option value="solo">Solo</option>
              <option value="couple">Couple</option>
              <option value="family">Family</option>
            </select>
          </div>
        </div>

        <button className="primary-btn" onClick={generatePlan} disabled={loading}>
          {loading ? "Generating..." : "Generate Trip Plan"}
        </button>

        {tripPlan && (
          <div className="output-box">
            <pre className="plain-output">{tripPlan}</pre>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
