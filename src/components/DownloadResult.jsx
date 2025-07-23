import React from "react";
import * as XLSX from "xlsx";

const DownloadResult = ({ data }) => {
    const downloadFile = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");
        XLSX.writeFile(workbook, "filtered_data.xlsx");
    };

    return (
        <button onClick={downloadFile} className="mt-4 bg-green-500 text-white p-2 rounded">
            Download Filtered Data
        </button>
    );
};

export default DownloadResult;
