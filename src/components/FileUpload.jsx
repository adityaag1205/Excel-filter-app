import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFilesUploaded }) => {
    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 5) {
            alert("You can upload a maximum of 5 files.");
            return;
        }
        setFiles(acceptedFiles);
        onFilesUploaded(acceptedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ".xlsx, .xls",
    });

    return (
        <div className="p-4 border-dashed border-2 border-gray-400 rounded-lg text-center cursor-pointer" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag & drop up to 5 Excel files here, or click to select files</p>
            {files.length > 0 && (
                <ul className="mt-2">
                    {files.map((file, index) => (
                        <li key={index} className="text-sm text-gray-600">{file.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default FileUpload;