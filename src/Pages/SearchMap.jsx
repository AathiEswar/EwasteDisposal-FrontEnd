import React, { useEffect, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import polyline from "@mapbox/polyline";
import { useContext } from "react";
import Context from "../context/Context";
import { Wrapper  } from "../Components";
import { useParams } from "react-router-dom";
import { set } from "mongoose";
import { getLocation } from "../context/data.model";
import axios from "axios";

const SearchMap = () => {
  const { Location , Locationstate , facdata , fetcheddata} = useContext(Context);
  const [map, setmap] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [marker, setmarker] = useState(null)
  const [searchaddress, setsearchaddress] = useState("");
  const [initaddress, setinitaddress] = useState("");
  const [centersData ,setCentersData] = useState([]);

  // Create a function to initialize the map
  const initializeMap = (coordinates1) => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmlzaGFudDc0MTIiLCJhIjoiY2xtYm42NHI5MWN0ZTNkbzVsdzhkNnl0bSJ9.FXHqQifsNwqwWW3g4qEZgw";

    const map = new mapboxgl.Map({
      container: "map", // Use the provided coordinates as the initial center
      style: "mapbox://styles/mapbox/outdoors-v12",
      // style : "mapbox://styles/nishant7412/clmd5l4yi01bz01r71roa6h2m",
      zoom: 18,
      pitch: 50,
      bearing: 0,
    });

    return map;
    // Rest of your map initialization code...
  };

  const Geocodeaddress = async (address) => {

    mapboxgl.accessToken =
      "pk.eyJ1IjoibmlzaGFudDc0MTIiLCJhIjoiY2xtYm42NHI5MWN0ZTNkbzVsdzhkNnl0bSJ9.FXHqQifsNwqwWW3g4qEZgw";
    const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(geocodingApiUrl);
    const data = await response.json();

    const coordinates = data.features[0].center;



    return coordinates;
  };


    const handleSearch = async (unitaddress) => {
      try {
   
        if(marker){
           marker.remove();        
        }
  
        const searchCoordinates = await Geocodeaddress(searchaddress ? (searchaddress) : (unitaddress));
        const [lng, lat] = searchCoordinates;
      
  
      
        const directionsApiUrl = `https://api.mapbox.com/directions/v5/mapbox/cycling/${lng},${lat};${coordinates[0]},${coordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
  
        const response = await fetch(directionsApiUrl);
        const data = await response.json();
  
    
        const routeCoordinates = data.routes[0].geometry.coordinates;
  
    
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoordinates,
          },
        };
  
      
        if (map.getSource("route")) {
          map.getSource("route").setData(geojson);
        } else {

          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#25a18e",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
  

        const startingPoint = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: coordinates,
              },
            },
          ],
        };
  
        if (map.getLayer("start")) {
          map.getSource("start").setData(startingPoint);
        } else {
          map.addLayer({
            id: "start",
            type: "circle",
            source: {
              type: "geojson",
              data: startingPoint,
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#25a18e",
            },
          });
        }
  
        const endingPoint = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: routeCoordinates[routeCoordinates.length - 1],
              },
            },
          ],
        };
  
        if (map.getLayer("end")) {
          map.getSource("end").setData(endingPoint);
        } else {
          map.addLayer({
            id: "end",
            type: "circle",
            source: {
              type: "geojson",
              data: endingPoint,
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#25a18e",
            },
          });
        }
        const Newmarker = await new mapboxgl.Marker({ color: "#25a18e" })
          .setLngLat(searchCoordinates)
          
        Newmarker.addTo(map);
  
        setmarker(Newmarker);
    
        const bounds = routeCoordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(routeCoordinates[0], routeCoordinates[0]));
  
        map.fitBounds(bounds, {
          padding: 50, 
          duration: 1000, 
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const getTheName = async () => {
   
      
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject ,  {
            enableHighAccuracy: true
          });
        });
    
        const { latitude, longitude } = position.coords;

   
    
      
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibmlzaGFudDc0MTIiLCJhIjoiY2xtYm42NHI5MWN0ZTNkbzVsdzhkNnl0bSJ9.FXHqQifsNwqwWW3g4qEZgw`);
        const data = await response.json();
    
       
        const locationName = data.features[0].place_name;
    
    
        return locationName;
     
      
    };

  const SetAddressMarker = async()=>{
   
  const Location  = await getTheName() ;
    const addressToGeocode = decodeURIComponent(Location);
    console.log(Location.length > 100 ? Location.slice(0, 100).length : Location.length );
    
    
    // Geocode the initial address and set the initial coordinates
    Geocodeaddress(Location.length > 120 ? Location.slice(0, 120) : Location )
      .then((initialCoordinates) => {
        setCoordinates(initialCoordinates);
        const map1 = initializeMap();
        map1.setCenter(initialCoordinates);
        setmap(map1);

        new mapboxgl.Marker().setLngLat(initialCoordinates).addTo(map1);
        // Add popup to the marker
        new mapboxgl.Popup()
          .setLngLat(initialCoordinates)
          .setHTML(
            `
         <div style="background-color: #ffffff; padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
         <p style="color: black; font-size: 14px; font: montserrat, font-weight: bold">${addressToGeocode}</p>
         </div>
                 `
          )
          .addTo(map1);
      })

      .catch((error) => {
        console.error("Error:", error);
      });

    return () => {
    
      mapboxgl.accessToken = null;
    };
  }

  const getDataArray = async()=>{
    SetAddressMarker()
    await axios.get("/search").then((res)=>{
      const dataArray = res.data;
      setCentersData(dataArray);
     
    })
  }

  useEffect(() => {
    getDataArray();
     
  }, []);

   

   


  return (
    <Wrapper>
      
      <div className="relative mt-[2vh] bg-sec-black">

      

        <div id="map" className="h-[70vh] w-full rounded-xl" />
        {/* <div className="absolute top-0 flex gap-[1vh] justify-between items-center p-4">
          <input
            type="text"
            className="w-full mt-2 mx-[2vh] rounded-lg text-[#F9F6EE] p-4 font-montserrat border-2 font-medium bg-[#222222]"
            onChange={(e) => {
              setsearchaddress(e.target.value);
            }}
            placeholder="Enter Your Location"
          />
          <button
            className="hover:bg-[#ff5757] h-fit mt-2 hover:scale-105 shadow-3xl transition-transform  font-montserrat font-semibold p-4 rounded-lg  w-fit"
            onClick={handleSearch}
          >
            Search
          </button>
        </div> */}
      </div>
      {centersData.length > 0 && <div>
      <div className="w-full h-fit mt-[2vh]">
        <h1 className="mb-[5vh] font-montserrat font-bold text-2xl text-white ">
          Search Results
        </h1>
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
        {centersData?.map((item) => (
            <div className="h-fit items-center gap-[2vw] shadow-3xl p-4 rounded-lg bg-sec-black md:max-w-[60vh] border-accent border-2">
              <p className="font-montserrat font-semibold  text-white">{item?.Name_Address}</p>
              <h2 className="font-montserrat font-bold mt-2 text-white ">Capacity : <span className="text-accent"> {item?.Installed_Capacity_Metric_Tons_per_Annum_MTA} </span></h2>
              <button
              className="hover:bg-accent bg-white mt-[2vh] hover:scale-105 shadow-lg  hover:text-white transition-transform  font-montserrat font-semibold p-2 rounded-lg  w-fit"
              onClick={()=>{handleSearch(item?.Name_Address)}}
            >
              Go
            </button>
            </div>))}
        </div>
      </div>
    </div>}
    </Wrapper>
  );
};

export default SearchMap;