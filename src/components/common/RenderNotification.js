import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import constants from "../../constants";
import moment from "moment";
import {strings} from "../../constants/i18n";

const RenderNotification = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.notificationHeading}>{props.notification_title}</Text>
      <Text style={styles.notificationData}>{props.notification}</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={styles.date}>
          {strings.order} : {props.order_id}
        </Text>
        <Text style={styles.date}>
          {moment(props.created_on).format("dddd, MMM DD, YYYY")}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.colors.White,
    margin: moderateScale(5),
    padding: moderateScale(10),
    borderBottomColor: constants.colors.grey,
    borderBottomWidth: 0.5,
    borderRadius: moderateScale(10),
    shadowColor: constants.colors.fadeBorder,
    shadowOffset: {height: 3, width: 1},
    elevation: 2,
  },
  notificationHeading: {
    textAlign: "left",
    fontSize: moderateScale(15),
    fontWeight: "bold",
    fontFamily: "Poppins-Medium",
  },
  notificationData: {
    textAlign: "left",
    fontSize: moderateScale(14),
    fontFamily: "Poppins-Regular",
  },
  date: {
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(12),
  },
});
export default RenderNotification;
