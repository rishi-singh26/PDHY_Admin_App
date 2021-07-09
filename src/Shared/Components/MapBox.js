import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../Styles/index";
import { useSelector } from "react-redux";

const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0006;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapBox(props) {
  const theme = useSelector((state) => state.theme);
  const { colors } = theme;

  const region = props.initialCoords;
  const mapRef = useRef(null);

  return (
    <View style={{ height: props.height }}>
      <MapView
        ref={mapRef}
        showsUserLocation={true}
        style={styles.mapStyle}
        initialRegion={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={props.initialCoords}
          pinColor={colors.primaryColor}
        ></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
