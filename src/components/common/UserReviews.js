import React from "react";
import {View, Image, StyleSheet, Text} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import {moderateScale} from "../../helper/responsiveFont";

import constants from "../../constants";

const UserReviews = props => {
  return (
    <View style={[styles.mainContainer, props.mainContainerStyle]}>
      <View style={styles.userImage}>
        <Image
          source={{
            uri:
              (props && props.image && props.image.url) ||
              "https://i.stack.imgur.com/l60Hf.png",
          }}
          resizeMode="cover"
          style={[styles.image]}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.userNameAndRatingWrapper}>
          <View style={styles.userNameWrapper}>
            <Text style={styles.userNameStyle}>{props.comment_author}</Text>
          </View>
          <View style={styles.userStarRatingWrapper}>
            <Text style={styles.starText}>{props.rating}</Text>
            <Icon
              name={"star"}
              size={18}
              color="white"
              style={{alignSelf: "flex-end"}}
            />
          </View>
        </View>

        {props.needTextOne != "" && (
          <View style={[styles.alignItemsInRow, props.needTextOneWrapper]}>
            {props.imageOne && (
              <Image resizeMode="contain" source={props.imageOne} />
            )}
            <Text style={[styles.commonTextStyle, props.needTextOneStyle]}>
              {props.needTextOne}
            </Text>
          </View>
        )}
        {props.needTextTwo != "" && (
          <Text style={[styles.commonTextStyle, props.needTextTwoStyle]}>
            {props.comment_content}
          </Text>
        )}
        {props.needTextThree != "" && (
          <Text style={styles.commonTextStyle}>{props.needTextThree}</Text>
        )}
        {!props.disableEdit && (
          <Icon
            name={"edit"}
            size={18}
            color="white"
            style={{alignSelf: "flex-end"}}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingBottom: moderateScale(constants.BaseStyle.isIphoneX ? 20 : 10),
    paddingHorizontal: moderateScale(20),
    backgroundColor: "#363636",
    marginBottom: moderateScale(50),
    elevation: 2,
  },
  content: {width: "100%"},
  text: {
    color: constants.colors.White,
    fontSize: moderateScale(24),
  },
  commonTextStyle: {
    width: moderateScale((constants.BaseStyle.DEVICE_WIDTH * 60) / 100),
    color: constants.colors.DarkBlack,
    fontSize: moderateScale(16),
  },
  image: {
    height: moderateScale(80),
    width: moderateScale(80),
    borderRadius: moderateScale(100),
  },
  userImage: {
    height: moderateScale(80),
    width: moderateScale(80),
    marginRight: moderateScale(35),
    borderWidth: 1,
    borderColor: constants.colors.lightGrey,
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
  },
  userNameAndRatingWrapper: {
    width: (constants.BaseStyle.DEVICE_WIDTH * 40) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userNameWrapper: {
    width: "80%",
  },
  userNameStyle: {
    fontSize: moderateScale(14),
    paddingTop: moderateScale(5),
    textAlignVertical: "center",
    fontWeight: "bold",
    paddingRight: moderateScale(20),
  },
  userStarRatingWrapper: {
    width: "35%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: constants.colors.userRatingGreen,
  },
  starText: {
    color: constants.colors.White,
    marginRight: moderateScale(0),
  },
  alignItemsInRow: {
    flexDirection: "row",
  },
});
export default UserReviews;
