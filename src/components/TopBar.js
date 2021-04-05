import React, {useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import {moderateScale} from "../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import constants from ".././constants";
import {useSelector} from "react-redux";
import IconMenu from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/AntDesign";
import HandBag from "react-native-vector-icons/SimpleLineIcons";
import SlideMenu from "../container/Dashboard/SlideMenu";
import {strings} from "../constants/i18n";
const getRightComponent = () => {
  return (
    <TouchableOpacity
      style={styles.iconView}
      onPress={() => {
        Actions.editProfile();
      }}>
      <Image
        source={require("../assets/icon/edit.png")}
        style={{
          resizeMode: "contain",
        }}
      />
    </TouchableOpacity>
  );
};
const TopBar = props => {
  const [visible, updateVisible] = useState(false);
  const wishList = useSelector(state => state.getWishListReducer.wishList);
  const cartList = useSelector(state => state.getCartListReducer.cartList);
  let changeHeader =
    Actions.currentScene === "_myAccount" ||
    Actions.currentScene === "_myOrder";
  let title = props.title;
  let {RightComponent} = props;
  if (changeHeader) {
    title =
      Actions.currentScene === "_myAccount"
        ? strings.profile
        : strings.my_order;
  }
  return (
    <SafeAreaView style={{backgroundColor: "white"}}>
      <View
        style={{
          backgroundColor: "white",
          height: moderateScale(60),
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: constants.colors.lightGrey,
          borderBottomWidth: 1,
        }}>
        {props.backEnabled ? (
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => {
              Actions.pop();
            }}>
            <Icon name="arrowleft" size={25} color={constants.colors.Primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => {
              // Actions.drawer();
              updateVisible(true);
            }}>
            <IconMenu name="menu" size={25} color={constants.colors.Primary} />
          </TouchableOpacity>
        )}
        <Text style={[styles.welcomeHeader]}>{title || "Souqways"}</Text>

        {changeHeader ? (
          Actions.currentScene === "_myAccount" ? (
            getRightComponent()
          ) : (
            <View style={styles.iconView} />
          )
        ) : RightComponent ? (
          <RightComponent />
        ) : (
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
                justifyContent: "center",
              }}
              onPress={() => {
                Actions.push("cartList");
              }}>
              {cartList && cartList.length ? (
                <View
                  style={{
                    backgroundColor: constants.colors.Primary,
                    height: moderateScale(20),
                    width: moderateScale(20),
                    alignSelf: "center",
                    alignItems: "center",
                    borderRadius: moderateScale(100),
                    position: "absolute",
                    right: moderateScale(15),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: "Poppins-Regular",
                      color: "white",
                    }}>
                    {cartList.length}
                  </Text>
                </View>
              ) : null}
              <HandBag
                name="handbag"
                size={20}
                color={constants.colors.Primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: moderateScale(60),
                marginRight: moderateScale(10),
                alignItems: "center",
              }}
              onPress={() => {
                Actions.searchScreen();
              }}>
              <View
                style={{
                  height: moderateScale(20),
                  width: moderateScale(20),
                  alignSelf: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(10),
                }}></View>

              <Icon name="search1" size={20} color={constants.colors.Primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: moderateScale(60),
                marginRight: moderateScale(20),
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => Actions.push("wishlist")}>
              {wishList && wishList.length ? (
                <View
                  style={{
                    backgroundColor: constants.colors.Primary,
                    height: moderateScale(20),
                    width: moderateScale(20),
                    alignSelf: "center",
                    alignItems: "center",
                    borderRadius: moderateScale(100),
                    position: "absolute",
                    left: moderateScale(15),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: "Poppins-Regular",
                      color: "white",
                    }}>
                    {wishList.length}
                  </Text>
                </View>
              ) : null}

              <Icon name="hearto" size={20} color={constants.colors.Primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <SlideMenu visible={visible} onClose={updateVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: constants.colors.Primary,
  },
  welcomeHeader: {
    fontSize: moderateScale(20),
    color: constants.colors.Primary,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    textAlignVertical: "center",
    height: moderateScale(50),
    flex: 1,
    paddingVertical: moderateScale(10),
  },

  iconView: {
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TopBar;
