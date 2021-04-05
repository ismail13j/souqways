import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";

import {moderateScale} from ".././helper/responsiveFont";
import Constants from ".././constants";
import PropTypes from "prop-types";

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
  activeIcon: PropTypes.number || PropTypes.string,
  inActiveIcon: PropTypes.number || PropTypes.string,
};

const defaultProps = {
  focused: false,
  title: "",
  activeIcon: null,
  inActiveIcon: null,
};

const Tab = ({
  renderIcon,
  activeIcon: ActiveIcon,
  inActiveIcon: InActiveIcon,
  focused,
  title,
}) => {
  return (
    <View style={styles.viewStyle}>
      {renderIcon ? (
        focused ? (
          <ActiveIcon />
        ) : (
          <InActiveIcon />
        )
      ) : (
        <Image
          style={styles.imageStyle}
          source={focused ? ActiveIcon : InActiveIcon}
        />
      )}
      <Text
        style={{
          ...styles.textStyle,
          color: focused ? Constants.colors.Primary : Constants.colors.Black,
        }}>
        {title}
      </Text>
    </View>
  );
};

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

const styles = StyleSheet.create({
  viewStyle: {
    width: "100%",
    height: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
    paddingTop: moderateScale(8),
  },
  imageStyle: {
    alignItems: "center",
  },

  textStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(14),
    textAlign: "left",
  },
});

export default Tab;
