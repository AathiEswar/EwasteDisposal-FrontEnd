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
