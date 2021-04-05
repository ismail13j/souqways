import React from "react";
import {View, Text, Dimensions, ViewPropTypes} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import PropTypes from "prop-types";
import constants from "../../constants";
const ListEmptyComponent = props => {
  if (props.loading) {
    return null;
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        size: "large",
        alignSelf: "center",
        height:constants.BaseStyle.DEVICE_HEIGHT*0.75,
        width:constants.BaseStyle.DEVICE_WIDTH,
        ...props.style,
      }}>
      <Text
        style={{
          alignSelf: "center",
          fontSize: moderateScale(20),
          color: "#999",
        }}>
        {props.message}
      </Text>
    </View>
  );
};

ListEmptyComponent.propTypes = {
  style: ViewPropTypes.style,
  message: PropTypes.string,
  loading: PropTypes.bool,
};

ListEmptyComponent.defaultProps = {
  style: {},
  message: "",
  loading: false,
};

export default ListEmptyComponent;
