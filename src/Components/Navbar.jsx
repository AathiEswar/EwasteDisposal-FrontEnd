import React from "react";
import Wrapper from "./Wrapper";
import Logo from "../assets/echakra.png";
import gsap from "gsap";
import { useState } from "react";
import { useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import { BiCoinStack } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { useEffect } from "react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { Location } = useContext(Context);

  const navigate = useNavigate();



  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="shadow-3xl bg-sec-black border-b-2 border-pri-black  ">
      <Wrapper>
        <div className="justify-between items-center flex h-[15vh] ">
          {/* {!isSignedIn && <SignInButton />} */}
          <UserButton />
          <div className="md:flex hidden relative justify-between items-center gap-[10vh]">
            <nav>
              <ul className="hidden md:flex gap-10 justify-center items-center ">
                <li
                  className="font-semibold font-montserrat text-accent hover:text-[#01796f] cursor-pointer nav"
                  onClick={() => navigate("/")}
                >
                  <a>Home</a>
                </li>
                <li
                // className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
                // onClick={() => navigate("/")}
                ></li>
              </ul>
            </nav>
          </div>
          <div className="md:flex hidden gap-[5vh] items-center">
            {!Location ? (
              <h1 className=" font-montserrat font-bold text-white flex items-center gap-[1vh]">
                <i className="fi fi-rr-marker"></i>Location
              </h1>
            ) : (
              <h1 className=" font-montserrat font-bold text-gray flex items-center gap-[1vh]">
                <i class="fi fi-rr-marker"></i>
                {Location}
              </h1>
            )}
            {/* {!isSignedIn && <SignInButton />}
          <UserButton /> */}
          </div>

          <div className="md:hidden flex items-center gap-[5vh]">
            {/* {
          !isdark ? (<button
            className="shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
            onClick={()=>{modetoggle()}}
          >
            <i className="fi fi-sr-moon-stars group"></i>
          </button>) : (<button
              className="shadow-5xl font-medium font-poppins hover:text-[#01796f] transition-transform nav"
              onClick={()=>{modetoggle()}}
            >
              <i className="fi fi-br-brightness"></i>
            </button>)
        } */}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
