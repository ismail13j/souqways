import React from "react";
import {View, StyleSheet, ActivityIndicator, ViewPropTypes} from "react-native";
import constants from "../../constants";
const Loader = props => {
  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator size="large" color={constants.colors.Primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
Loader.propTypes = {
  style: ViewPropTypes.style,
};

Loader.defaultProps = {
  style: {},
};

export default Loader;
