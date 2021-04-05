import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import constants from "../../constants";
import Icon from "react-native-vector-icons/AntDesign";
import {useSelector} from "react-redux";
import {strings} from "../../constants/i18n";
const CartItem = ({item, index, onIncrement, onDecrement, onDelete}) => {
  let currentProduct = useSelector(
    state => state.getCartListReducer.currentProduct,
  );

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
            margin: moderateScale(5),
            alignItems: "flex-end",
          }}
          onPress={() => {
            onDelete(item, index);
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
                fontSize: moderateScale(16),
                color: constants.colors.gray,
              }}>
              {" "}
              {strings.price}
              {": "}
            </Text>
            <Text
              style={{
                ...styles.headingText,
                fontSize: moderateScale(16),
              }}>
              {strings.aed} {parseFloat(item.line_total).toFixed(2)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: moderateScale(5),
          }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginRight: moderateScale(8),
            }}
            disabled={parseInt(item.quantity) <= 1}
            onPress={() => {
              onDecrement(item);
            }}>
            <Icon
              name="minuscircleo"
              size={18}
              color={parseInt(item.quantity) <= 1 ? "grey" : "red"}
            />
          </TouchableOpacity>
          {currentProduct == item.product_id ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                color: constants.colors.Black,
                textAlign: "center",
                fontFamily: "Poppins-Medium",
                fontSize: moderateScale(14),
              }}>
              {item.quantity}
            </Text>
          )}

          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginLeft: moderateScale(8),
            }}
            onPress={() => {
              onIncrement(item);
            }}>
            <Icon name="pluscircleo" size={18} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.colors.White,
    flex: 1,
    flexDirection: "column",
  },

  headingText: {
    fontSize: moderateScale(16),
    alignSelf: "flex-start",
    color: constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },
  shadowView: {
    shadowColor: "#000",
    height: moderateScale(149),
    flexDirection: "row",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    backgroundColor: "white",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
  },
  buttonText: {
    fontSize: moderateScale(13),
    fontFamily: "Poppins-Medium",
    color: constants.colors.Primary,
  },
  buttonView: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle: {
    fontSize: moderateScale(20),
    color: constants.colors.Primary,
    fontFamily: "Poppins-Regular",
  },
  buttonStyle: {
    backgroundColor: constants.colors.White,
    height: moderateScale(30),
    width: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
    color: constants.colors.White,
    borderRadius: moderateScale(15),
  },
});
export default CartItem;
