import React, { useState } from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";
import Component3 from "./Component3";
export default function DropdownMenu() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const renderSelectedOption = () => {
    switch (selectedOption) {
      case "option1":
        return <Component1 />;
      case "option2":
        return <Component2 />;
      case "option3":
        return <Component3 />;
      default:
        return null;
    }
  };
  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {renderSelectedOption()}
    </div>
  );
}
