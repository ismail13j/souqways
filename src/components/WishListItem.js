import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import {moderateScale} from "../helper/responsiveFont";
import Icon from "react-native-vector-icons/AntDesign";
import {Actions} from "react-native-router-flux";
import Constants from "../constants";

import {strings} from "../constants/i18n";

const WishListItem = props => {
  let {item, onDelete} = props;
  return (
    <View style={styles.shadowView}>
      <View
        style={{
          flex: 0.3,
          justifyContent: "center",
        }}>
        <Image
          style={{
            flex: 1,
            height: moderateScale(94),
            width: moderateScale(94),
          }}
          resizeMode="contain"
          source={{
            uri: item.image && item.image.featuredImg,
          }}
        />
      </View>

      <View
        style={{
          flex: 0.7,
          marginLeft: moderateScale(8),
          flexDirection: "column",
        }}>
        <TouchableOpacity
          style={{
            justifyContent: "flex-end",
            marginTop: moderateScale(15),
            alignItems: "flex-end",
          }}
          onPress={() => {
            onDelete(item);
          }}>
          <Icon name="delete" size={22} color="red" />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.headingText}>
          {item.post_name}
        </Text>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}>
          <View
            style={{
              flexDirection: "row",
            }}>
            <Text
              style={{
                ...styles.headingText,
                fontSize: moderateScale(13),
                color: Constants.colors.gray,
              }}>
              {"Price:  "}
            </Text>
            <Text
              style={{
                ...styles.headingText,
                fontSize: moderateScale(13),
              }}>
              {item.currency_symbol} {item.price}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
            }}
            disabled={item.stock_status !== "instock"}
            onPress={() => {
              props.onAddToCart();
              Actions.cartList();
            }}>
            <Text
              style={{
                ...styles.headingText,
                fontSize: moderateScale(13),
                color: Constants.colors.Yellow,
              }}>
              {strings.add_bag}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
            }}>
            <Text
              style={{
                ...styles.headingText,
                color: "#FCB800",
                fontSize: moderateScale(13),
                marginLeft: moderateScale(6),
              }}>
              {item.stock_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  slideBackground: {},

  shadowView: {
    shadowColor: "#000",
    height: moderateScale(139),
    flexDirection: "row",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    backgroundColor: "white",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
  },

  swiperViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  itemBackground: {
    shadowColor: "#000",
    width: moderateScale(150),
    height: moderateScale(250),
    flexDirection: "column",
    backgroundColor: "#FFF",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    borderRadius: moderateScale(10),
    padding: moderateScale(5),
    margin: moderateScale(10),
  },
  textStyle: {
    fontSize: moderateScale(16),
    color: Constants.colors.Black,
    fontFamily: "Roboto-Regular",
  },

  headingText: {
    fontSize: moderateScale(17),
    color: Constants.colors.Primary,
    fontFamily: "Poppins-Medium",
  },

  welcomeHeader: {
    fontSize: moderateScale(17),
    color: Constants.colors.Primary,
    fontFamily: "Roboto-Regular",
  },

  subHeading: {
    fontSize: moderateScale(32),
    color: Constants.colors.Primary,
    fontFamily: "Poppins-SemiBold",
    marginBottom: moderateScale(25),
  },
  buttonStyle: {
    backgroundColor: Constants.colors.Primary,
    height: moderateScale(30),
    width: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
    marginRight: moderateScale(40),
    color: Constants.colors.White,
    borderRadius: moderateScale(15),
  },
  buttonText: {
    fontSize: moderateScale(11),
    fontFamily: "Poppins-Medium",
    color: Constants.colors.White,
  },

  bottom_container: {
    height: moderateScale(160),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WishListItem;
