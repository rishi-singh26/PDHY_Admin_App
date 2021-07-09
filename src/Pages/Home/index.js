import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ListTile from "./Components/ListTile";

export default function Home(props) {
  const theme = useSelector((state) => state.theme);

  const { colors } = theme;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.backTwo }]}
    >
      <ListTile
        tileText={"Doctor applications"}
        rightIcon={"chevron-right"}
        style={styles.listTileContainer}
        onPress={() => props.navigation.navigate("DocApplications")}
        rightIconColor={colors.textOne}
      />
      <ListTile
        tileText={"Pharmacy applications"}
        rightIcon={"chevron-right"}
        style={styles.listTileContainer}
        onPress={() => props.navigation.navigate("PharmacyApplications")}
        rightIconColor={colors.textOne}
      />
      <ListTile
        tileText={"Settings"}
        rightIcon={"chevron-right"}
        style={styles.listTileContainer}
        onPress={() => props.navigation.navigate("Demo")}
        rightIconColor={colors.textOne}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTileContainer: { marginTop: 7, paddingVertical: 15 },
});
