import React from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native";
import constants from "../../constants";
import {moderateScale} from "../../helper/responsiveFont";

const DeliveryOptions = ({options, deliveryType, onChangeDeliveryType}) => {
  return (
       <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      data={options}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{flexDirection: "row", marginVertical: moderateScale(5)}}
          onPress={() => onChangeDeliveryType(item.id)}>
          <View
            style={{
              backgroundColor:
                deliveryType === item.id
                  ? constants.colors.Primary
                  : constants.colors.lightGrey,
              borderRadius: moderateScale(100),
              height: moderateScale(20),
              width: moderateScale(20),
            }}
          />
          <View
            style={{
              paddingHorizontal: moderateScale(10),
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: moderateScale(13),
                fontFamily: "Poppins-Regular",
                color:
                  deliveryType === item.id
                    ? constants.colors.dark
                    : constants.colors.grayTxt,
                fontWeight: deliveryType === item.id ? "600" : "100",
              }}>
              {item.type}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(10),
                fontFamily: "Poppins-Regular",
                color:
                  deliveryType === item.id
                    ? constants.colors.dark
                    : constants.colors.grayTxt,
                fontWeight: deliveryType === item.id ? "400" : "100",
                textAlign: "justify",
              }}>
              {item.comment}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default DeliveryOptions;
