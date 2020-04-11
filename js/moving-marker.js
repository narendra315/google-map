// 1. initalize the google map
// 2. create an array of bots with predefined path(lat, lng) to move on the google map
// 3. render the bots on the map on their starting points
// 4. set interval of 2/3 seconds to fetch the new location(lat/lng)
// 5. move the bot from earlier position to new one
// 5.1. calculate the delta of each co-ordinate and update them on an much lower timeinterval

// How to smoothly move the marker from one position to another, Refer below URL for help
// https://jsfiddle.net/user2314737/06rut61g/
let map;
const mapCord = {
    lat: 30.731038,
    lng: 76.775995
};
const mapZoom = 12;
const numDeltas = 100;
const delay = 10; //milliseconds
const bots = {
    b1: {
        name: 'red bot',
        route: [{
            "lat": 30.711356,
            "lng": 76.773137,
            "steps": 0,
            "rotate": 57
        }, {
            "lat": 30.714323,
            "lng": 76.777869,
            "steps": 100,
            "rotate": 57
        }, {
            "lat": 30.715263,
            "lng": 76.777994,
            "steps": 20,
            "rotate": 8
        }, {
            "lat": 30.719882,
            "lng": 76.773980,
            "steps": 120,
            "tooltip": "Speed Voilation 102 Km/hr!",
            "rotate": -40
        }, {
            "lat": 30.720258,
            "lng": 76.773074,
            "steps": 10,
            "rotate": -74
        }, {
            "lat": 30.720768,
            "lng": 76.773168,
            "steps": 10,
            "rotate": 15
        }, {
            "lat": 30.720889,
            "lng": 76.774043,
            "steps": 15,
            "rotate": 90
        }, {
            "lat": 30.727266,
            "lng": 76.784288,
            "steps": 200,
            "rotate": 57
        }, {
            "lat": 30.727991,
            "lng": 76.784460,
            "steps": 15,
            "rotate": 8
        }, {
            "lat": 30.732891,
            "lng": 76.780165,
            "steps": 120,
            "rotate": -40
        }, {
            "lat": 30.732971,
            "lng": 76.779165,
            "steps": 15,
            "rotate": -74
        }, {
            "lat": 30.731038,
            "lng": 76.775995,
            "steps": 70,
            "tooltip": "Total 3.5Km traveled",
            "rotate": -120
        }],
        // icon: "images/bots/b1.png",
        routeColor: '#E74C3C'
    },
    b2: {
        name: 'green bot',
        route: [{
            lat: 30.712500,
            lng: 76.745695,
            steps: 150,
            rotate: -35
        }, {
            lat: 30.719207,
            lng: 76.740809,
            steps: 150,
            rotate: -35

        }, {
            lat: 30.725614,
            lng: 76.751256,
            steps: 200,
            rotate: 55
        }, {
            lat: 30.726190,
            lng: 76.751520,
            steps: 15,
            rotate: 25
        }, {
            lat: 30.726120,
            lng: 76.752170,
            steps: 15,
            rotate: 75
        }, {
            lat: 30.729419,
            lng: 76.757227,
            steps: 150,
            rotate: 55
        }, {
            lat: 30.732771,
            lng: 76.762528,
            steps: 150,
            rotate: 55
        }, {
            lat: 30.733494,
            lng: 76.762457,
            steps: 15,
            rotate: -10
        }, {
            lat: 30.738628,
            lng: 76.758398,
            steps: 200,
            rotate: -35
        }, {
            lat: 30.738790,
            lng: 76.757980,
            steps: 15,
            rotate: -55
        }, {
            lat: 30.739149,
            lng: 76.757969,
            steps: 15,
            rotate: -15
        }, {
            lat: 30.744597,
            lng: 76.753827,
            steps: 200,
            rotate: -35
        }, {
            lat: 30.744660,
            lng: 76.753221,
            steps: 15,
            rotate: -45
        }, {
            lat: 30.741586,
            lng: 76.748221,
            steps: 150,
            rotate: -120
        }, {
            lat: 30.743393,
            lng: 76.746495,
            steps: 80,
            rotate: -35
        }, {
            lat: 30.741720,
            lng: 76.744005,
            steps: 80,
            rotate: -120
        }, {
            lat: 30.741433,
            lng: 76.744183,
            steps: 12,
            rotate: -200
        }, {
            lat: 30.741586,
            lng: 76.744340,
            steps: 10,
            rotate: -300,
            tooltip: "Delivered in 20 Minutes"
        }],
        // icon: "images/bots/b2.png",
        routeColor: '#2ECC71'
    },
    b3: {
        name: 'blue bot',
        route: [{
            lat: 30.749710,
            lng: 76.641602,
            rotate: 0,
            steps: 0
        }, {
            lat: 30.747980,
            lng: 76.647150,
            rotate: 120,
            steps: 100
        }, {
            lat: 30.744821,
            lng: 76.652183,
            rotate: 130,
            steps: 100
        }, {
            lat: 30.742840,
            lng: 76.660978,
            rotate: 120,
            steps: 110
        }, {
            lat: 30.743027,
            lng: 76.663473,
            rotate: 110,
            steps: 50
        }, {
            lat: 30.740258,
            lng: 76.675174,
            rotate: 120,
            steps: 150
        }, {
            lat: 30.731380,
            lng: 76.701455,
            rotate: 125,
            steps: 250,
            tooltip: "Speed voilation of 120Km/hr."
        }, {
            lat: 30.731664,
            lng: 76.703133,
            steps: 10,
            rotate: 80
        }, {
            lat: 30.735094,
            lng: 76.708841,
            steps: 200,
            rotate: 60
        }, {
            lat: 30.735186,
            lng: 76.709206,
            steps: 100,
            rotate: -20,
            tooltip: "Car parked for 3 hrs"
        }, {
            lat: 30.743043,
            lng: 76.721673,
            steps: 200,
            rotate: 60
        }, {
            lat: 30.743652,
            lng: 76.721994,
            steps: 15,
            rotate: 45
        }, {
            lat: 30.743670,
            lng: 76.722638,
            steps: 15,
            rotate: 100
        }, {
            lat: 30.751766,
            lng: 76.735749,
            steps: 300,
            rotate: 60
        }, {
            lat: 30.750530,
            lng: 76.736628,
            steps: 60,
            rotate: 150,
            tooltip: "Total 13.5Km traveled today"
        }],
        // icon: "images/bots/b3.png",
        routeColor: '#3498DB'
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: mapCord.lat,
            lng: mapCord.lng
        },
        zoom: mapZoom
    });
    renderBots();
}

