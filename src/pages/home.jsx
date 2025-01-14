import React, { useState } from "react";

const ShuffleCollegeIDs = () => {
  const [inputIds, setInputIds] = useState("");
  const [collegeIds, setCollegeIds] = useState([]);

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
    const idsArray = inputIds
      .split("\n") // Split by new lines
      .map((id) => id.trim()) // Trim whitespace
      .filter((id) => id); // Remove empty lines
    setCollegeIds(shuffleArray(idsArray)); // Shuffle and set IDs
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Shuffle College IDs</h3>
      <textarea
        placeholder="Enter one ID per line"
        value={inputIds}
        onChange={(e) => setInputIds(e.target.value)}
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
        }}
      >
        Generate
      </button>

      {collegeIds.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Shuffled IDs:</h4>
          <table
            style={{
              borderCollapse: "collapse",
              width: "50%",
              textAlign: "left",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  S.No
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  College ID
                </th>
              </tr>
            </thead>
            <tbody>
              {collegeIds.map((id, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShuffleCollegeIDs;
