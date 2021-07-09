import { Alert, Clipboard } from "react-native";
export function validateEmail(email) {
  // this is also an option for email regx
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailRe =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRe.test(String(email).toLowerCase());
}

// Validated whatsapp text links for indian phone numbers ie starting with 91
export function validateWaLinkForINNum(link) {
  const regex =
    /https:\/\/wa\.me\/91(?:\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$)/;
  return regex.test(String(link).toLowerCase());
}

export function validateUrl(value) {
  const urlRegex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  return urlRegex.test(value);
}

export function customAlert(message, text, onOkPress, cancelable = true) {
  Alert.alert(
    message,
    text,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => onOkPress(),
        style: "default",
      },
    ],
    { cancelable: cancelable }
  );
}

export function sortArrayOfObjs(array, sortingKey) {
  const sortedArray = [...array];

  sortedArray.sort((a, b) =>
    a[sortingKey] < b[sortingKey] ? 1 : b[sortingKey] < a[sortingKey] ? -1 : 0
  );

  // console.log("Here is the sorted array", sortedArray);

  return sortedArray;
}

export function copyToClipboard(data) {
  Clipboard.setString(data.scannedData.data);
  // toast("Copied to clipboard.");
}

/**
 * Convert seconds to date object
 * @param {Number} secs
 * @returns Date Object
 */
export function convertSecondsTODate(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
export function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export function getDoctorCityIdFromName(name) {
  if (name.includes("Mysuru")) return 1;
  if (name.includes("Mandya")) return 0;
  if (name.includes("Bengalore") || name.includes("Bengaluru")) return 2;
  return 3;
}
export function getPharmacyCityIdFromName(name) {
  if (name.includes("Mysuru")) return 1;
  if (name.includes("Mandya")) return 2;
  if (name.includes("Bangalore") || name.includes("Bengaluru")) return 3;
  return 5;
}
