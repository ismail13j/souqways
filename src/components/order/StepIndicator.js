import React from "react";
import {View, Text, FlatList, Dimensions} from "react-native";
import constants from "../../constants";
import {moderateScale} from "../../helper/responsiveFont";
import {strings} from "../../constants/i18n";
const StepIndicator = props => {
  return (
    <View style={{marginBottom: moderateScale(10)}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        horizontal
        // style={{maxHeight: moderateScale(50), marginBottom: moderateScale(10)}}
        data={[
          {title: strings.shipping},
          {title: strings.order},
          // {title: strings.payment},
        ]}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor: constants.colors.Primary,
                height: moderateScale(50),
                justifyContent: "space-between",
                alignItems: "center",
                width: Dimensions.get("window").width / 2,
                shadowColor: constants.colors.White,
                shadowOffset: {height: 1, width: 1},
                shadowOpacity: 0.5,
                // shadowRadius:moderateScale(10),
                elevation: 1,
              }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: moderateScale(50),
                  width: "80%",
                  borderBottomColor: constants.colors.yellow,
                  borderBottomWidth: props.step == index ? 5 : 0,
                }}>
                <Text
                  style={{
                    color: constants.colors.White,
                    fontSize: moderateScale(15),
                    fontFamily: "Poppins-Medium",
                    textAlignVertical: "bottom",
                  }}>
                  {item.title}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default StepIndicator;
