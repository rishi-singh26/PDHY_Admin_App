import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../Redux/Auth/ActionCreator";
import { validateEmail } from "../../../Shared/Functions/index";
import {
  changeToDark,
  changeToLight,
} from "../../../Redux/Theme/ActionCreator";
import { adminEmails } from "../../../Constants/Api";

export default function Login(props) {
  // Global state
  const theme = useSelector((state) => state.theme);
  const { colors } = theme;
  // local state
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [shouldShowPassword, setShouldShowPassword] = useState(true);
  const [emailErr, setEmailErr] = useState("");

  const dispatch = useDispatch();

  const loginUserOnDataValidation = (username, password) => {
    if (!validateEmail(username) || !adminEmails.includes(username)) {
      setEmailErr("Enter a valid email");
      return;
    }
    setEmailErr("");
    dispatch(loginUser({ username, password }));
  };

  return (
    <View>
      <View style={[styles.header, { backgroundColor: colors.backOne }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather
            color={"#fff"}
            size={24}
            name="plus-square"
            style={[styles.iconStyle, { backgroundColor: colors.primaryColor }]}
          />
          <Text style={[styles.headerText, { color: colors.textOne }]}>
            P.D.H.Y Admin
          </Text>
        </View>
        <Feather
          onPress={() => {
            theme.mode ? dispatch(changeToDark()) : dispatch(changeToLight());
          }}
          color={colors.textOne}
          size={24}
          name={theme.mode ? "moon" : "sun"}
          style={[
            styles.iconStyle,
            { backgroundColor: colors.backTwo, padding: 6 },
          ]}
        />
      </View>
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor: colors.backTwo, color: colors.textOne },
        ]}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      {emailErr.length > 0 ? (
        <Text style={[styles.errTxt, { color: colors.primaryErrColor }]}>
          {emailErr}
        </Text>
      ) : null}
      <View
        style={[
          styles.textInput,
          styles.textInputView,
          { backgroundColor: colors.backTwo },
        ]}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={pass}
          onChangeText={(text) => {
            setPass(text);
          }}
          style={{ flex: 1, color: colors.textOne }}
          secureTextEntry={shouldShowPassword}
        />
        <Feather
          color={colors.textTwo}
          size={18}
          name={shouldShowPassword ? "eye" : "eye-off"}
          onPress={() => {
            setShouldShowPassword(!shouldShowPassword);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => loginUserOnDataValidation(email, pass)}
        style={[styles.loginBtn, { backgroundColor: colors.primaryColor }]}
      >
        <Text style={styles.loginBtnTxt}>Login</Text>
      </TouchableOpacity>
      <View style={styles.btnsView}>
        <Text
          onPress={() => props.onForgotPassPress()}
          style={[
            styles.loginBtnTxt,
            styles.forgotPasswordBtn,
            { color: colors.textOne, borderRightColor: colors.textOne },
          ]}
        >
          Forgot Password
        </Text>
        {/* <Text
          onPress={() => props.onSignupPress()}
          style={[
            styles.loginBtnTxt,
            styles.signUpBtn,
            { color: colors.textOne },
          ]}
        >
          SignUp
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnsView: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordBtn: {
    color: "#000",
    alignSelf: "center",
    marginTop: 15,
    marginHorizontal: 5,
    paddingRight: 10,
    borderRightWidth: 1,
  },
  signUpBtn: {
    color: "#000",
    alignSelf: "center",
    marginTop: 15,
    marginHorizontal: 5,
  },
  iconStyle: {
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
  },
  header: {
    marginHorizontal: 30,
    marginTop: 40,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 27,
    fontWeight: "700",
  },
  textInput: {
    marginHorizontal: 25,
    marginVertical: 13,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 10,
    fontSize: 15,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 40,
    alignItems: "center",
    borderRadius: 10,
  },
  loginBtnTxt: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  errTxt: {
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 30,
  },
});
