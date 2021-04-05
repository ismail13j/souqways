import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ViewPropTypes,
} from "react-native";

import {moderateScale} from "../../helper/responsiveFont";
import Icon from "react-native-vector-icons/AntDesign";
import Ico from "react-native-vector-icons/Entypo";
import constants from "../../constants";
import {Actions} from "react-native-router-flux";
import PropTypes from "prop-types";
import SlideMenu from "../../container/Dashboard/SlideMenu";

const Header = props => {
  const [visible, updateVisible] = useState(false);
  return (
    <SafeAreaView style={[{backgroundColor: "white"}, props.safeViewStyle]}>
      <View style={[styles.headerContainer, props.headerContainerStyle]}>
        {props.drawerEnabled ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              updateVisible(true);
            }}>
            <Ico
              name="menu"
              size={25}
              color={props.menuColor || constants.colors.Primary}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              props.onBackPress ? props.onBackPress() : Actions.pop()
            }>
            <Icon
              name="arrowleft"
              size={25}
              color={props.iconColor || constants.colors.Primary}
            />
          </TouchableOpacity>
        )}
        <Text style={[styles.textStyle, props.textStyle]}>{props.title}</Text>
        {props.RightComponent ? (
          <TouchableOpacity style={{...styles.backButton}}>
            {props.RightComponent}
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}
      </View>
      <SlideMenu visible={visible} onClose={updateVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    height: moderateScale(50),
    alignItems: "center",
    padding: moderateScale(10),
    // marginTop: Platform.OS === "ios" ? moderateScale(35) : moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: constants.colors.lightGrey,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textStyle: {
    fontSize: moderateScale(20),
    color: constants.colors.Primary,
    fontFamily: "Poppins-Regular",
  },
});

Header.propTypes = {
  safeViewStyle: ViewPropTypes.style,
  headerContainerStyle: ViewPropTypes.style,
  drawerEnabled: PropTypes.bool,
  menuColor: PropTypes.string,
  title: PropTypes.string,
  RightComponent: React.Component,
};

export default Header;
