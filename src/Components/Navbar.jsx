import React from 'react'
import Wrapper from './Wrapper'
import Logo from "../assets/echakra.png";
import gsap from 'gsap';
import { useState } from 'react';
import {useContext } from 'react';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { BiCoinStack } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { useEffect } from 'react';
const Navbar = () => {

  const {isdark , setisdark , setislogin , Location} = useContext(Context)
  
  const navigate = useNavigate();
  const body = document.body;

  const modetoggle=()=>{
    if(body.classList.contains("light")){
      body.classList.remove("light");
      setisdark(!isdark)
    }
    else{
      body.classList.add("light");
      setisdark(!isdark)
    }
  }

  

  return (
    <div className='shadow-3xl '>
    <Wrapper>
      <div className='justify-between items-center flex h-[15vh]'>
      
        <div className='md:flex hidden relative justify-between items-center gap-[10vh]'>  
        <nav >
          <ul className="hidden md:flex gap-10 justify-center items-center ">
            <li
              className="font-semibold font-montserrat hover:text-[#01796f] cursor-pointer nav"
              onClick={() => navigate("/")}
            >
              <a>Home</a>
            </li>
           
          </ul>
        </nav>
     
        
        </div>
        <div className='md:flex hidden gap-[5vh] items-center'>
          {!Location ? (<h1 className=' font-montserrat font-bold text-red-400 flex items-center gap-[1vh]'><i className="fi fi-rr-marker"></i>Location</h1>) : (<h1 className=' font-montserrat font-bold text-red-400 flex items-center gap-[1vh]'><i class="fi fi-rr-marker"></i>{Location}</h1>)}
          
      
        </div>

        {/* Mobile Menu */}
        <div className='md:hidden flex items-center gap-[5vh]'>
        {
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
        }
          <button className=' font-medium font-poppins hover:text-[#01796f] transition-transform'>
          <i className="fi fi-br-menu-burger text-xl"></i>
          </button>
        </div>
      </div>
    </Wrapper>
    </div>
  )
}

export default Navbar