function renderBots() {
    Object.keys(bots).forEach(function (key) {
        const bot = bots[key];
        bots[key].posIndex = 0;
        const marker = new google.maps.Marker({
            position: bots[key].route[bots[key].posIndex],
            icon: bots[key].icon,
            map: map
        });
        bot.marker = marker;
        createPolyline(bot);
    });
    setInterval(function () {
        updateBotCordinates();
    }, 1000);
}

function updateBotCordinates() {
    Object.keys(bots).forEach(function (key) {
        const bot = bots[key];
        const currIndex = bot.posIndex;
        const totalRecords = bot.route.length;
        if (currIndex === totalRecords) {
            bot.posIndex = 0;
            bot.marker.setPosition(bot.route[bot.posIndex]);
            createPolyline(bot);
        } else {
            bot.posIndex = bot.posIndex + 1;

            const a = bot.route[bot.posIndex - 1];
            const b = bot.route[bot.posIndex];
            const current = new google.maps.LatLng(a.lat, a.lng);
            const moveTo = new google.maps.LatLng(b.lat, b.lng);
            moveBot(bot.polyline, bot.marker, .5, current, moveTo);
        }
    });
}

function moveBot(poly, marker, t, current, moveto) {
    let deltalat = (moveto.lat() - current.lat()) / 100;
    let deltalng = (moveto.lng() - current.lng()) / 100;

    let delay = 10 * t;
    for (let i = 0; i < 100; i++) {
        (function (ind) {
            setTimeout(
                function () {
                    let lat = marker.position.lat();
                    let lng = marker.position.lng();
                    lat += deltalat;
                    lng += deltalng;
                    latlng = new google.maps.LatLng(lat, lng);
                    marker.setPosition(latlng);

                    // setting poly line
                    const path = poly.getPath();
                    const point = new google.maps.LatLng(lat, lng);
                    path.push(point);
                    // setting polyline
                }, delay * ind
            );
        })(i)
    }
}

function createPolyline(bot) {
    try {
        bot.polyline.setMap(null);
    } catch (err) {
        console.error('polyline is not initalized yet');
    } finally {
        bot.polyline = new google.maps.Polyline({
            path: [],
            geodesic: true,
            strokeColor: bot.routeColor,
            strokeOpacity: 1.0,
            strokeWeight: 6
        });
        bot.polyline.setMap(map);
    }
}