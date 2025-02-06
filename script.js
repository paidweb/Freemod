let results = [];
let history = [];

function addResult(number) {
  if (results.length >= 5) {
    alert("You can only select 5 numbers.");
    return;
  }
  results.push(number);
  document.getElementById("lastResults").value = results.join(", ");
  if (results.length === 5) {
    document.getElementById("analyzeButton").disabled = false;
    document.getElementById("analyzeButton").classList.add("ready");
  }
}

function analyzePatterns() {
  let period = Math.floor(Math.random() * 100) + 1; // Replace this with actual user input if available

  if (!period) {
    document.getElementById("predictionResult").textContent = "Period not found!";
    return;
  }

  try {
    let X = ((period * 3) + Math.pow(period, 3) - Math.floor(period / 2)) % 100;
    let Y = ((period * 7) - Math.pow(period, 2) + Math.floor(period / 3)) % 100;
    let Z = ((period * 11) + Math.pow(period, 4) - Math.floor(period / 5)) % 100;

    let combined = (X + Y + Z) % 10;
    let prediction = combined >= 5 ? "BIG" : "SMALL";

    history.push({ results: [...results], prediction });
    updateHistory();

    document.getElementById("predictionResult").textContent = `PREDICTION: ${prediction}`;
  } catch (error) {
    document.getElementById("predictionResult").textContent = "Error in calculation!";
  }

  results = [];
  document.getElementById("lastResults").value = "";
  document.getElementById("analyzeButton").disabled = true;
  document.getElementById("analyzeButton").classList.remove("ready");
}

function updateHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = history
    .map((entry, index) =>
      `<li>Attempt ${index + 1}: ${entry.results.join(", ")} → Prediction: ${entry.prediction}</li>`
    )
    .join("");
}

function resetAll() {
  results = [];
  history = [];
  document.getElementById("lastResults").value = "";
  document.getElementById("analyzeButton").disabled = true;
  document.getElementById("analyzeButton").classList.remove("ready");
  document.getElementById("predictionResult").textContent = "Enter Last 5 Results to analyze patterns";
  document.getElementById("historyList").innerHTML = "";
}