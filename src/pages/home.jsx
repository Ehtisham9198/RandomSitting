import React, { useState } from "react";
import { jsPDF } from "jspdf";

const ShuffleCollegeData = () => {
  const [inputData, setInputData] = useState("");
  const [shuffledData, setShuffledData] = useState([]);

  // Function to shuffle the array
  const shuffleArray = (array) => {
    const shuffled = [...array]; // Create a copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    return shuffled;
  };

  // Handle Generate Button Click
  const handleGenerate = () => {
    const parsedData = inputData
      .split("\n") // Split by new lines
      .map((line) => line.trim()) // Trim whitespace from each line
      .filter((line) => line); // Remove empty lines
    setShuffledData(shuffleArray(parsedData)); // Shuffle and set data
  };

  // Handle Download as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Shuffled College Data", 10, 10);

    shuffledData.forEach((line, index) => {
      doc.text(`${index + 1}. ${line}`, 10, 20 + index * 10); // Add each line to the PDF
    });

    doc.save("Shuffled_College_Data.pdf"); // Save the file
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Shuffle College Data</h3>
      <textarea
        placeholder="Enter data in 'Id Name Branch' format, one per line"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        rows="5"
        style={{
          width: "300px",
          height: "100px",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />
      <br />
      <button
        onClick={handleGenerate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Generate
      </button>
      {shuffledData.length > 0 && (
        <button
          onClick={handleDownloadPDF}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      )}

      {shuffledData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Shuffled Data:</h4>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "300px",
            }}
          >
            {shuffledData.map((line, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                {index + 1}. {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShuffleCollegeData;
