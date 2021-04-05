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
import {connect} from "react-redux";
import {CommonToast} from "../../components/CommonToast";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {
  primaryColor,
  subHeadingColor,
  whiteColor,
} from "../../constants/colors";
import Constants from "../../constants";
import {strings} from "../../constants/i18n";
import {Actions} from "react-native-router-flux";
import {_forgotPasswordaction} from "../../actions/authAction/ForgotPasswordAction";
let {Regex} = Constants;
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
    };
  }
  _onPressForgotPassword = () => {
    Actions.forgotPassword();
  };

  _onPressCancel = () => {
    Actions.pop();
  };

  _onPressResetMyPassword = () => {
    let {email} = this.state;
    if (email == "") {
      CommonToast(strings.commonText.emailReq, false);
    } else if (!Regex.EMAIL_PATTERN.test(email)) {
      CommonToast(strings.commonText.validEmail, false);
    } else {
      let data = {
        user_email: email,
      };

      this.props._forgotPasswordAction(data);
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.mainContainer}>
        <View style={styles.headerView}>
          <View style={styles.containerHead}>
            <Image
              source={require("../../assets/icon/Logo-Souqways.png")}
              style={styles.imgHeader}
            />
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.buttonStyleCont}
              onPress={() => {
                Actions.pop();
              }}>
              <Image
                source={require("../../assets/icon/right-arrow.png")}
                style={styles.innerImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleView}>
          <View>
            <Text style={styles.subHeading}>{strings.for_got}</Text>
            <Text style={styles.subHeading}>{strings.pwd}</Text>
          </View>
          <Text style={styles.welcomeHeader}>{strings.forgot_pwd_heading}</Text>

          <View style={styles.textInputContainer}>
            <View style={styles.innerInput}>
              <Input
                placeholder={strings.email_address}
                keyboardType={"email-address"}
                text={this.state.email}
                formInput={styles.textInputStyle}
                onChangeText={email => {
                  this.setState({email});
                }}
                onSubmitEditing={this._onPressResetMyPassword}
              />
            </View>

            <View style={styles.imgContainer}>
              <Image
                source={require("../../assets/icon/close-envelope.png")}
                style={styles.imgStyle}
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this._onPressResetMyPassword}>
              {this.props.loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{strings.send}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
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
    marginTop: moderateScale(40),
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
    color: Constants.colors.Black,
    fontFamily: "Roboto-Regular",
    fontSize: moderateScale(15),
  },
  subHeading: {
    fontSize: moderateScale(26),
    color: Constants.colors.Black,
    fontFamily: "Poppins-SemiBold",
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
    marginTop: moderateScale(30),
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
  containerHead: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: moderateScale(90),
  },
  imgHeader: {
    height: moderateScale(90),
    width: moderateScale(90),
    alignSelf: "center",
    resizeMode: "contain",
  },
  innerContainer: {
    flex: 1,
    position: "absolute",
  },
  buttonStyleCont: {
    alignSelf: "flex-start",
    padding: moderateScale(18),
    marginTop: moderateScale(10),
  },
  innerImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: "contain",
  },
  innerInput: {
    flex: 0.8,
  },
  imgContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    alignSelf: "center",
    resizeMode: "contain",
  },
});

const mapStateToProps = state => {
  return {
    loading: state.forgotPasswordReducer.loading,
  };
};
const mapDispatchToProps = dispatch => ({
  _forgotPasswordAction: data => dispatch(_forgotPasswordaction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
