import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import {strings} from "../../constants/i18n";
import Input from "../../components/TextInput";
import {editProfile} from "../../actions/authAction/EditProfileAction";
import {moderateScale} from "../../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import Constants from "../.././constants";
import {connect} from "react-redux";
import Loader from "../../components/common/Loader";

class MyAccount extends Component {
  getProfileInfo = () => {
    let data = new FormData();
    data.append("key", "");
    data.append(
      "user_id",
      (this.props.profileResponse && this.props.profileResponse.ID) ||
        (this.props.profileResponse && this.props.profileResponse.id),
    );
    this.props.getProfileInfo(data);
  };

  componentDidMount() {
    this.getProfileInfo();
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    return (
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, height: Dimensions.get("window").height - 80}}>
            <View style={styles.profileContainer}>
              <View style={styles.blue_divider}></View>

              <View
                style={{
                  height: moderateScale(120),
                  width: "100%",
                  marginTop: moderateScale(35),
                  position: "absolute",
                }}>
                <View
                  style={{
                    height: moderateScale(120),
                    justifyContent: "center",
                    alignContent: "center",
                  }}>
                  <Image
                    source={
                      this.props.profileResponse &&
                      this.props.profileResponse.avatar &&
                      this.props.profileResponse.avatar.url
                        ? {uri: this.props.profileResponse.avatar.url}
                        : ""
                    } //require('../.././assets/icon/dummy.png')}
                    resizeMode="cover"
                    style={{
                      height: moderateScale(120),
                      width: moderateScale(120),
                      alignSelf: "center",
                      backgroundColor: "white",
                      padding: moderateScale(15),
                      margin: moderateScale(4),
                      borderRadius: moderateScale(60),
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text style={styles.textStyle}>
                    {this.props.profileResponse.first_name}
                  </Text>
                  <Text
                    style={{
                      ...styles.textStyle,
                      marginBottom: moderateScale(30),
                      fontSize: moderateScale(14),
                      color: "#808080",
                    }}>
                    {this.props.profileResponse.last_name}
                  </Text>
                </View>
                <Text style={styles.labelStyle}>{strings.email}</Text>
                <View style={styles.textInputContainer}>
                  <Input
                    placeholder={strings.email}
                    editable={false}
                    text={this.props.profileResponse.user_email}
                    formInput={styles.textInputStyle}
                  />
                </View>
                <Text style={styles.labelStyle}>{strings.phone}</Text>

                <View style={styles.textInputContainer}>
                  <Input
                    placeholder={strings.phone}
                    editable={false}
                    text={this.props.profileResponse.contact}
                    formInput={styles.textInputStyle}
                  />
                </View>
                <Text style={styles.labelStyle}>{strings.address}</Text>

                <View
                  style={{
                    ...styles.textInputContainer,
                    height: moderateScale(60),
                  }}>
                  <Input
                    placeholder={strings.address}
                    editable={false}
                    text={this.props.profileResponse.address}
                    formInput={styles.textInputStyle}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
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
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    borderColor: Constants.colors.Primary,
    borderRadius: moderateScale(23),
    borderWidth: moderateScale(1),
  },
  labelStyle: {
    fontSize: moderateScale(16),
    color: Constants.colors.Primary,
    fontFamily: "Roboto-Regular",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5),

    marginLeft: moderateScale(35),
  },
  textStyle: {
    fontSize: moderateScale(20),
    color: Constants.colors.Primary,
    fontFamily: "Poppins-Regular",
    alignItems: "center",
  },
  profileContainer: {
    backgroundColor: "gray",
  },
  blue_divider: {
    height: moderateScale(90),
    backgroundColor: Constants.colors.Primary,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.loginReducer.loading,
    user_email: state.loginReducer.loginData.data.user_email,
    profileResponse: state.loginReducer.loginData.data,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfileInfo: (data, callback) => dispatch(editProfile(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
