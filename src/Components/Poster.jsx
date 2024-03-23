import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { SignInButton } from "@clerk/clerk-react";

import map from "../assets/world.jpg";
import { Link, useNavigate } from "react-router-dom";

const Poster = () => {


  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();
 const isAdmin = user?.publicMetadata.admin;

  return (
    <div>
      <div
        className="flex relative rounded-lg  pt-[2vh] mt-[5vh] gap-10 justify-center items-center md:max-h-[70vh]  "
        id="searchposter"
        // style={{backgroundImage : `url(${isdark ? (bgdark) : (bg)})` , backgroundSize : "cover"}}
      >
        <div className="hidden absolute opacity-20 top-0 md:flex w-full max-h-[75vh] ">
          <img
            src={map}
            alt="MAP"
            className="max-h-[100vh] w-full object-cover rounded-xl"
          />
        </div>
        <div className="border-2 border-pri-black postercard w-full h-fit  mt-[5vh] shadow-3xl rounded-xl p-[3vh]  other md:ml-5 mb-10 z-10 searchtext bg-sec-black">
          <h1 className="md:text-[5vh] text-[5vh] font-montserrat  font-bold text-accent">
            Welcome To{" "}
            <span className="text-accent">E-Waste Facility Locator</span>
          </h1>
          <p className=" text-gray text-lg font-montserrat font-medium">
            In an effort to combat the growing issue of electronic waste
            (e-waste), our project is dedicated to responsible recycling and
            disposal. We provide convenient drop-off locations for old
            electronics, ensuring they are recycled or refurbished, reducing
            environmental impact and promoting a sustainable future.
          </p>

          <div className="mt-10 flex  gap-5">
            {isSignedIn && !isAdmin ? (
              <button
               className="text-sec-black hover:text-accent bg-accent hover:bg-sec-black hover:scale-105 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] hover:shadow-accent transition-transform  font-montserrat font-semibold p-4 rounded-lg  w-fit"
                onClick={() => {
                  navigate(`/search`);
                }}
              >
                Locate Facility
              </button>
            ) : ( !isAdmin &&
              <SignInButton>
                <button className="text-sec-black hover:text-accent bg-accent hover:bg-sec-black hover:scale-105 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] hover:shadow-accent transition-transform  font-montserrat font-semibold p-4 rounded-lg  w-fit">
                  Sign in 
                </button>
              </SignInButton>
              
            )}
            {
              isAdmin && 
              <button 
            
            className="text-sec-black hover:text-accent bg-accent hover:bg-sec-black hover:scale-105 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] hover:shadow-accent transition-transform  font-montserrat font-semibold p-4 rounded-lg  w-fit">
                 <Link to="/admin">Admin Page</Link>
                </button>
            }
           
          </div>
        </div>
        <div className="hidden md:flex w-full justify-center "></div>
      </div>
    </div>
  );
};

export default Poster;
