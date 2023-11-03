import { useState } from "react";

const PoliceStationOptions = ({
  options,
  selectedStation,
  setSelectedStation,
}) => {
  // Create a state variable to hold the selected option
  const [selectedOption, setSelectedOption] = useState("");

  // Define a function to handle the selection change
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(selectedOption);
  };

  return (
    <div>
      <label
        htmlFor="policeStations"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Select an option
      </label>
      <select
        id="policeStations"
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={selectedStation}
        onChange={(e) => setSelectedStation(e.target.value)}
      >
        <option value="">Choose a police station</option>
        {options.map((item) => (
          <option key={item._id} value={item._id}>
            {item.StationName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PoliceStationOptions;
