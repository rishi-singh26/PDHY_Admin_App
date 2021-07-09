import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Applications from "./Components/Applications";

const Tab = createMaterialTopTabNavigator();

function NewApplications(props) {
  return <Applications applicationStatusId={0} {...props} />;
}

function ProcessingApplications(props) {
  return <Applications applicationStatusId={1} {...props} />;
}

function AcceptedApplications(props) {
  return <Applications applicationStatusId={2} {...props} />;
}

function RejectedApplications(props) {
  return <Applications applicationStatusId={-1} {...props} />;
}

export default function PharmacyApplications() {
  return (
    <Tab.Navigator style={{ elevation: 0.2 }}>
      <Tab.Screen name="New" component={NewApplications} />
      <Tab.Screen name="Processing" component={ProcessingApplications} />
      <Tab.Screen name="Accepted" component={AcceptedApplications} />
      <Tab.Screen name="Rejected" component={RejectedApplications} />
    </Tab.Navigator>
  );
}
