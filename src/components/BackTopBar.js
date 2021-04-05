import React from "react";
import {View, Text, TouchableOpacity, Platform, StyleSheet} from "react-native";
import {moderateScale} from "../helper/responsiveFont";
import Icon from "react-native-vector-icons/AntDesign";
import HandBag from "react-native-vector-icons/SimpleLineIcons";
import {Actions, Drawer} from "react-native-router-flux";
import Constants from ".././constants";
import {connect} from "react-redux";
import {getWishListAction} from ".././actions/dashboardAction/getWishListAction";
import _ from "lodash";

class BackTopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }
  render() {
    let {title, back} = this.props;

    return (
      <View>
        <View
          style={{
            backgroundColor: "white",
            height: moderateScale(60),
            alignItems: "center",
            padding: moderateScale(10),
            marginTop: Platform.OS === "ios" ? moderateScale(20) : 0,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            style={{
              width: moderateScale(60),
              height: moderateScale(60),
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              Actions.pop();
            }}>
            <Icon name="arrowleft" size={25} color={Constants.colors.Primary} />
          </TouchableOpacity>
          <Text style={styles.welcomeHeader}>{title}</Text>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",

              alignItems: "center",
            }}>
            <TouchableOpacity
              style={{
                height: moderateScale(60),
                marginRight: moderateScale(10),
                alignItems: "center",
              }}
              onPress={() => {
                Actions.cartList();
              }}>
              <View
                style={{
                  backgroundColor:
                    this.props.cartCounter > 0
                      ? Constants.colors.Primary
                      : "transparent",
                  height: moderateScale(20),
                  width: moderateScale(20),
                  alignSelf: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(10),
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    fontFamily: "Poppins-Regular",
                    alignSelf: "center",
                    color: "white",
                  }}>
                  {this.props.cartCounter}
                </Text>
              </View>

              <HandBag
                name="handbag"
                size={25}
                color={Constants.colors.Primary}
              />
            </TouchableOpacity>
            {
              <TouchableOpacity
                style={{
                  height: moderateScale(60),
                }}
                onPress={() => {
                  Actions.searchScreen();
                }}>
                <View
                  style={{
                    backgroundColor:
                      this.props.cartCounter > 0
                        ? "transparent"
                        : "transparent",
                    height: moderateScale(20),
                    width: moderateScale(20),
                    alignSelf: "center",
                    alignItems: "center",
                    marginLeft: moderateScale(5),
                    marginRight: moderateScale(5),
                    borderRadius: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: "Poppins-Regular",
                      alignSelf: "center",
                      color: "white",
                    }}>
                    {this.props.cartCounter}
                  </Text>
                </View>
                <Icon
                  name="search1"
                  size={25}
                  color={Constants.colors.Primary}
                />
              </TouchableOpacity>
            }
            <TouchableOpacity
              style={{
                height: moderateScale(60),
                alignItems: "center",
              }}
              onPress={() => {
                // this.props.clearWishListBadge()
                Actions.wishlist();
              }}>
              <View
                style={{
                  backgroundColor:
                    this.props.wishCounter > 0
                      ? Constants.colors.Primary
                      : "transparent",
                  height: moderateScale(20),
                  width: moderateScale(20),
                  alignSelf: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(10),
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    fontFamily: "Poppins-Regular",
                    color: "white",
                  }}>
                  {this.props.wishCounter}
                </Text>
              </View>

              <Icon name="hearto" size={25} color={Constants.colors.Primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(1),
            backgroundColor: "grey",
          }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constants.colors.Primary,
  },
  welcomeHeader: {
    fontSize: moderateScale(20),
    color: Constants.colors.Primary,
    fontFamily: "Poppins-Regular",
  },
});

const mapStateToProps = state => {
  return {
    wishList: state.getWishListReducer.wishList,
    carList: state.getCartListReducer.cartList,
    cartCounter: state.getCartListReducer.cartCounter,
    wishCounter: state.getWishListReducer.wishCounter,
  };
};
const mapDispatchToProps = {getWishListAction};

export default connect(mapStateToProps, mapDispatchToProps)(BackTopBar);
