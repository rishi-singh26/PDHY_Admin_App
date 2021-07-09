import * as ActionTypes from "./ActionTypes";
import { auth, firestore } from "../../Constants/Api";
import { showSnack } from "../Snack/ActionCreator";

export const signUpUser = (userData) => (dispatch) => {
  dispatch(requestLogin());

  // console.log(userData);

  return auth
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then((user) => {
      dispatch(showSnack("SignUp Successfull"));
      userData.userId = auth.currentUser.uid;
      userData.isEmailVerified = false;
      userData.photoURL = null;
      delete userData.password;
      dispatch(saveUserData(userData));
    })
    .catch((err) => {
      console.log("Error in signup", err.message);
      dispatch(loginError(err.message));
      // toast("Sign up failed");
    });
};

const saveUserData = (userData) => (dispatch) => {
  console.log("Here is the userData to be saved", userData);
  firestore
    .collection("userData")
    .add(userData)
    .then(() => {
      dispatch(receiveLogin(userData));
      // console.log({ mess: "User data added and login received", data: userData });
      // toast("Sign up successfull");
    })
    .catch((error) => {
      console.log("Error in saving user data ", error.message);
      // dispatch(loginError(err.message));
      // toast("Sign up failed");
    });
};

const requestLogin = () => ({ type: ActionTypes.LOGIN_REQUEST });

const receiveLogin = (user) => ({ type: ActionTypes.LOGIN_SUCCESS, user });

const loginError = (message) => ({ type: ActionTypes.LOGIN_FAILURE, message });

export const loginUser = (creds) => (dispatch) => {
  // console.log(creds, "in action creator");
  dispatch(requestLogin());

  return auth
    .signInWithEmailAndPassword(creds.username, creds.password)
    .then((user) => {
      console.log(user);
      dispatch(showSnack("Login Successfull"));
      // console.log("Login success getting user data now");
      const userData = {
        email: user.user.email,
        userId: user.user.uid,
        fullName: user.user.displayName,
        isEmailVerified: user.user.emailVerified,
        photoURL: user.user.photoURL,
      };
      console.log(userData);
      dispatch(receiveLogin(userData));
    })
    .catch((error) => {
      dispatch(loginError(error.message));
      console.log(error.message);
      dispatch(showSnack(error.message));
    });
};

const requestLogout = () => ({ type: ActionTypes.LOGOUT_REQUEST });

const receiveLogout = () => ({ type: ActionTypes.LOGOUT_SUCCESS });

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  auth
    .signOut()
    .then(() => {
      // toast("Logout successfull")
    })
    .catch((error) => {
      // An error happened.
    });
  // dispatch(dataFailed("Unauthorized"));
  dispatch(receiveLogout());
};
