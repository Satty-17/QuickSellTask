import React, { useState, useEffect } from "react";
import "../styles/dropdown.css";

const DropdownMenu = ({ setGroupBy, setSortBy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [groupBy, setLocalGroupBy] = useState(
    localStorage.getItem("group_by") || "status"
  );
  const [sortBy, setLocalSortBy] = useState(
    localStorage.getItem("sort_by") || "priority"
  );

  useEffect(() => {
    setGroupBy(groupBy);
    setSortBy(sortBy);
    // Save to local storage
    localStorage.setItem("group_by", groupBy);
    localStorage.setItem("sort_by", sortBy);
  }, [groupBy, sortBy, setGroupBy, setSortBy]);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const changeGroupBy = (e) => {
    let s = e.target.value;
    s = s.charAt(0).toLowerCase() + s.slice(1);
    setLocalGroupBy(s);
  };

  const changeSortBy = (e) => {
    let s = e.target.value;
    s = s.charAt(0).toLowerCase() + s.slice(1);
    setLocalSortBy(s);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Display <span className="caret">▼</span>
      </button>
      {isVisible && (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <label>Grouping</label>
            <select onChange={changeGroupBy} value={groupBy}>
              <option value="status">Status</option>
              <option value="userId">UserId</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label>Ordering</label>
            <select onChange={changeSortBy} value={sortBy}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
