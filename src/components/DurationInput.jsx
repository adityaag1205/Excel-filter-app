import React, { useState } from "react";

const DurationInput = ({ onDurationChange }) => {
    const [duration, setDuration] = useState("2 HOURS: 00 MINUTES: 00 SECONDS");

    const handleChange = (e) => {
        setDuration(e.target.value);
        onDurationChange(e.target.value);
    };

    return (
        <div className="mt-4">
            <label className="block text-gray-700">Set Duration Limit:</label>
            <input
                type="text"
                value={duration}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
                placeholder="X HOURS: Y MINUTES: Z SECONDS"
            />
        </div>
    );
};

export default DurationInput;
