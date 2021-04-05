import React from "react";
import {View, Text, FlatList, Image, StyleSheet} from "react-native";
import constants from "../../constants";
import {moderateScale} from "../../helper/responsiveFont";
import {strings} from "../../constants/i18n";

const OrderView = ({orderItems}) => {
  return (
       <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      data={orderItems}
      renderItem={({item, index}) => (
        <View style={styles.container} key={index}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri: item.image.featuredImg,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detailsView}>
            <View style={styles.dataContainer}>
              <Text style={[styles.smallText, styles.boldText]}>
                {item.post_name}
              </Text>
              {/* <Text style={styles.editButton}>{strings.edit}</Text> */}
            </View>
            <View style={styles.dataContainer1}>
              <Text style={[styles.smallText]}>{strings.price}:</Text>
              <Text style={[styles.smallText]}>
                {strings.aed + " " + parseFloat(item.line_total).toFixed(2)}
              </Text>
            </View>
            <View style={styles.dataContainer1}>
              <Text style={[styles.smallText]}> {strings.quantity} </Text>
              <Text style={[styles.smallText]}>{item.quantity}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: moderateScale(5),
  },
  imageView: {
    height: moderateScale(100),
    width: moderateScale(100),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: constants.colors.lightBlue,
    shadowOpacity: 1,
    shadowOffset: {height: 5, width: 1},
    elevation: 1,
    //   borderRadius: moderateScale(10),
    //   borderWidth: 0.5,
    //   borderColor: constants.colors.fadeGrey,
  },
  image: {height: moderateScale(80), width: moderateScale(80)},
  detailsView: {
    flex: 1,
    justifyContent: "flex-start",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataContainer1: {flexDirection: "row"},
  editButton: {
    fontSize: moderateScale(12),
    fontFamily: "Poppins-Regular",
    color: constants.colors.Primary,
  },
  smallText: {
    fontSize: moderateScale(13),
    fontFamily: "Poppins-Regular",
    color: constants.colors.dark,
    paddingRight: moderateScale(5),
  },
  boldText: {
    fontWeight: "500",
    fontSize: moderateScale(16),
  },
});

export default OrderView;
