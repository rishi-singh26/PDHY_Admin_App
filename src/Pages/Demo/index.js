import React, { useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Button,
  Switch,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Auth/ActionCreator";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Feather } from "@expo/vector-icons";
import { hideSnack, showSnack } from "../../Redux/Snack/ActionCreator";
import { changeToDark, changeToLight } from "../../Redux/Theme/ActionCreator";
export default function Demo(props) {
  // Action sheet provider
  const { showActionSheetWithOptions } = useActionSheet();

  const theme = useSelector((state) => state.theme);
  const globalAuth = useSelector((state) => state.auth);

  // console.log(theme);

  const dispatch = useDispatch();

  const setHeaderOptions = () => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                paddingLeft: 15,
                paddingVertical: 12,
                paddingRight: 20,
              }}
              onPress={() => {
                openLogoutActionSheet();
              }}
            >
              <Feather name="log-out" size={22} color={theme.colors.textOne} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  };

  const openLogoutActionSheet = () => {
    const options = ["Logout", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    const message = "Do you want to logout?";
    const messageTextStyle = {
      fontSize: 17,
      fontWeight: "700",
      color: theme.colors.textOne,
    };
    const containerStyle = { backgroundColor: theme.colors.backTwo };
    const textStyle = { color: theme.colors.textOne, fontWeight: "700" };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        message,
        messageTextStyle,
        containerStyle,
        textStyle,
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          dispatch(logoutUser());
          return;
        }
      }
    );
  };

  useEffect(() => {
    setHeaderOptions();
  }, [theme]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.backTwo }]}
    >
      <ScrollView>
        <Text></Text>
        {/* <Button
        onPress={() => dispatch(showSnack("This is a nice message"))}
        title="Show snack"
        color="#841584"
        accessibilityLabel="Tap to show snack"
      />
      <Text></Text>
      <Button
        onPress={() => dispatch(hideSnack())}
        title="Hide snack"
        color="#841584"
        accessibilityLabel="Tap to hide snack"
      />
      <Text></Text> */}
        {/* <Text style={{ color: theme.colors.textOne }}>Toggel theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme.mode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            theme.mode ? dispatch(changeToDark()) : dispatch(changeToLight());
          }}
          value={theme.mode}
        /> */}
        {/* <Text style={{ color: theme.colors.textOne, fontWeight: "700" }}>
        Theme data
      </Text>
      <Text style={{ color: theme.colors.textOne }}>
        {JSON.stringify(theme, null, 2)}
      </Text>
      <Text style={{ color: theme.colors.textOne, fontWeight: "700" }}>
        Authentiction data
      </Text>
      <Text style={{ color: theme.colors.textOne}}>
        {JSON.stringify(globalAuth, null, 2)}
      </Text> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
