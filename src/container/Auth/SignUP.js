import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import Input from "../../components/TextInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {_signUpAction} from "../../actions/authAction/SignUpAction";
import {CommonToast} from "../../components/CommonToast";
import {connect} from "react-redux";
import Constants from "../../constants";
import {strings} from "../../constants/i18n";
import {
  primaryColor,
  subHeadingColor,
  whiteColor,
} from "../../constants/colors";
import Regex from "../../helper/Regex";
import {Actions} from "react-native-router-flux";
class SignUP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      showPassword: true,
    };
    this.usernameForm = React.createRef();
    this.emailForm = React.createRef();
    this.passwordForm = React.createRef();
  }
  _onSignUpSubmit = () => {
    let {userName, email, password} = this.state;
    if (userName.trim() == "")
      return CommonToast(strings.commonText.usernameReq, false);
    if (email == "") return CommonToast(strings.commonText.emailReq, false);
    if (!Regex.email.test(email))
      return CommonToast(strings.commonText.validEmail, false);
    if (password == "") {
      return CommonToast(strings.commonText.passsReq, false);
    }
    if (password && password.trim() && password.trim().length < 6) {
      return CommonToast(strings.commonText.validationPass, false);
    }
    let data = {
      user_name: userName,
      user_email: email,
      contact_number: "0",
      user_password: password,
    };
    this.props._signUpAction(data);
  };

  _onPressTogglePassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };

  _onPressCancel = () => {
    Actions.pop();
  };
  _onPressSignin = () => {
    Actions.pop();
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
          <View style={styles.containerStyle}>
            <Image
              source={require("../../assets/icon/Logo-Souqways.png")}
              style={styles.imgCont}
            />
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                Actions.pop();
              }}>
              <Image
                source={require("../../assets/icon/right-arrow.png")}
                style={styles.imgback}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleView}>
          <View>
            <Text style={styles.welcomeHeader}>{strings.Hello}</Text>
            <Text style={styles.subHeading}>{strings.sing_up}</Text>
          </View>
          <View style={styles.textInputContainer}>
            <View style={styles.InputContainer}>
              <Input
                placeholder={strings.user_name}
                text={this.state.userName}
                onChangeText={userName => {
                  this.setState({userName});
                }}
                formInput={styles.textInputStyle}
                returnKeyType={"next"}
                ref={ref => (this.username = ref)}
                onSubmitEditing={() => {
                  this.focus("email");
                }}
              />
            </View>
            <View style={styles.imgContainer}>
              <Image
                source={require("../../assets/icon/man-user.png")}
                style={styles.imageStyle}
              />
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <View style={styles.InputContainer}>
              <Input
                placeholder={strings.email_address}
                keyboardType={"email-address"}
                text={this.state.email}
                formInput={styles.textInputStyle}
                onChangeText={email => {
                  this.setState({email});
                }}
                returnKeyType={"next"}
                ref={ref => (this.email = ref)}
                onSubmitEditing={() => {
                  this.focus("password");
                }}
              />
            </View>

            <View style={styles.ImgStyles}>
              <Image
                source={require("../../assets/icon/close-envelope.png")}
                style={styles.imgCheck}
              />
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <View style={styles.InputContainer}>
              <Input
                ref={ref => (this.password = ref)}
                placeholder={strings.password}
                secure={this.state.showPassword}
                formInput={styles.textInputStyle}
                text={this.state.password}
                onChangeText={password => {
                  this.setState({password});
                }}
                onSubmitEditing={this._onSignUpSubmit}
              />
            </View>

            <View style={styles.buttonCont}>
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
                  style={styles.imgMain}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                this._onSignUpSubmit();
              }}>
              {this.props.loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{strings.sing_up}</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.imageBackground}></View>

          <TouchableOpacity
            style={[styles.textInputContainer, styles.subStyle]}
            onPress={() => {
              this._onPressSignin();
            }}>
            <Text style={styles.welcomeHeader}>{strings.have_account}</Text>
            <Text style={[styles.welcomeHeader, styles.subView]}>
              {strings.sign_in}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.signUpReducer.loading,
  };
};
const mapDispatchToProps = dispatch => ({
  _signUpAction: data => dispatch(_signUpAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUP);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constants.colors.Primary,
  },
  headerView: {
    flex: 0.25,
    backgroundColor: Constants.colors.Primary,
  },
  middleView: {
    backgroundColor: Constants.colors.White,
    borderTopRightRadius: moderateScale(40),
    padding: moderateScale(10),
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
  imageView: {
    height: moderateScale(160),
    justifyContent: "center",
    alignItems: "center",
  },
  emptyview: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: moderateScale(30),
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
    justifyContent: "center",
    marginTop: moderateScale(20),
    marginBottom: moderateScale(40),
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
  containerStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: moderateScale(90),
  },
  imgCont: {
    height: moderateScale(90),
    width: moderateScale(90),
    alignSelf: "center",
    resizeMode: "contain",
  },
  innerContainer: {
    flex: 1,
    position: "absolute",
  },
  backButton: {
    alignSelf: "flex-start",
    padding: moderateScale(18),
    marginTop: moderateScale(10),
  },
  imgback: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: "contain",
  },
  InputContainer: {
    flex: 0.8,
  },
  imgContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  ImgStyles: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCont: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  imgMain: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: "contain",
  },
  imageStyle: {
    alignSelf: "center",
    resizeMode: "contain",
  },
  subStyle: {
    borderColor: Constants.colors.White,
    marginTop: moderateScale(30),
    justifyContent: "center",
  },
  imgCheck: {
    alignSelf: "center",
    resizeMode: "contain",
  },
  imageBackground: {
    backgroundColor: Constants.colors.DarkGray,
    height: moderateScale(0.5),
  },
  subView: {
    color: Constants.colors.Primary,
    marginLeft: moderateScale(2),
    textDecorationLine: "underline",
  },
});
