import React, { useState, useEffect } from "react";
import axios from "axios";
function DataTable() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://api.example.com/data");
      setData(response.data);
    };
    fetchData();
  }, []);
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  const sortedData = data.sort((a, b) => {
    const isReversed = sortOrder === "desc" ? -1 : 1;
    return isReversed * a[sortColumn].localeCompare(b[sortColumn]);
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const handlePaginationClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th onClick={() => handleSort("id")}>ID</th>
          <th onClick={() => handleSort("name")}>Name</th>
          <th onClick={() => handleSort("date")}>Date</th>
        </tr>
      </thead>
    );
  };
  const renderTableBody = () => {
    return (
      <tbody>
        {currentItems.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    );
  };
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            id={number}
            onClick={handlePaginationClick}
            className={currentPage === number ? "active" : null}
          >
            {number}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <table>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
      {renderPagination()}
    </div>
  );
}
export default DataTable;
