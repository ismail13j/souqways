import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import {moderateScale} from "../helper/responsiveFont";
import {AirbnbRating} from "react-native-ratings";
import Icon from "react-native-vector-icons/AntDesign";
import BagShopping from "react-native-vector-icons/FontAwesome";
import HandBag from "react-native-vector-icons/SimpleLineIcons";
import Constants from "../constants";
import {Actions} from "react-native-router-flux";
import {useSelector} from "react-redux";
import Loader from "./common/Loader";

const ProductItem = props => {
  const currentCartProduct = useSelector(
    state => state.getCartListReducer.currentProduct,
  );
  const currentWishProduct = useSelector(
    state => state.getWishListReducer.currentProduct,
  );
  const loading = useSelector(
    state =>
      state.getCartListReducer.loading || state.getWishListReducer.loading,
  );

  if (
    loading &&
    (currentCartProduct == props.post_id || currentWishProduct == props.post_id)
  ) {
    return (
      <View style={styles.itemBackground}>
        <Loader />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={styles.itemBackground}
      onPress={() => {
        Actions.productDetail({product: props});
      }}>
      <View
        style={{
          flexDirection: "row",
          padding: moderateScale(2),
          marginTop: moderateScale(10),
          justifyContent: "space-between",
        }}></View>
      <TouchableOpacity
        style={{
          width: moderateScale(127),
          height: moderateScale(77),
          justifyContent: "center",
        }}
        onPress={() => {
          Actions.productDetail({product: props});
        }}>
        <Image
          style={{
            width: moderateScale(127),
            height: moderateScale(77),
          }}
          resizeMode="cover"
          source={{
            uri:
              (props.image && props.image.featuredImg) ||
              "http://34.211.31.84:7076/wp-content/uploads/woocommerce-placeholder.png",
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          height: moderateScale(45),
          justifyContent: "center",
        }}>
        <Text
          numberOfLines={2}
          style={{
            ...styles.headingText,
            margin: moderateScale(5),
            fontSize: moderateScale(14),
            alignSelf: "center",
          }}>
          {props.post_name}
        </Text>
      </View>
      <Text
        style={{
          ...styles.headingText,
          fontSize: moderateScale(15),
          alignSelf: "center",
        }}>
        {props.currency_symbol} {props.price}
      </Text>
      <AirbnbRating
        size={15}
        isDisabled={true}
        showRating={false}
        defaultRating={props.average_rating}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: moderateScale(10),
        }}>
        <TouchableOpacity
          style={{
            marginRight: moderateScale(10),
          }}
          onPress={() => {
            props.onAddToCart({
              ...props,
              quantity: 1,
            });
          }}>
          {!props.cart_status ? (
            <HandBag
              name="handbag"
              size={22}
              color={Constants.colors.Primary}
              style={{color: Constants.colors.Primary}}
            />
          ) : (
            <BagShopping
              name="shopping-bag"
              size={22}
              color={Constants.colors.Primary}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            props.onAddToWishList({
              ...props,
              quantity: 1,
            });
          }}>
          {props.wishlist_status ? (
            <Icon name="heart" size={22} color="red" />
          ) : (
            <Icon name="hearto" size={22} color="red" />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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

  bottom_container: {
    height: moderateScale(160),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductItem;
