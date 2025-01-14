import React, { useState } from "react";
import * as XLSX from "xlsx";

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

    // Process and split data into parts (Name, ID, Branch)
    const processedData = parsedData.map((line) => {
      const parts = line.split(/\s+/); // Split by whitespace (spaces or tabs)
      const name = parts.slice(0, parts.length - 2).join(" "); // Join all parts except last two as Name
      const id = parts[parts.length - 2]; // Second last part as ID
      const branch = parts[parts.length - 1]; // Last part as Branch
      return { name, id, branch };
    });

    setShuffledData(shuffleArray(processedData)); // Shuffle and set data
  };

  // Handle Download as Excel
  const handleDownloadExcel = () => {
    const data = shuffledData.map((student, index) => {
      return [index + 1, student.name.split(" ")[0], student.name.split(" ")[1] || "", student.id, student.branch];
    });

    // Create worksheet from data
    const ws = XLSX.utils.aoa_to_sheet([["Serial No", "First Name", "Last Name", "ID", "Branch"], ...data]);

    // Create workbook from worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Shuffled Data");

    // Download the Excel file
    XLSX.writeFile(wb, "Shuffled_College_Data.xlsx");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Shuffle College Data</h3>
      <textarea
        placeholder="Enter data in 'Name ID Branch' format, one per line"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        rows="10"
        style={{
          width: "300px",
          height: "200px",
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
        <>
          <button
            onClick={handleDownloadExcel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#17a2b8",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download Excel
          </button>
        </>
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
            {shuffledData.map((student, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                {index + 1}. {student.name} - {student.id} - {student.branch}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShuffleCollegeData;
