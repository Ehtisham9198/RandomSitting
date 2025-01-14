import React, { useState } from "react";
import * as XLSX from "xlsx";

const ShuffleCollegeData = () => {
  const [shuffledData, setShuffledData] = useState([]);

  // Function to shuffle rows
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith(".xlsx")) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Read as 2D array

        // Exclude the header and shuffle the rows
        const [header, ...rows] = jsonData;
        const shuffledRows = shuffleArray(rows);

        // Add Serial No to each row
        const rowsWithSerialNo = shuffledRows.map((row, index) => [
          index + 1, // Serial No
          ...row,
        ]);

        // Combine the header with Serial No column
        const updatedHeader = ["Serial No", ...header];
        setShuffledData([updatedHeader, ...rowsWithSerialNo]);
      };
      reader.readAsBinaryString(uploadedFile);
    } else {
      alert("Please upload a valid Excel file.");
    }
  };

  // Handle Download as Excel
  const handleDownloadExcel = () => {
    if (shuffledData.length === 0) {
      alert("No data to download.");
      return;
    }

    const ws = XLSX.utils.aoa_to_sheet(shuffledData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Shuffled Data");
    XLSX.writeFile(wb, "Shuffled_College_Data.xlsx");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Shuffle College Data</h3>

      {/* File upload input */}
      <input type="file" onChange={handleFileUpload} accept=".xlsx" />

      <br />
      {shuffledData.length > 1 && (
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
              marginTop: "10px",
            }}
          >
            Download Shuffled Excel
          </button>
        </>
      )}

      {shuffledData.length > 1 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Shuffled Data Preview:</h4>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                {shuffledData[0].map((header, index) => (
                  <th
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shuffledData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShuffleCollegeData;
