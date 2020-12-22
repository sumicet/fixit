export const getDistance = async (origin, destination) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=AIzaSyBM6YK35TEtbw_k76cKUnwOMsEjiFmBRm0`
    );

    const responseData = await response.json();

    const status = responseData.status;
    const meters = responseData.routes[0].legs[0].distance.value;

    return { status, meters };
};
