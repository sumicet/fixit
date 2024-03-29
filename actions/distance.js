export const getDistance = async (origin, destination) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=AIzaSyBeeX2gm6j5BatZmCTnb1gKHqMWzavhCTI`
    );

    const responseData = await response.json();

    const status = responseData.status;
    const meters = responseData.routes[0].legs[0].distance.value;

    return { status, meters };
};

export const getText = meters => {
    var text;
    
    if (meters < 1000) {
        text = '<1km';
    } else {
        if (meters >= 1000 && meters <= 100000) {
            text = Math.round(meters / 1000).toString() + 'km';
        } else {
            text = 'far';
        }
    }

    return text;
};
