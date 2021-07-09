import React from "react";
import { StatusBar } from "react-native";
import Home from "../Pages/Home/index";
import Authentication from "../Pages/Authentication";
import Demo from "../Pages/Demo/index";

import { Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { hideSnack } from "../Redux/Snack/ActionCreator";
import DocApplications from "../Pages/DocApplications";
import PharmacyApplications from "../Pages/PharApplications";
import DocApplicationDetail from "../Pages/DocApplications/Components/ApplicationDetail";
import PharmacyApplicationDetail from "../Pages/PharApplications/Components/ApplicationDetail";
import ImageViewer from "../Shared/Components/ImageViewer";

import CustomAlert from "../Shared/Components/CustomAlert";
import ThreeBtnAlert from "../Shared/Components/ThreeBtnAlert";

const Stack = createStackNavigator();

export default function Navigator() {
  const auth = useSelector((state) => state.auth);
  const snack = useSelector((state) => state.snack);
  const theme = useSelector((state) => state.theme);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme.mode ? "dark-content" : "light-content"}
        backgroundColor={theme.colors.backOne}
      />
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { fontWeight: "700" },
          headerTintColor: theme.colors.textOne,
          headerStyle: { backgroundColor: theme.colors.backOne },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {auth.isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "P.D.H.Y Admin",
                headerTitleStyle: { fontSize: 25, fontWeight: "700" },
                headerTitleContainerStyle: { padding: 10 },
              }}
            />
            <Stack.Screen
              name="Demo"
              component={Demo}
              options={{ title: "Settings" }}
            />
            <Stack.Screen
              name={"DocApplications"}
              component={DocApplications}
              options={{ title: "Doctor applications" }}
            />
            <Stack.Screen
              name={"PharmacyApplications"}
              component={PharmacyApplications}
              options={{ title: "Pharmacy applications" }}
            />
            <Stack.Screen
              name={"DocApplicationDetail"}
              component={DocApplicationDetail}
              options={{ title: "Detail" }}
            />
            <Stack.Screen
              name={"PharmacyApplicationDetail"}
              component={PharmacyApplicationDetail}
              options={{ title: "Detail" }}
            />
            <Stack.Screen
              name={"ImageViewer"}
              component={ImageViewer}
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Authentication"
            component={Authentication}
          />
        )}
      </Stack.Navigator>
      <Snackbar
        visible={snack.isVisible}
        onDismiss={() => dispatch(hideSnack())}
        action={
          snack.actionTxt
            ? {
                label: snack.actionTxt,
                onPress: () => {
                  snack.actionFunc();
                  dispatch(hideSnack());
                },
              }
            : null
        }
      >
        {snack.message}
      </Snackbar>
      <CustomAlert isVisible={alert.isVisible} />
      <ThreeBtnAlert isVisible={alert.is3BtnAlertVisible} />
    </NavigationContainer>
  );
}
