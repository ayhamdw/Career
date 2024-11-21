import React from "react";
import MapView from "react-native-maps";

interface MapComponentProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const MapComponent: React.FC<MapComponentProps> = ({ region }) => {
  return (
    <MapView
      region={region}
      style={{ width: "100%", height: "60%", marginTop: 20 }}
      showsUserLocation={true}
      zoomEnabled={true}
    />
  );
};
export default MapComponent;
