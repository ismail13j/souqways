import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import Input from "../../components/TextInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {primaryColor, subHeadingColor, whiteColor} from "../../constants/color";
import Constants from "../../constants";
import ToggleSwitch from "toggle-switch-react-native";
import {Actions} from "react-native-router-flux";
import {
  _loginAction,
  googleSignIn,
  twitterLogin,
  facebookLogin,
} from "../../actions/authAction/LoginActions";
import {CommonToast} from "../../components/CommonToast";
import {connect} from "react-redux";
import {strings} from "../../constants/i18n";
class Login extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle("light-content");
    this.state = {
      email: props.isRemind ? props.userInfo.username : "",
      password: props.isRemind ? this.props.userInfo.password : "",
      isRemind: props.isRemind,
      showPassword: true,
    };
    this.emailForm = React.createRef();
    this.passwordForm = React.createRef();
  }

  _onPressForgotPassword() {
    Actions.forgotPassword();
  }
  _onPressLogin = () => {
    let {email, isRemind, password} = this.state;
    if (email == "" || (email && !email.trim()))
      CommonToast(strings.valid_user_name, false);
    else if (password == "" || (password && !password.trim()))
      CommonToast(strings.valid_password, false);
    else {
      let data = {
        username: email,
        password: password,
      };

      this.props._loginAction(data, isRemind);
    }
  };

  _onRemindPressed = () => {
    this.setState({isRemind: !this.state.isRemind});
  };

  _onPressSignUp = () => {
    Actions.signup();
  };

  _onPressTogglePassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };

  focus = key => {
    this[key].focus();
  };

  render() {
    return (
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.mainContainer}>
        <View style={styles.headerView}>
          <View style={styles.contentCenter}>
            <Image
              source={require("../../assets/icon/Logo-Souqways.png")}
              style={styles.imgResize}
            />
          </View>
        </View>
        <View style={styles.middleView}>
          <View>
            <Text style={styles.welcomeHeader}>{strings.welcome_back}</Text>
            <Text style={styles.subHeading}>{strings.sign_in}</Text>
          </View>

          <View style={styles.textInputContainer}>
            <View style={styles.flexEight}>
              <Input
                placeholder={strings.user_name}
                text={this.state.email}
                formInput={styles.textInputStyle}
                onChangeText={email => {
                  this.setState({email});
                }}
                autoCapitalize={"none"}
                returnKeyType={"next"}
                ref={ref => (this.email = ref)}
                onSubmitEditing={() => {
                  this.focus("password");
                }}
              />
            </View>

            <View style={styles.centerPadding}>
              <Image
                source={require("../../assets/icon/man-user.png")}
                style={styles.centerAlign}
              />
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <View style={styles.flexEight}>
              <Input
                placeholder={strings.password}
                secure={this.state.showPassword}
                text={this.state.password}
                formInput={styles.textInputStyle}
                onChangeText={password => {
                  this.setState({password});
                }}
                ref={ref => (this.password = ref)}
                onSubmitEditing={this._onPressLogin}
              />
            </View>

            <View style={styles.centerPadding}>
              <TouchableOpacity
                onPress={() => {
                  this._onPressTogglePassword();
                }}>
                <Image
                  source={
                    this.state.showPassword
                      ? require("../../assets/Icons/eye.png")
                      : require("../../assets/Icons/eyes_visible.png")
                  }
                  style={styles.imgResize}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.textInputContainer, styles.colorWhite]}>
            <View style={styles.flexColor}>
              <ToggleSwitch
                isOn={this.state.isRemind}
                onColor={Constants.colors.Primary}
                offColor={Constants.colors.DarkGray}
                label={strings.rember_me}
                labelStyle={{...styles.textInputStyle, ...styles.paddingCheck}}
                size="small"
                onToggle={isRemind => this.setState({isRemind})}
              />
            </View>
            <TouchableOpacity
              style={styles.flexStartCheck}
              onPress={() => {
                this._onPressForgotPassword();
              }}>
              <Text style={[styles.textInputStyle, styles.paddingMarg]}>
                {strings.forgot_password}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                // if (!this.props.loading) {
                this._onPressLogin();
                //Actions.dashboard();

                // }
              }}>
              {this.props.loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{strings.sign_in_label}</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.viewContain}></View>
          <View style={[styles.textInputContainer, styles.containWhite]}>
            <TouchableOpacity onPress={() => this.props.facebookLogin()}>
              <Image
                source={require("../../assets/icon/facebook-logo-button.png")}
                style={styles.imgResize}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.twitterLogin()}>
              <Image
                source={require("../../assets/icon/twitter-logo-button.png")}
                style={styles.imgMargin}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.textInputContainer, styles.containWhite]}
            onPress={() => {
              this._onPressSignUp();
            }}>
            <Text style={styles.welcomeHeader}>
              {strings.dont_have_account}
            </Text>
            <Text style={[styles.welcomeHeader, styles.marginCheck]}>
              {strings.sign_up_now}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loginReducer.loading,
    isRemind: state.loginReducer.isRemind,
    userInfo: state.loginReducer.userInfo,
  };
};
const mapDispatchToProps = {
  _loginAction,
  googleSignIn,
  facebookLogin,
  twitterLogin,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constants.colors.Primary,
  },
  headerView: {
    flex: 0.25,
    justifyContent: "center",
    backgroundColor: Constants.colors.Primary,
    alignItems: "center",
  },
  middleView: {
    backgroundColor: Constants.colors.White,
    borderTopRightRadius: moderateScale(40),
    padding: moderateScale(5),
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
    color: Constants.colors.Black,
    fontFamily: "Roboto-Regular",
  },

  subHeading: {
    fontSize: moderateScale(32),
    color: Constants.colors.Black,
    fontFamily: "Poppins-SemiBold",
    marginBottom: moderateScale(25),
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
    color: Constants.colors.White,
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
    justifyContent: "center",
    alignItems: "center",
    color: Constants.colors.White,
    borderRadius: moderateScale(30),
  },

  loginText: {
    color: whiteColor,
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  imgResize: {
    resizeMode: "contain",
  },
  centerPadding: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  flexEight: {
    flex: 0.8,
  },
  centerAlign: {
    alignSelf: "center",
  },
  colorWhite: {
    borderColor: "white",
  },
  viewContain: {
    backgroundColor: Constants.colors.DarkGray,
    height: moderateScale(0.5),
    marginTop: Platform.OS === "ios" ? moderateScale(15) : moderateScale(10),
  },
  containWhite: {
    borderColor: Constants.colors.White,
    justifyContent: "center",
  },
  imgMargin: {
    marginLeft: moderateScale(10),
    resizeMode: "contain",
  },
  marginCheck: {
    color: Constants.colors.Primary,
    marginLeft: moderateScale(2),
    textDecorationLine: "underline",
  },
  flexColor: {
    flex: 0.54,
    height: moderateScale(20),
  },
  paddingCheck: {
    paddingLeft: moderateScale(0),
  },
  flexStartCheck: {
    flex: 0.46,
    height: moderateScale(20),
    alignContent: "flex-start",
    // textAlign: "flex-start",
  },
  paddingMarg: {
    paddingLeft: moderateScale(0),
    textAlign: "right",
  },
});
