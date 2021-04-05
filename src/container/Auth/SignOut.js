import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import {_logout} from "../../actions/authAction/LogoutActions";

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {primaryColor, subHeadingColor, whiteColor} from "../../constants/color";
import Constants from "../../constants";
import {connect} from "react-redux";
import {strings} from "../../constants/i18n";
import {Actions} from "react-native-router-flux";

class SignOut extends Component {
  constructor(props) {
    super(props);
  }

  onPressCancel() {
    // this.props.closeModal();
    Actions.pop();
  }
  _onPressLogout = () => {
    this.props._logout();
  };

  render() {
    return (
      // <Modal
      //   animationType="slide"
      //   style={{
      //     flex: 1,
      //     margin: 0,
      //   }}
      //   visible={this.props.dialogVisible}>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContainer}>
        <View style={styles.headerView}>
          <View
            style={{
              width: moderateScale(130),
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image
              source={require("../../assets/icon/Logo-Souqways.png")}
              style={{
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
        <View style={styles.middleView}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image
              source={require("../../assets/icon/bg_logout.png")}
              style={{
                resizeMode: "contain",
              }}
            />
          </View>

          <View>
            <Text style={styles.subHeading}>{strings.sign_out}</Text>
            <Text style={styles.welcomeHeader}>{strings.about_signout}</Text>

            {/* <Text style={styles.welcomeHeader}>{strings.sign_out}</Text> */}

            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  // if (!this.props.loading) {
                  this._onPressLogout();
                  //Actions.dashboard();

                  // }
                }}>
                <Text style={styles.buttonText}>{strings.sign_out}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
              <TouchableOpacity
                style={{
                  ...styles.buttonStyle,
                  backgroundColor: Constants.colors.Primary,
                  borderColor: Constants.colors.White,
                  borderWidth: moderateScale(1),
                }}
                onPress={() => {
                  this.onPressCancel();
                }}>
                <Text
                  style={{
                    ...styles.buttonText,
                    color: Constants.colors.White,
                  }}>
                  {strings.cancel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      // </Modal>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => ({
  _logout: () => dispatch(_logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignOut);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constants.colors.Primary,
  },
  headerView: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  middleView: {
    backgroundColor: Constants.colors.Primary,
    borderTopRightRadius: moderateScale(40),
    padding: moderateScale(5),
    alignItems: "center",
    borderBottomLeftRadius: moderateScale(30),
    flex: 0.75,
  },
  textInputContainer: {
    flexDirection: "row",
    height: moderateScale(46),
    marginTop: moderateScale(10),
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    borderColor: Constants.colors.border_color,
    borderRadius: moderateScale(23),
    borderWidth: moderateScale(2),
  },
  textInputStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    flex: 1,
    marginLeft: moderateScale(10),
    textAlignVertical: "center",
    paddingLeft: moderateScale(15),
  },
  welcomeHeader: {
    fontSize: moderateScale(17),
    color: Constants.colors.White,
    alignSelf: "center",
    fontFamily: "Poppins-Light",
  },

  subHeading: {
    fontSize: moderateScale(32),
    alignSelf: "center",
    marginTop: moderateScale(20),
    color: Constants.colors.White,
    fontFamily: "Poppins-Regular",
  },
  bottom_container: {
    height: moderateScale(160),
    justifyContent: "center",
    alignItems: "center",
  },
  passwordTextView: {
    borderBottomWidth: 1,
    borderBottomColor: subHeadingColor,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: moderateScale(14),
    color: primaryColor,
    textAlign: "right",
    lineHeight: moderateScale(40),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Medium",
    color: Constants.colors.Primary,
  },
  buttonView: {
    marginTop: Platform.OS === "ios" ? moderateScale(20) : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Constants.colors.White,
    height: moderateScale(45),
    width: moderateScale(145),
    justifyContent: "center",
    alignItems: "center",
    color: Constants.colors.White,
    borderRadius: moderateScale(30),
    ...Platform.select({
      android: {
        marginTop: moderateScale(20),
      },
    }),
  },

  loginText: {
    color: whiteColor,
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
});
