import Context from "./Context";
import { useState , useEffect} from "react";
import mapboxgl from 'mapbox-gl';


const State = (props) => {

    const [isdark, setisdark] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [iscartupdated, setiscartupdated] = useState(false);
    const [ispopup, setispopup] = useState(false)
    const [islogin, setislogin] = useState(true);
    const [Location, setLocation] = useState("")
    const [Locationstate, setLocationstate] = useState("")
    const [User, setUser] = useState(null);
    const [facdata, setfacdata] = useState([])
    const [fetcheddata, setfetcheddata] = useState([])

    const [category, setcategory] = useState([]);
    const [subcategory, setsubcategory] = useState([]);
    const [Item, setItem] = useState([]);


  const ReverseGeocodeaddress = async (lat , log) => {
    mapboxgl.accessToken =
    "pk.eyJ1IjoibmlzaGFudDc0MTIiLCJhIjoiY2xtYm42NHI5MWN0ZTNkbzVsdzhkNnl0bSJ9.FXHqQifsNwqwWW3g4qEZgw";

  // Construct the API URL with separate lat and lon parameters
  const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${log},${lat}.json?access_token=${mapboxgl.accessToken}`;

  try {
    const response = await fetch(geocodingApiUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const city = data.features[0].context.find(
          (context) => context.id.startsWith("place.")
        );
        const state =  data.features[0].context.find(
          (context) => context.id.startsWith("region.")
        );

        if (city) {
          console.log("City:", city.text);
          setLocation(city.text);
        } else {
          console.error("City not found in context.");
        }

        if (state) {
          console.log("State:", state.text);
          setLocationstate(state.text);
        } else {
          console.error("State not found in context.");
        }
      
      } else {
        console.error("No results found.");
      }
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  };

  // To fetch the Ewaste Facility data
  const fetchcitystate = async () => {
    setisLoading(true);

    setisLoading(false);
  }

  const fetchaddress = async () => {
    setisLoading(true);
    const sendstate =  Locationstate?.replace(/\s/g, "").toLowerCase();
    console.log(sendstate);
 
  
      

    setisLoading(false);

  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(longitude , latitude)
      ReverseGeocodeaddress(latitude , longitude);
    });  
  }, [])


    useEffect(() => {
        fetchcitystate();
         
         fetchaddress();
    }, [Locationstate])

  return (
    <Context.Provider value={{fetcheddata,Locationstate , Location , setLocation }}>
        {props.children}
    </Context.Provider>
  )
}

export default State