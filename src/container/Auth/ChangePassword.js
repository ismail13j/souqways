import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import Input from "../../components/TextInput";
import {
  headerColor,
  primaryColor,
  subHeadingColor,
  whiteColor,
} from "../../constants/colors";
import {Actions} from "react-native-router-flux";
import {CommonToast} from "../../components/CommonToast";
import {connect} from "react-redux";
import Constants from "../../constants";
import Icon from "react-native-vector-icons/AntDesign";
import {_changePasswordAction} from "../../actions/authAction/ChangePasswordAction";
import {strings} from "../../constants/i18n";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      showNewPassword: true,
      showOldPassword: true,
      showConfirmPassword: true,
    };
    this.oldPassForm = React.createRef();
    this.passwordForm = React.createRef();
    this.ConPassForm = React.createRef();
  }

  _onPressForgotPassword = () => {
    Actions.forgotPassword();
  };
  onPressBack() {
    Actions.pop();
  }

  _onPressCancel = () => {
    Actions.pop();
  };

  _onPressToggleOldPassword = () => {
    this.setState({showOldPassword: !this.state.showOldPassword});
  };

  _onPressToggleNewPassword = () => {
    this.setState({showNewPassword: !this.state.showNewPassword});
  };

  _onPressToggleConfirmPassword = () => {
    this.setState({showConfirmPassword: !this.state.showConfirmPassword});
  };

  _onPressResetMyPassword = () => {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    if (oldPassword == "" || newPassword == "" || confirmPassword == "") {
      CommonToast(strings.commonText.emptyFields, false);
    } else if (
      (oldPassword && oldPassword.trim() == "") ||
      (newPassword && newPassword.trim() == "") ||
      (confirmPassword && confirmPassword.trim() == "")
    ) {
      CommonToast(strings.commonText.EnterValidInput, false);
    } else if (
      newPassword &&
      newPassword.trim() &&
      newPassword.trim().length < 6
    ) {
      CommonToast(strings.commonText.validationPass, false);
    } else if (newPassword != confirmPassword) {
      CommonToast(strings.commonText.passwordNotMatch, false);
    } else {
      let data = new FormData();

      data.append("current_pass", oldPassword);
      data.append("new_password", newPassword);

      data.append("user_id", this.props.userID);
      this.props._changePasswordAction(data, this._emptyForm);
    }
  };

  /********
   * Method to empty form after success
   */
  _emptyForm = () => {
    this.oldPassForm.current.clear();
    this.passwordForm.current.clear();
    this.ConPassForm.current.clear();
    this.setState({oldPassword: "", newPassword: "", confirmPassword: ""});
  };

  focus = key => {
    this[key].focus();
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: Constants.colors.Primary,
        }}>
        <View
          style={{
            backgroundColor: Constants.colors.Primary,

            height: moderateScale(50),
            alignItems: "center",
            padding: moderateScale(10),
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            style={styles.buttonConStyle}
            onPress={() => {
              Actions.pop();
            }}>
            <Icon name="arrowleft" size={25} color={Constants.colors.White} />
          </TouchableOpacity>
          <Text style={styles.textStyle}>{strings.change_password}</Text>

          <TouchableOpacity style={styles.innerButton}>
            <Image source={null} style={styles.imgStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonLine}></View>
        <View style={styles.container}>
          <Text style={styles.textStyle}></Text>
          <View style={styles.paddingContainer}>
            <View style={{paddingTop: moderateScale(20)}}>
              <Text style={styles.formlabel}>{strings.old_password}</Text>
              <View style={styles.passwordTextView}>
                <Input
                  placeholder={strings.enter_old_password}
                  placeholderColor={"#FFF"}
                  secure={this.state.showOldPassword}
                  formInput={styles.textInputStyle}
                  onChangeText={oldPassword => {
                    this.setState({oldPassword});
                  }}
                  returnKeyType={"next"}
                  ref={ref => (this.oldPass = ref)}
                  onSubmitEditing={() => {
                    this.focus("newPass");
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this._onPressToggleOldPassword();
                  }}>
                  <Image
                    source={
                      this.state.showOldPassword
                        ? require("../../assets/Icons/eye.png")
                        : require("../../assets/Icons/eyes_visible.png")
                    }
                    style={styles.imgContainer}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{paddingTop: moderateScale(20)}}>
              <Text style={styles.formlabel}>{strings.new_password}</Text>
              <View style={styles.passwordTextView}>
                <Input
                  placeholder={strings.enter_new_password}
                  placeholderColor={"#FFF"}
                  secure={this.state.showNewPassword}
                  formInput={styles.textInputStyle}
                  onChangeText={newPassword => {
                    this.setState({newPassword});
                  }}
                  returnKeyType={"next"}
                  ref={ref => (this.newPass = ref)}
                  onSubmitEditing={() => {
                    this.focus("confirmPass");
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this._onPressToggleNewPassword();
                  }}>
                  <Image
                    source={
                      this.state.showNewPassword
                        ? require("../../assets/Icons/eye.png")
                        : require("../../assets/Icons/eyes_visible.png")
                    }
                    style={styles.imgContainer}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{paddingTop: moderateScale(20)}}>
              <Text style={styles.formlabel}>{strings.confirm_password}</Text>
              <View style={styles.passwordTextView}>
                <Input
                  placeholder={strings.enter_confirm_password}
                  placeholderColor={"#FFF"}
                  secure={this.state.showConfirmPassword}
                  formInput={styles.textInputStyle}
                  ref={ref => (this.confirmPass = ref)}
                  onChangeText={confirmPassword => {
                    this.setState({confirmPassword});
                  }}
                  onSubmitEditing={this._onPressToggleConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => {
                    this._onPressToggleConfirmPassword();
                  }}>
                  <Image
                    source={
                      this.state.showConfirmPassword
                        ? require("../../assets/Icons/eye.png")
                        : require("../../assets/Icons/eyes_visible.png")
                    }
                    style={styles.imgContainer}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this._onPressResetMyPassword}>
                {this.props.loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginText}>
                    {strings.change_password}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.emptyview} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.changePasswordReducer.loading,
    userID: state.loginReducer.loginData.data.ID,
  };
};

