import * as ActionTypes from "./ActionTypes";

const lightMode = {
  secondaryColor: "",
  thirdColor: "",
  backOne: "#fff",
  backTwo: "#f2f2f2",
  backThree: "#efefef",
  backFour: "#000",
  transparentBackOne: "#fffd",
  textOne: "#000",
  textTwo: "#444",
  textThree: "#777",
  textFour: "#fff",
  borderColor: "#efefef",
};

const darkMode = {
  secondaryColor: "",
  thirdColor: "",
  backOne: "#000",
  backTwo: "#333",
  backThree: "#555",
  backFour: "#fff",
  transparentBackOne: "#0005",
  textOne: "#fff",
  textTwo: "#aaa",
  textThree: "#888",
  textFour: "#000",
  borderColor: "#555",
};

const commonColors = {
  primaryColor: "#3071ff",
  primaryLightColor: "#5c8bf2",
  primaryErrColor: "#f25246",
  primarySuperFadedColor: "#95b5fc",
  primaryColor: "#3b73ff",
  primaryErrColor: "#f25246",
  primaryErrLightColor: "#ffdbd9",
  primaryLightColor: "#5c8bf2",
  primarySuperLightColor: "#d4e1ff",
  primaryDarkColor: "#0041E7",
  yellow: "#ffbb00",
  lightYellow: "#f7f2a6",
  green: "#0e8700",
  lightGreen: "#b5f7ad",
};

export const Theme = (
  state = { colors: { ...lightMode, ...commonColors }, mode: true },
  action
) => {
  switch (action.type) {
    case ActionTypes.SWITCH_TO_DARK:
      return {
        ...state,
        colors: { ...darkMode, ...commonColors },
        mode: false,
      };

    case ActionTypes.SWITCH_TO_LIGHT:
      return {
        ...state,
        colors: { ...lightMode, ...commonColors },
        mode: true,
      };

    case ActionTypes.TOGGEL_THEME:
      return {
        ...state,
        colors: state.mode
          ? { ...darkMode, ...commonColors }
          : { ...lightMode, ...commonColors },
        mode: !state.mode,
      };

    // case ActionTypes.LOGOUT_SUCCESS:
    //   return { colors: lightMode, mode: true };

    default:
      return state;
  }
};
