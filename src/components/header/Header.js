import React, { useState } from "react";
import "./header.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import sm_logo from "../../assets/vidvibe_logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${input}`);
    setInput("");
  }
  function goToHome() {
    navigate("/");
  }

  // const {accessToken} = useSelector(state => state.auth?)
  const photoURL = useSelector((state) => state.auth?.user?.photoURL);

  return (
    <div className="header">
      <FaBars
        className="header_menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />

      <div className="logo" onClick={goToHome}>
        <img src={sm_logo} alt="vidVide_logo" className="header_logo" />
        <p className="vidVibe">VIDVIBE</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header_icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={photoURL} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
