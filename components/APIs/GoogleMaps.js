import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const GoogleMaps = props => {
    return (
        <MapView
            {...props}
            region={props.region}
            style={{ height: 300 }}
            zoomEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            moveOnMarkerPress={false}
            showsPointsOfInterest
            showsBuildings
        >
            <Marker
                coordinate={{
                    latitude: props.region.latitude,
                    longitude: props.region.longitude,
                }}
            />
        </MapView>
    );
};

export default GoogleMaps;
