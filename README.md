https://ewaste-disposal.vercel.app/


map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
}));


const ll = new mapboxgl.LngLat(-123.9749, 40.7736);
console.log(ll.lng); // = -123.9749



Query too long {query length}/256 characters	422	Your query cannot contain more than 256 characters.
Query too long - {query tokens length}/20 tokens	422	Your query cannot contain more than 20 word boundary-delimited strings (also known as tokens).
