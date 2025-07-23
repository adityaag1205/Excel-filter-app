import React from "react";
import * as XLSX from "xlsx";

const REQUIRED_COLUMNS = [
    "REGISTER NO.", "APLICATION NO.", "STUDENT NAME", "BLOCK DESCRIPTION", "TRANSACTION TYPE", "GATE NO", "OUT TIME", "OUT PURPOSE", "TRANSACTION TYPE", "GATE NO", "IN TIME", "IN PURPOSE", "DURATION", "TOTAL DURATION"
];

const convertToSeconds = (duration) => {
    const regex = /(?:(\d+) HOURS)?\s*(?:(\d+) MINUTES)?\s*(?:(\d+) SECONDS)?/i;
    const match = duration.match(regex);
    if (!match) return 0;

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
};

const ProcessFiles = ({ files, duration, onProcessComplete }) => {
    const processFiles = async () => {
        const filteredData = [];
        const maxDuration = convertToSeconds(duration);

        for (const file of files) {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { range: 3 });


            const fileColumns = Object.keys(jsonData[0] || {});
            const missingColumns = REQUIRED_COLUMNS.filter(col => !fileColumns.includes(col));

            if (missingColumns.length > 0) {
                alert(`Missing columns: ${missingColumns.join(", ")}`);
                return;
            }

            const validRecords = jsonData.filter((record) => {
                if (!record["DURATION"]) return false;
                const recordDuration = convertToSeconds(record["DURATION"]);
                return recordDuration >= maxDuration;
            });

            filteredData.push(...validRecords);
        }

        if (filteredData.length === 0) {
            alert("No students have exceeded the set duration.");
        }

        onProcessComplete(filteredData);
    };

    return (
        <button onClick={processFiles} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Process Files
        </button>
    );
};

export default ProcessFiles;
