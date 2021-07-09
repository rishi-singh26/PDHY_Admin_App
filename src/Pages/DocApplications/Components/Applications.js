import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "../../../Constants/Api";
import { showSnack } from "../../../Redux/Snack/ActionCreator";
import { convertSecondsTODate } from "../../../Shared/Functions";
import { Ionicons } from "@expo/vector-icons";
import CustomActivityIndicator from "../../../Shared/Components/CustomActivityIndicator";
import { showAlert } from "../../../Redux/Alert/ActionCreator";

export default function Applications(props) {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useSelector((state) => state.theme);
  const { colors } = theme;

  const dispatch = useDispatch();

  const snack = (message = "Error while getting new applications") => {
    dispatch(showSnack(message));
  };

  const getAppliStatusIconAndColor = (statusId) => {
    let iconAndColor = {
      iconName: "file-tray-full",
      color: colors.primaryColor,
      backColor: colors.primarySuperLightColor,
    };
    if (parseInt(statusId) == -1) {
      iconAndColor.iconName = "close";
      iconAndColor.color = colors.primaryErrColor;
      iconAndColor.backColor = colors.primaryErrLightColor;
    } else if (parseInt(statusId) == 0) {
      iconAndColor.iconName = "file-tray-full";
      iconAndColor.color = colors.primaryColor;
      iconAndColor.backColor = colors.primarySuperLightColor;
    } else if (parseInt(statusId) == 1) {
      iconAndColor.iconName = "flag-outline";
      iconAndColor.color = colors.yellow;
      iconAndColor.backColor = colors.lightYellow;
    } else if (parseInt(statusId) == 2) {
      iconAndColor.iconName = "checkbox-outline";
      iconAndColor.color = colors.green;
      iconAndColor.backColor = colors.lightGreen;
    }
    return iconAndColor;
  };

  const getApplications = async () => {
    setIsLoading(true);
    if (!auth.currentUser) {
      snack("Autentication error, logout and login again");
      return;
    }

    firestore
      .collection("doctorApplications")
      // .where("statusId", "==", 0)
      .where("statusId", "==", props.applicationStatusId)
      .onSnapshot(
        (applications) => {
          let docApplications = [];
          applications.forEach((application) => {
            const data = application.data();
            const _id = application.id;
            docApplications.push({ _id, ...data });
          });
          setApplications(docApplications);
          setIsLoading(false);
        },
        (err) => {
          snack();
          setIsLoading(false);
          console.log("Error in getting application with id ", id, err.message);
        }
      );
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
    data = {},
    successFunc
  ) => {
    if (!auth.currentUser) {
      snack("Authentication error, logout and login again");
      return;
    }
    try {
      firestore
        .collection("doctorApplications")
        .doc(applicationId)
        .update({
          ...{
            statusId: statusId,
            statusType: statusType,
            status: { id: statusId, type: statusType },
          },
          ...data,
        })
        .then(() => {
          successFunc();
          snack(`Successfully changed application status to: ${statusType}`);
        })
        .catch((err) => {
          snack(`Error in changing application status ${err.message}`);
          console.log(`Error in changing application status ${err.message}`);
        });
    } catch (err) {
      snack(`Error in changing application status ${err.message}`);
      console.log(`Error in changing application status ${err.message}`);
    }
  };

  const handleAppliPres = (application) => {
    if (application.statusId == 0) {
      dispatch(
        showAlert(
          `Mark application as processing`,
          `This action can not be reversed!`,
          () =>
            changeAppliStatus(
              application._id,
              1,
              "Processing",
              { statusDescription: `Application under verification` },
              () =>
                props.navigation.navigate("DocApplicationDetail", {
                  application,
                })
            )
        )
      );
    } else if (application.statusId == 1) {
      props.navigation.navigate("DocApplicationDetail", { application });
    } else if (application.statusId == 2) {
      props.navigation.navigate("DocApplicationDetail", { application });
    } else if (application.statusId == -1) {
      props.navigation.navigate("DocApplicationDetail", { application });
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={applications}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            colors={[colors.primaryColor, "#fff"]}
            refreshing={isLoading}
            onRefresh={getApplications}
          />
        }
        renderItem={({ item, index }) => {
          // console.log(item);
          const { iconName, color, backColor } = getAppliStatusIconAndColor(
            item?.status?.id
          );
          return (
            <TouchableOpacity
              style={styles.applicationContainer}
              onPress={() => {
                handleAppliPres(item);
              }}
            >
              <View style={{ maxWidth: "75%" }}>
                <View style={styles.horizontalView}>
                  <Text style={styles.docName}>{item.name + " - "}</Text>
                  <Text style={styles.docSpecialization}>
                    {item.specialization}
                  </Text>
                </View>
                <View style={{ marginTop: 4 }}>
                  <Text>{item.automaticallyGeneratedAddress[0].formatted}</Text>
                </View>
                <View style={styles.horizontalView}>
                  <Text>UPRN: </Text>
                  <Text style={{ fontWeight: "700" }}>{item.uprn}</Text>
                </View>
                <View style={styles.horizontalView}>
                  <Text>Submitted on: </Text>
                  <Text>
                    {convertSecondsTODate(
                      item.applicationSubmitionDate.seconds
                    ).toDateString()}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name={iconName}
                  color={color}
                  size={18}
                  style={[
                    styles.appliStatusIcon,
                    { backgroundColor: backColor },
                  ]}
                />
                <Text style={{ color: color }}>
                  {item?.status?.type || "NA"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {isLoading && <CustomActivityIndicator />}
      {!isLoading && applications.length == 0 && (
        <View style={{ marginVertical: 100, marginHorizontal: 40 }}>
          <Text
            style={{
              fontSize: 22,
              color: colors.textThree,
              alignSelf: "center",
            }}
          >
            No applications available.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  applicationContainer: {
    backgroundColor: "#fff",
    marginTop: 7,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  docName: {
    fontSize: 19,
    color: "#333",
    fontWeight: "700",
  },
  docSpecialization: {
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
  },
  horizontalView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  appliStatusIcon: {
    padding: 10,
    borderRadius: 30,
  },
});
