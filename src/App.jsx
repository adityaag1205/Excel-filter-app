import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import DurationInput from "./components/DurationInput";
import ProcessFiles from "./components/ProcessFiles";
import DownloadResult from "./components/DownloadResult";

const App = () => {
  const [files, setFiles] = useState([]);
  const [duration, setDuration] = useState("2 HOURS: 00 MINUTES: 00 SECONDS");
  const [filteredData, setFilteredData] = useState([]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 border-b-4 border-blue-300 pb-2">Excel Filter App</h1>
        <FileUpload onFilesUploaded={setFiles} />
        <DurationInput onDurationChange={setDuration} />
        {files.length > 0 && (
          <ProcessFiles files={files} duration={duration} onProcessComplete={setFilteredData} />
        )}
        {filteredData.length > 0 && <DownloadResult data={filteredData} />}
      </div>
    </div>
  );
};

export default App;
