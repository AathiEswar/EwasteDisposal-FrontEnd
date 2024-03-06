import React , {useEffect , useContext} from 'react'
import {Wrapper , Poster} from "../Components" ;
import gsap from 'gsap';
import map from "../assets/garbage-truck.png";
import Context from '../context/Context';
import { ScrollTrigger } from 'gsap/all';
import { Draggable } from 'gsap/all';
import { set } from 'mongoose';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const Homepage = () => {

  return (
    <Wrapper>
     
      <Poster/>
      
    </Wrapper>
  )
}

export default Homepage