const mapDispatchToProps = dispatch => ({
  _changePasswordAction: (data, _emptyForm) =>
    dispatch(_changePasswordAction(data, _emptyForm)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const styles = StyleSheet.create({
  imageView: {
    height: moderateScale(160),
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeHeader: {fontSize: moderateScale(28), color: headerColor},
  subHeading: {
    fontSize: moderateScale(14),
    color: subHeadingColor,
    lineHeight: moderateScale(25),
  },
  textInputStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    flex: 1,
    height: moderateScale(45),
    color: "#fff",

    textAlignVertical: "center",
  },
  textStyle: {
    fontSize: moderateScale(22),
    color: Constants.colors.White,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  formlabel: {
    fontSize: moderateScale(16),
    color: Constants.colors.White,
    fontFamily: "Roboto-Regular",
  },
  titleText: {fontSize: moderateScale(20), fontWeight: "bold", color: "white"},
  rowStyle: {
    height: moderateScale(50),
    backgroundColor: primaryColor,
    padding: moderateScale(10),
    flexDirection: "row",
  },
  buttonView: {height: moderateScale(100), justifyContent: "flex-end"},
  signUpView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: moderateScale(40),
  },
  passwordTextView: {
    borderBottomWidth: 1,
    borderBottomColor: subHeadingColor,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  emailTextView: {
    borderBottomWidth: 1,
    borderBottomColor: subHeadingColor,
    paddingTop: moderateScale(10),
  },
  forgotPasswordText: {
    fontSize: moderateScale(14),
    color: primaryColor,
    textAlign: "right",
    lineHeight: moderateScale(40),
  },
  signUpText: {fontSize: moderateScale(14), color: primaryColor},
  buttonStyle: {
    backgroundColor: primaryColor,
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(30),
  },
  container: {
    flex: 1,
    backgroundColor: Constants.colors.Primary,
  },
  loginText: {
    color: whiteColor,
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  emptyview: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: moderateScale(55),
  },
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constants.colors.Primary,
  },
  buttonContainer: {
    backgroundColor: Constants.colors.Primary,
    height: moderateScale(50),
    alignItems: "center",
    padding: moderateScale(10),
    marginTop: Platform.OS === "ios" ? moderateScale(20) : 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonConStyle: {
    width: moderateScale(50),
    flexDirection: "row",
    alignItems: "flex-start",
  },
  innerButton: {
    width: moderateScale(50),
    flexDirection: "row",
    alignItems: "flex-start",
  },
  buttonLine: {
    flexDirection: "row",
    height: moderateScale(0.3),
    backgroundColor: Constants.colors.White,
  },
  paddingContainer: {
    paddingHorizontal: moderateScale(15),
  },
  paddingCommon: {
    paddingTop: moderateScale(20),
  },
  imgStyle: {
    resizeMode: "contain",
  },
  imgContainer: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: "contain",
  },
});
