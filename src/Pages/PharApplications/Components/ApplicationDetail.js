import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Image,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "../../../Constants/Api";
import { showAlert } from "../../../Redux/Alert/ActionCreator";
import { showSnack } from "../../../Redux/Snack/ActionCreator";
import MapBox from "../../../Shared/Components/MapBox";
import { getPharmacyCityIdFromName } from "../../../Shared/Functions";
import { SCREEN_WIDTH } from "../../../Shared/Styles";
import CustomActivityIndicator from "../../../Shared/Components/CustomActivityIndicator";

export default function PharmacyApplicationDetail(props) {
  const theme = useSelector((state) => state.theme);
  const { colors } = theme;

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { application } = props.route.params;

  // console.log(application);

  const {
    name,
    liscenseNumber,
    establishedIn,
    email,
    phoneNumber,
    city,
    address,
    postalCode,
    automaticallyGeneratedAddress,
    coords,
    statusId,
    _id,
    isGenericStore,
    openTill,
    image,
    aadharImg,
  } = application;

  const snack = (message = "Error while getting new applications") => {
    dispatch(showSnack(message));
  };

  /**
   * change application status
   * @param {Number} applicationId
   * @param {Number} statusId
   * @param {String} statusType
   * @param {Function} successFunc
   */
  const changeAppliStatus = (
    applicationId,
    statusId,
    statusType,
    successFunc
  ) => {
    setIsLoading(true);
    if (!auth.currentUser) {
      snack("Authentication error, logout and login again");
      setIsLoading(false);
      return;
    }
    try {
      firestore
        .collection("pharmacyApplications")
        .doc(applicationId)
        .update({
          statusId: statusId,
          statusType: statusType,
          status: { id: statusId, type: statusType },
        })
        .then(() => {
          successFunc();
          setIsLoading(false);
          snack(`Successfully changed application status to: ${statusType}`);
        })
        .catch((err) => {
          snack(`Error in changing application status ${err.message}`);
          setIsLoading(false);
          console.log(`Error in changing application status ${err.message}`);
        });
    } catch (err) {
      snack(`Error in changing application status ${err.message}`);
      setIsLoading(false);
      console.log(`Error in changing application status ${err.message}`);
    }
  };

  const rejectApplication = () => {
    dispatch(
      showAlert(
        `Are you sure?`,
        `This action is irreversibel, check again before proceeding!`,
        () =>
          changeAppliStatus(_id, -1, "Rejected", () => {
            props.navigation.goBack();
          })
      )
    );
  };

  const acceptApplication = () => {
    dispatch(
      showAlert(
        `Are you sure?`,
        `This action is irreversibel, check again before proceeding!`,
        addDataToStore
      )
    );
    // changeAppliStatus(_id, 2, "Accepted", () => props.navigation.goBack());
  };

  const addDataToStore = () => {
    setIsLoading(true);
    if (!auth.currentUser) {
      dispatch(showSnack("Authentication error, logout and login again"));
      setIsLoading(false);
      return;
    }
    try {
      const pharmacy = {
        cityId: getPharmacyCityIdFromName(city),
        cityName: city,
        contact: phoneNumber,
        establishedIn,
        image,
        openTill,
        // parmacyId,
        pharmacyLocation: address,
        pharmacyName: name,
        uploadDate: new Date(),
        aadharImg,
        liscenseNumber,
        email,
        autoGenAddress: automaticallyGeneratedAddress,
        coords,
        isGenericStore,
      };
      // console.log(pharmacy);
      firestore
        .collection("pharmacies")
        .add(pharmacy)
        .then(() => {
          changeAppliStatus(_id, 2, "Accepted", () =>
            props.navigation.goBack()
          );
        })
        .catch((err) => {
          setIsLoading(false);
          snack(`Error in uploading pharmacy to DATA STORE ${err.message}`);
          console.log(
            `Error in uploading pharmacy to DATA STORE ${err.message}`
          );
        });
    } catch (err) {
      setIsLoading(false);
      snack(`Error in uploading pharmacy to DATA STORE ${err.message}`);
      console.log(`Error in uploading pharmacy to DATA STORE ${err.message}`);
    }
  };

  const images = [
    { img: image, name: "Profile" },
    { img: aadharImg, name: "Aadhar" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading && <CustomActivityIndicator />}
      <ScrollView>
        <MapBox
          height={400}
          initialCoords={
            coords
              ? coords
              : {
                  latitude: 12.515721,
                  longitude: 76.880943,
                }
          }
        />
        <View style={styles.addressView}>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Automatically generated address
          </Text>
          <Text style={{ fontSize: 15, paddingVertical: 10 }}>
            {automaticallyGeneratedAddress[0].formatted}
          </Text>
        </View>
        <View style={styles.imageView}>
          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.images,
                    { marginRight: index % 2 != 0 ? 10 : 0 },
                  ]}
                  onPress={() =>
                    props.navigation.navigate("ImageViewer", {
                      imgData: { image: item.img },
                    })
                  }
                  onLongPress={() => {
                    Linking.canOpenURL(item.img)
                      ? Linking.openURL(item.img)
                      : snack("Can not open image!");
                  }}
                >
                  <Image source={{ uri: item.img }} style={styles.imageStyle} />
                  <Text style={{ paddingTop: 10, fontSize: 17 }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Text
          style={[styles.textInput, { marginTop: 7 }]}
        >{`Name: ${name}`}</Text>
        <Text style={styles.textInput}>{`Email: ${email}`}</Text>
        <Text style={styles.textInput}>{`Phone No: ${phoneNumber}`}</Text>
        <Text
          style={[styles.textInput, { marginTop: 7 }]}
        >{`Liscense Number: ${liscenseNumber}`}</Text>
        <Text
          style={styles.textInput}
        >{`Established in: ${establishedIn}`}</Text>
        <Text style={[styles.textInput, { marginTop: 7 }]}>{`Generic Store: ${
          isGenericStore ? `Yes` : `No`
        }`}</Text>
        <Text style={styles.textInput}>{`Address: ${address}`}</Text>
        <Text style={styles.textInput}>{`City: ${city}`}</Text>
        <Text style={styles.textInput}>{`Postal Code: ${postalCode}`}</Text>
        <Text
          style={styles.textInput}
        >{`Store closing time: ${openTill}`}</Text>
      </ScrollView>
      {statusId == 1 ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[
              styles.btnStyle,
              { backgroundColor: colors.primaryErrColor },
            ]}
            onPress={rejectApplication}
          >
            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>
              Reject
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnStyle, { backgroundColor: colors.primaryColor }]}
            onPress={acceptApplication}
          >
            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
  },
  btnStyle: {
    flex: 1,
    paddingVertical: 10,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  addressView: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 7,
  },
  imageView: {
    backgroundColor: "#fff",
    marginTop: 7,
    padding: 10,
  },
  images: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 7,
  },
  imageStyle: {
    backgroundColor: "#fff",
    borderRadius: 6,
    height: SCREEN_WIDTH / 2 - 60,
    width: SCREEN_WIDTH / 2 - 60,
  },
});
