import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import {strings} from "../../constants/i18n";
import Input from "../../components/TextInput";
import ImagePicker from "react-native-image-crop-picker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import ActionSheet from "react-native-actionsheet";

import {moderateScale} from "../../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import {editProfile} from "../../actions/authAction/EditProfileAction";
import moment from "moment";
import Constants from "../.././constants";
import {CommonToast} from "../../components/CommonToast";
import {connect} from "react-redux";
import Header from "../../components/common/Header";
class EditProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImageUri:
        (props.profileResponse &&
          props.profileResponse.avatar &&
          props.profileResponse.avatar.url) ||
        "http://2.gravatar.com/avatar/876cc1cf5a8d145b306b7dd6dcdad62d?s=96&d=mm&r=g",
      first_name:
        (props.profileResponse && props.profileResponse.first_name) || "",
      last_name:
        (props.profileResponse && props.profileResponse.last_name) || "",
      email: (props.profileResponse && props.profileResponse.user_email) || "",
      phone: (props.profileResponse && props.profileResponse.contact) || "",
      address: (props.profileResponse && props.profileResponse.address) || "",
      city: (props.profileResponse && props.profileResponse.city) || "",
      area: (props.profileResponse && props.profileResponse.country) || "",
      building_name:
        (props.profileResponse && props.profileResponse.building_name) || "",
      // zipCode: (props.profileResponse && props.profileResponse.zipcode) || "",
      apartment_name:
        (props.profileResponse && props.profileResponse.building_name) || "",
    };
  }

  _onPressLogin = () => {
    let {
      first_name,
      last_name,
      phone,
      city,
      area,
      building_name,
      apartment_name,
      selectedImageUri,
    } = this.state;

    if (first_name == "") return CommonToast(strings.errors.firstName, false);
    if (last_name == "") return CommonToast(strings.errors.lastName, false);
    // if (!Regex.email.test(email))
    //   return CommonToast(strings.errors.inValidEmail);
    if (phone == "") return CommonToast(strings.errors.phone, false);

    let data = new FormData();
    data.append(
      "user_id",
      this.props.profileResponse && this.props.profileResponse.ID,
    );
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("contact", phone);
    data.append("avatar", {
      type: "image/jpeg",
      // name: selectedImageUri,
      uri: selectedImageUri,
      name: selectedImageUri,
    });
    data.append("country", area);
    data.append("building_name", building_name);
    data.append("apartment_number", apartment_name);
    data.append("city", city);
    data.append("key", "postdetail");
    data.append("discription", "");
    this.props.editProfile(data, () => {
      Actions.pop();
    });
  };

  openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(res => {
        this.setState({
          selectedImageUri: res.path,
        });
      })
      //eslint-disable-next-line
      .catch(err => console.warn(err));
  };

  openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(res => {
        this.setState({
          selectedImageUri: res.path,
        });
      })
      //eslint-disable-next-line

      .catch(() => {
        //
      });
  };
  handleAction = index => {
    switch (index) {
      case 0:
        this.openCamera();
        break;
      case 1:
        this.openGallery();
        break;
      default:
        break;
    }
  };
  focus = key => {
    this[key].focus();
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={strings.edit_profile} />
        <View style={styles.container}>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={styles.profileContainer}>
                <View>
                  <View style={styles.blue_divider}></View>

                  <View
                    style={{
                      width: "100%",
                      marginTop: moderateScale(25),
                      position: "absolute",
                    }}>
                    <TouchableOpacity
                      style={{
                        height: moderateScale(120),
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                      onPress={() => {
                        this.actionSheet.show();
                      }}>
                      <Image
                        source={
                          this.state.selectedImageUri
                            ? {uri: this.state.selectedImageUri}
                            : ""
                        } //require('../.././assets/icon/dummy.png')}
                        resizeMode="cover"
                        style={{
                          height: moderateScale(130),
                          width: moderateScale(130),
                          alignSelf: "center",
                          margin: moderateScale(4),
                          backgroundColor: "white",
                          padding: moderateScale(15),
                          borderRadius: moderateScale(65),
                        }}
                      />
                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          justifyContent: "center",
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.actionSheet.show();
                          }}
                          style={{
                            width: moderateScale(70),
                            height: moderateScale(70),
                            marginTop: moderateScale(100),
                            alignSelf: "center",
                          }}>
                          <Image
                            source={require("../.././assets/icon/photo-camera1.png")}
                            style={{
                              resizeMode: "contain",
                              marginLeft: moderateScale(60),
                              alignSelf: "center",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      marginTop: moderateScale(50),
                      marginBottom: moderateScale(50),
                    }}>
                    <Text style={styles.labelStyle}>{strings.first_name}</Text>
                    <View
                      style={{
                        ...styles.textInputContainer,
                      }}>
                      <Input
                        placeholder={strings.first_name}
                        text={this.state.first_name}
                        onChangeText={first_name => {
                          this.setState({first_name});
                        }}
                        formInput={styles.textInputStyle}
                        ref={ref => (this.first_name = ref)}
                        returnKeyType="next"
                        onSubmitEditing={() => this.focus("last_name")}
                      />
                    </View>
                    <Text style={styles.labelStyle}>{strings.last_name}</Text>
                    <View style={styles.textInputContainer}>
                      <Input
                        placeholder={strings.last_name}
                        text={this.state.last_name}
                        formInput={styles.textInputStyle}
                        onChangeText={last_name => {
                          this.setState({last_name});
                        }}
                        ref={ref => (this.last_name = ref)}
                        returnKeyType="next"
                        onSubmitEditing={() => this.focus("phone")}
                      />
                    </View>
                    <Text style={styles.labelStyle}>
                      {strings.email_address}
                    </Text>
                    <View style={styles.textInputContainer}>
                      <View
                        style={{
                          flex: 0.8,
                        }}>
                        <Input
                          editable={false}
                          placeholder={strings.email_address}
                          keyboardType={"email-address"}
                          text={this.state.email}
                          formInput={styles.textInputStyle}
                          onChangeText={email => {
                            this.setState({email});
                          }}
                          ref={ref => (this.email = ref)}
                          returnKeyType="next"
                        />
                      </View>
                    </View>
                    <Text style={styles.labelStyle}>
                      {strings.phone_number}
                    </Text>
                    <View style={styles.textInputContainer}>
                      <Input
                        placeholder={strings.phone}
                        text={this.state.phone}
                        keyboardType={"numeric"}
                        onChangeText={phone => {
                          this.setState({phone});
                        }}
                        formInput={styles.textInputStyle}
                        ref={ref => (this.phone = ref)}
                        returnKeyType="next"
                        onSubmitEditing={() => this.focus("city")}
                      />
                    </View>
                    <Text style={styles.labelStyle}>{strings.city}</Text>
                    <View style={styles.textInputContainer}>
                      <Input
                        placeholder={strings.address}
                        formInput={styles.textInputStyle}
                        text={this.state.city}
                        onChangeText={city => {
                          this.setState({city});
                        }}
                        ref={ref => (this.city = ref)}
                        returnKeyType="next"
                        onSubmitEditing={() => this.focus("area")}
                      />
                    </View>
                    {/* <Text style={styles.labelStyle}>{strings.zipcode}</Text>
                    <View style={styles.textInputContainer}>
                      <Input
                        placeholder={strings.phone}
                        text={this.state.zipCode}
                        keyboardType={"numeric"}
                        onChangeText={zipCode => {
                          this.setState({zipCode});
                        }}
                        formInput={styles.textInputStyle}
                      />
                    </View> */}

                    <Text style={styles.labelStyle}>{strings.area}</Text>
                    <View style={styles.textInputContainer}>
                      <Input
                        placeholder={strings.address}
                        ref={ref => (this.area = ref)}
                        formInput={styles.textInputStyle}
                        text={this.state.area}
                        // onSubmitEditing={() => this.building.current.focus()}
                        onChangeText={area => {
                          this.setState({area});
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => this.focus("building_name")}
                      />
                    </View>
                    <Text style={styles.labelStyle}>{strings.build_name}</Text>
                    <View style={styles.textInputContainer}>
                      <Input
                        placeholder={strings.address}
                        ref={ref => (this.building_name = ref)}
                        formInput={styles.textInputStyle}
                        text={this.state.building_name}
                        // onSubmitEditing={() => this.building.current.focus()}
                        onChangeText={building_name => {
                          this.setState({building_name});
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => this.focus("apartment_name")}
                      />
                    </View>

                    <Text style={styles.labelStyle}>{strings.apt_number}</Text>
                    <View style={styles.textInputContainer}>
                      <Input
                        placeholder={strings.apt_number}
                        ref={ref => (this.apartment_name = ref)}
                        // onSubmitEditing={() => this.building.current.focus()}
                        formInput={styles.textInputStyle}
                        text={this.state.apartment_name}
                        onChangeText={apartment_name => {
                          this.setState({apartment_name});
                        }}
                        returnKeyType="done"
                        keyboardType={"numeric"}
                        onSubmitEditing={this._onPressLogin}
                      />
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
                          <Text style={styles.buttonText}>
                            {strings.update}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                    {/* <View style={styles.buttonView}>
                      <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                          Actions.addCard();
                        }}>
                        <Text style={styles.buttonText}>
                          {strings.add_card}
                        </Text>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          <ActionSheet
            ref={ref => (this.actionSheet = ref)}
            title={strings.open}
            options={[strings.camera, strings.gallery, strings.cancel]}
            cancelButtonIndex={2}
            onPress={this.handleAction}
          />
        </View>
      </SafeAreaView>
    );
  }
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
  },
  textInputStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    flex: 1,
    textAlignVertical: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    height: moderateScale(43),
    marginLeft: moderateScale(15),
    marginRight: moderateScale(20),
    borderBottomWidth: moderateScale(0.7),
    borderBottomColor: Constants.colors.Primary,
  },

  textStyle: {
    fontSize: moderateScale(16),
    color: Constants.colors.Primary,
    fontFamily: "Roboto-Regular",
  },
  labelStyle: {
    fontSize: moderateScale(16),
    color: Constants.colors.Primary,
    fontFamily: "Roboto-Regular",
    marginLeft: moderateScale(15),
    marginTop: moderateScale(12),
  },
  profileContainer: {
    backgroundColor: "white",
  },

  blue_divider: {
    height: moderateScale(100),
    backgroundColor: Constants.colors.Primary,
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
  buttonText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Medium",
    color: Constants.colors.White,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.loginReducer.loading,
    userID: state.loginReducer.loginData.data.ID,
    user_email: state.loginReducer.loginData.data.user_email,
    profileResponse: state.loginReducer.loginData.data,
  };
};

const mapDispatchToProps = dispatch => ({
  editProfile: (data, callback) => dispatch(editProfile(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileComponent);
