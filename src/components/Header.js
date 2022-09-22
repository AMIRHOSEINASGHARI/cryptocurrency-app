import React, { useState } from "react";
import { Link } from "react-router-dom";
//components
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { HiHome, HiOutlineNewspaper } from "react-icons/hi";
import { RiExchangeCnyLine } from "react-icons/ri";
import { AiOutlineFund } from "react-icons/ai";
//assets
import logo from "../assets/bitcoin.png";

const Header = () => {
  const [menuClick, setMenuClick] = useState(false);
  return (
    <div className="w-full bg-[#001529] text-white">
      <div className="flex relative items-center justify-between max-w-[1300px] mx-auto py-5 px-3">
        <Link to="/" className="flex items-center">
          <img className="w-10" src={logo} alt="logo" />
          <span className="text-lg ml-2 text-blue-300">Cryptoverse</span>
        </Link>
        <div className="flex items-center">
          <div className="lg:hidden" onClick={() => setMenuClick(!menuClick)}>
            {menuClick ? (
              <IoMdClose className="text-3xl" />
            ) : (
              <CgMenuRight className="text-3xl" />
            )}
          </div>
          <ul
            className={`${
              menuClick
                ? "absolute top-full right-0 bg-[#001529] p-3 space-y-4"
                : "hidden"
            } lg:flex lg:space-x-10`}
          >
            <li>
              <Link className="flex items-center space-x-2" to="/">
                <HiHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center space-x-2"
                to="/cryptocurrencies"
              >
                <AiOutlineFund />
                <span>Cryptocurrencies</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-2" to="/exchanges">
                <RiExchangeCnyLine />
                <span>Exchanges</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-2" to="/news">
                <HiOutlineNewspaper />
                <span>News</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
