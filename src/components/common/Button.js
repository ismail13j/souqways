import React from "react";
import {Text, TouchableOpacity, ActivityIndicator, View} from "react-native";
import RightArrow from "react-native-vector-icons/Ionicons";
import constants from "../../constants";
import {moderateScale} from "../../helper/responsiveFont";
const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.loading}
      style={[
        {
          borderColor: constants.colors.White,
          backgroundColor: constants.colors.Primary,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: moderateScale(50),
          margin: moderateScale(5),
          borderWidth: moderateScale(1),
        },
        props.style,
      ]}>
      {props.loading ? (
        <ActivityIndicator color={props.loaderColor || "white"} size="small" />
      ) : (
        <View style={{flexDirection: "row"}}>
          <Text
            style={[
              {
                fontFamily: "Poppins-Medium",
                fontSize: moderateScale(16),
                paddingLeft: moderateScale(0),
                alignSelf: "center",
                marginLeft: moderateScale(10),
                marginRight: moderateScale(20),
                color: constants.colors.White,
              },
              props.inputStyle,
            ]}>
            {props.title}
          </Text>
          {props.hideArrow ? null : (
            <RightArrow
              name="ios-arrow-forward"
              size={25}
              color={constants.colors.White}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
