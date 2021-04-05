import {connect} from "react-redux";
import React, {Component} from "react";
import {Actions} from "react-native-router-flux";
import {moderateScale} from "../../helper/responsiveFont";
import {strings} from "../../constants/i18n";
import {
  _logout,
  updateTheLanguage,
} from "../../actions/authAction/LogoutActions";
import SignOut from "../Auth/SignOut";
import Icon from "react-native-vector-icons/AntDesign";
import IconSetting from "react-native-vector-icons/Feather";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {blackColor} from "../../constants/colors";
import Modal from "react-native-modal";
import constants from "../../constants";

class SlideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: false,
    };
  }

  _onPressLogout = async () => {
    await this.props.onClose(false);
    Actions.signOut();
  };

  onLanguagePress = async () => {
    await this.props.onClose(false);
    let lang = this.props.lang === "en" ? "ar" : "en";
    this.props.updateTheLanguage(lang);
    // Actions.reset("dashboard");
  };

  render() {
    return (
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        isVisible={this.props.visible}
        onBackdropPress={() => this.props.onClose(false)}
        style={{
          backgroundColor: constants.colors.Primary,
          width: "70%",
          height: "100%",
          margin: 0,
          paddingVertical: moderateScale(30),
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          style={
            {
              // backgroundColor: constants.colors.Primary,
            }
          }>
          <View
            style={{
              backgroundColor: constants.colors.Primary,
            }}>
            <TouchableOpacity
              style={{
                ...styles.linkContainer,
                // marginTop: Platform.OS === "ios" ? moderateScale(40) : 0,
                // marginBottom: moderateScale(20),
              }}
              onPress={async () => {
                // Actions.drawerClose();
                await this.props.onClose(false);
              }}>
              <View style={styles.linkView}>
                <Image source={require("../../assets/icon/close.png")} />
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "column",
              }}>
              <TouchableOpacity
                style={styles.linkContainer}
                onPress={async () => {
                  await this.props.onClose(false);
                  Actions.home();
                }}>
                <View style={styles.linkView}>
                  <View
                    style={{
                      flex: 0.05,
                    }}></View>

                  <View
                    style={{
                      flex: 0.15,
                    }}>
                    <Image source={require("../../assets/icon/ic_home.png")} />
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "flex-start",
                    }}>
                    <Text style={styles.textStyle}>{strings.home}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkContainer}
                onPress={async () => {
                  await this.props.onClose(false);
                  Actions.couponsListing();
                }}>
                <View style={styles.linkView}>
                  <View
                    style={{
                      flex: 0.05,
                    }}></View>

                  <View
                    style={{
                      flex: 0.15,
                    }}>
                    <Image
                      source={require("../../assets/icon/ic_coupon.png")}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "flex-start",
                    }}>
                    <Text style={styles.textStyle}>{strings.coupans}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkContainer}
                onPress={async () => {
                  await this.props.onClose(false);
                  Actions.wishlist();
                }}>
                <View style={styles.linkView}>
                  <View
                    style={{
                      flex: 0.05,
                    }}></View>

                  <View
                    style={{
                      flex: 0.15,
                    }}>
                    <Image
                      source={require("../../assets/icon/white_heart.png")}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "flex-start",
                    }}>
                    <Text style={styles.textStyle}>{strings.my_favourite}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkContainer}
                onPress={async () => {
                  await this.props.onClose(false);
                  Actions.settings();
                }}>
                <View style={styles.linkView}>
                  <View
                    style={{
                      flex: 0.05,
                    }}></View>

                  <View
                    style={{
                      flex: 0.15,
                    }}>
                    <IconSetting
                      name="settings"
                      size={21}
                      color={constants.colors.White}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "flex-start",
                    }}>
                    <Text style={styles.textStyle}>{strings.setting}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkContainer}
                onPress={async () => {
                  await this.props.onClose(false);
                  Actions.notifications();
                }}>
                <View style={styles.linkView}>
                  <View
                    style={{
                      flex: 0.05,
                    }}></View>

                  <View
                    style={{
                      flex: 0.15,
                    }}>
                    <Icon name="bells" size={23} color="#FFF"></Icon>
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "flex-start",
                    }}>
                    <Text style={styles.textStyle}>
                      {strings.notification_setting}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.linkContainer}
                onPress={async () => {
                  await this.props.onClose(false);
                  Actions.webView({
                    order: {order_id: 60146},
                    product_id: "3111",
                    status: true,
                  });
                }}>
                <View style={styles.linkView}>
                  <View
                    style={{
                      flex: 0.05,
                    }}></View>

                  <View
                    style={{
                      flex: 0.15,
                    }}>
                    <Icon name="bells" size={23} color="#FFF"></Icon>
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "flex-start",
                    }}>
                    <Text style={styles.textStyle}>WebView</Text>
                  </View>
                </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => {
                Actions.addCard();
              }}>
              <View style={styles.linkView}>
                <View
                  style={{
                    flex: 0.05,
                  }}></View>

                <View
                  style={{
                    flex: 0.15,
                  }}>
                  <Icon name="creditcard" size={23} color="#FFF"></Icon>
                </View>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: "flex-start",
                  }}>
                  <Text style={styles.textStyle}>{strings.add_card}</Text>
                </View>
              </View>
            </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.linkContainer}
                onPress={() => {
                  // this.props.navigation.closeDrawer();
                  this._onPressLogout();
                }}>
                <View style={styles.linkView}>
                  <View
                    style={{
                      flex: 0.05,
                    }}></View>
                  <View
                    style={{
                      flex: 0.15,
                    }}>
                    <Image source={require("../../assets/icon/logout.png")} />
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "flex-start",
                    }}>
                    <Text style={styles.textStyle}>{strings.sign_out}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: "gray",
                  height: moderateScale(1),
                }}></View>

              <TouchableOpacity
                style={styles.linkContainer}
                onPress={() => {
                  this.onLanguagePress();
                }}>
                <View style={styles.linkView}>
                  <View
                    style={{
                      flex: 0.05,
                    }}></View>

                  <View
                    style={{
                      flex: 0.15,
                    }}>
                    {this.props.lang === "en" ? (
                      <Image source={require("../../assets/icon/arabic.png")} />
                    ) : (
                      <Image
                        source={require("../../assets/icon/english.png")}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 0.8,
                      justifyContent: "flex-start",
                    }}>
                    <Text style={styles.textStyle}>{strings.arabic}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* <SignOut
              dialogVisible={this.state.dialogVisible}
              closeModal={() => {
                this.setState({dialogVisible: false});
              }}
            /> */}
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    userImageURl: state.loginReducer.userData.avatar,
    firstName: state.loginReducer.userData.first_name,
    last_name: state.loginReducer.userData.last_name,
    lang: state.appState.lang,
  };
};
const mapDispatchToProps = {
  _logout,
  updateTheLanguage,
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, flexDirection: "column", backgroundColor: "#07308A"},

  textStyle: {
    fontSize: moderateScale(17),
    color: constants.colors.White,
    alignContent: "flex-start",
    fontFamily: "Poppins-Regular",
  },

  header: {fontSize: moderateScale(30), color: blackColor, fontWeight: "bold"},
  linkContainer: {
    height: moderateScale(50),
    paddingHorizontal: moderateScale(20),
  },
  linkView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu);
