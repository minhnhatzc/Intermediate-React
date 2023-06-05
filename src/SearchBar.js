import React, { useState } from "react";
const itemList = [
  "Apples",
  "Bananas",
  "Oranges",
  "Pineapples",
  "Grapes",
  "Watermelons"
];
export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = itemList.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        placeholder="Search for an item"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
