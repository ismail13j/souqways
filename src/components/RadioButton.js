import React from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native";
import {moderateScale} from "../helper/responsiveFont";
import Constants from ".././constants";

const RadioButton = props => {
  let {size, active, onPress, style, disabled} = props;
  return (
    <TouchableOpacity
      style={[
        {
          height: size,
          width: size * 2,
          borderRadius: size / 2,
          alignItems: active ? "flex-end" : "flex-start",
        },
        styles.container,
        style ? style : {},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <View
        style={[
          {
            height: size * 0.8,
            width: size * 0.8,
            borderRadius: (size * 0.8) / 2,
            backgroundColor: active ? "#328FCA" : "#9C9C9C",
          },
          styles.innerView,
        ]}></View>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(5),
    backgroundColor: Constants.colors.LightGray,

    justifyContent: "center",
  },
  innerView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
