import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {primaryColor, whiteColor} from "../constants/colors";
import {moderateScale} from "../helper/responsiveFont";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {label, onPressButton} = this.props;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: primaryColor,
          height: moderateScale(50),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: moderateScale(30),
        }}
        onPress={onPressButton}>
        <Text
          style={{
            color: whiteColor,
            fontSize: moderateScale(14),
            fontWeight: "bold",
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}
