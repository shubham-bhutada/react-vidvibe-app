import React, { useState } from "react";
import "./categoriesBar.css";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videosAction";

const categoryList = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "Redux",
  "Music",
  "Guitar",
  "Live",
  "Cricket",
  "La Liga",
  "Taarak Mehta",
  "Cars",
  "Real Madrid",
  "Cooking",
  "YeahMad",
];

const CategoriesBar = () => {
  const [activeCell, setActiveCell] = useState("All");

  const dispatch = useDispatch();

  const handleActiveCell = (value) => {
    setActiveCell(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <div className="categoriesBar">
      {categoryList.map((item, i) => (
        <span
          key={i}
          onClick={() => handleActiveCell(item)}
          className={activeCell === item ? "active" : ""}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
