import React, { useState } from "react";
import { jsPDF } from "jspdf";
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
    setShuffledData(shuffleArray(parsedData)); // Shuffle and set data
  };

  // Handle Download as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Shuffled College Data", 10, 10);

    shuffledData.forEach((line, index) => {
      const [id, name, branch] = line.split(/\s+/); // Split line into columns (ID, Name, Branch)
      
      // Adjust x-coordinates for each column
      const idX = 10; // Start position for ID
      const nameX = 60; // Start position for Name
      const branchX = 120; // Start position for Branch
      const y = 20 + index * 10; // Adjust y-coordinate for each row

      doc.text(`${index + 1}.`, 5, y); // Serial number
      doc.text(id || "", idX, y); // ID column
      doc.text(name || "", nameX, y); // Name column
      doc.text(branch || "", branchX, y); // Branch column
    });

    doc.save("Shuffled_College_Data.pdf");
  };

  // Handle Download as Excel
  const handleDownloadExcel = () => {
    const data = shuffledData.map((line, index) => {
      const [id, name, branch] = line.split(/\s+/);
      return [index + 1, id, name, branch]; // Return data in a row format
    });

    // Create worksheet from data
    const ws = XLSX.utils.aoa_to_sheet([["Serial No", "ID", "Name", "Branch"], ...data]);

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
        <>
          <button
            onClick={handleDownloadPDF}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Download PDF
          </button>
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
