import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native";
import {strings} from "../../constants/i18n";
import {moderateScale} from "../../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import Constants from "../../constants";
import RightArrow from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import Header from "../../components/common/Header";
class Setting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={strings.app_setting}
          safeViewStyle={{backgroundColor: Constants.colors.Primary}}
          headerContainerStyle={{backgroundColor: Constants.colors.Primary}}
          textStyle={{color: "#ffffff"}}
          iconColor="#ffffff"
        />
        <TouchableOpacity
          style={{...styles.linkContainer}}
          onPress={() => {
            Actions.changePassword();
          }}>
          <View style={styles.linkView}>
            <View
              style={{
                flex: 0.2,
              }}></View>

            <View
              style={{
                flex: 0.6,
                justifyContent: "flex-start",
              }}>
              <Text style={{...styles.textStyle, fontSize: moderateScale(16)}}>
                {strings.change_password}
              </Text>
            </View>

            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <RightArrow
                name="ios-arrow-forward"
                size={25}
                color={Constants.colors.White}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(0.5),
            backgroundColor: Constants.colors.White,
          }}></View>

        {/* <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => {
            alert("Under Development");
          }}>
          <View style={styles.linkView}>
            <View
              style={{
                flex: 0.2,
              }}></View>

            <View
              style={{
                flex: 0.6,
                justifyContent: "flex-start",
              }}>
              <Text style={{...styles.textStyle, fontSize: moderateScale(16)}}>
                {strings.notification_setting}
              </Text>
            </View>

            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <RightArrow
                name="ios-arrow-forward"
                size={25}
                color={Constants.colors.White}
              />
            </View>
          </View>
        </TouchableOpacity> */}
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(0.5),
            backgroundColor: Constants.colors.White,
          }}></View>
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => {
            Actions.savedAddress({disablePress: true});
          }}>
          <View style={styles.linkView}>
            <View
              style={{
                flex: 0.2,
              }}></View>

            <View
              style={{
                flex: 0.6,
                justifyContent: "flex-start",
              }}>
              <Text style={{...styles.textStyle, fontSize: moderateScale(16)}}>
                {strings.addresses}
              </Text>
            </View>

            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <RightArrow
                name="ios-arrow-forward"
                size={25}
                color={Constants.colors.White}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(0.5),
            backgroundColor: Constants.colors.White,
          }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.colors.Primary,
  },
  slideBackground: {
    backgroundColor: "white",
    height: moderateScale(250),
  },
  linkView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  headingText: {
    fontSize: moderateScale(22),
    alignSelf: "flex-start",
    color: Constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },

  linkContainer: {
    height: moderateScale(60),
    alignContent: "center",
  },
  textStyle: {
    fontSize: moderateScale(20),
    color: Constants.colors.White,
    fontFamily: "Poppins-Regular",
  },

  textInputStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    flex: 1,
    marginLeft: moderateScale(10),
    textAlignVertical: "center",
    paddingLeft: moderateScale(15),
  },

  textInputContainer: {
    flexDirection: "row",
    height: moderateScale(46),
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
    borderColor: Constants.colors.border_color,
    borderRadius: moderateScale(23),
    borderWidth: moderateScale(2),
    marginTop: moderateScale(10),
  },
  viewer_container: {
    flex: 0.45,
    backgroundColor: "white",
    marginTop: moderateScale(5),
  },

  detail_container: {
    flex: 0.2,
    padding: moderateScale(12),
  },

  cart_container: {
    flex: 0.35,
    padding: moderateScale(12),
  },

  buttonView: {
    alignContent: "center",
    marginTop: Platform.OS === "ios" ? moderateScale(10) : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Constants.colors.Primary,
    height: moderateScale(45),
    width: moderateScale(145),
    marginTop: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    color: Constants.colors.White,
    borderRadius: moderateScale(30),
  },
  swiperViewStyle: {
    height: moderateScale(250),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  buttonText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Medium",
    color: Constants.colors.White,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.getCartListReducer.loading,
    wishloading: state.getWishListReducer.loading,
    userID: state.loginReducer.loginData.data.ID,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
