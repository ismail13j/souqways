import React from "react";
import {View, Text, FlatList} from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import Loader from "./Loader";
import {moderateScale} from "../../helper/responsiveFont";
import constants from "../../constants";
const STATUS = {};

const RenderStatus = props => {
  return (
    <Animatable.View
      animation="fadeInDown"
      direction="alternate"
      duration={500}
      delay={100}
      style={{
        flexDirection: "row",
        marginLeft: moderateScale(20),
        // borderBottomColor: constants.colors.lightGrey,
        // borderBottomWidth: 3,
      }}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: "10%",
        }}>
        <View
          style={{
            borderWidth: !props.end ? 2 : 0,
            borderColor: props.completed ? "#07308A" : "#A2A2A2",
            width: 0,
            height: "100%",
            position: "absolute",
          }}
        />
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor:
              props.data.completed &&
              (props.currentStatus == "cancelled" ||
                props.currentStatus == "rejected" ||
                props.currentStatus == "failed")
                ? "#FF0000"
                : props.data.completed
                ? "green"
                : "#E1E1E1",
            borderRadius: moderateScale(100),
            marginHorizontal: moderateScale(10),
            justifyContent: "center",
            alignItems: "center",
          }}>
          {props.data.completed && (
            <Icon
              name={
                props.currentStatus == "cancelled" ||
                props.currentStatus == "rejected" ||
                props.currentStatus == "failed"
                  ? "times"
                  : "check"
              }
              size={20}
              color="#fff"
            />
          )}
        </View>
      </View>

      <View
        style={{
          marginBottom: moderateScale(20),
          width: "100%",
        }}>
        <Text
          style={{
            fontSize: moderateScale(20),
            color: props.data.completed ? "#000000" : "#A2A2A2",
            fontFamily: "Poppins-Medium",
            marginLeft: moderateScale(10),
          }}>
          {props.data.title}
        </Text>
        <Text
          numberOfLines={5}
          style={{
            fontSize: moderateScale(16),
            color: props.data.completed ? "#0000009F" : "#A2A2A2",
            fontFamily: "Poppins-Medium",
            marginLeft: moderateScale(10),
          }}>
          {props.data.message}
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: props.data.completed ? "#0000009F" : "#A2A2A2",
            fontFamily: "Poppins-Medium",
            marginLeft: moderateScale(10),
          }}>
          {moment(props.data.time).format("DD MMM, YYYY @ hh:MM A")}
        </Text>
      </View>
    </Animatable.View>
  );
};

// const Header = props => {
//   return (
//     <Animatable.View
//       animation="fadeInDown"
//       direction="alternate"
//       duration={500}
//       delay={1000}
//       style={{justifyContent: "center", alignItems: "center", padding: 10}}>
//       <Text
//         style={{
//           fontSize: 20,
//           color: "#000000",
//           fontFamily: "Poppins-Medium",
//         }}>
//         Delivery time -{" "}
//         {moment(
//           props.status["completed"].time || STATUS["completed"].time,
//         ).format("hh:MM A")}
//       </Text>
//     </Animatable.View>
//   );
// };

const OrderTracker = props => {
  let {header: Header} = props;
  if (props.loading) {
    return <Loader />;
  }
  return (
    <FlatList
      refreshing={false}
      onRefresh={props.onRefresh}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={Object.keys(props.status || STATUS)}
      ListHeaderComponent={Header ? <Header /> : null}
      renderItem={({item, index}) => (
        <RenderStatus
          currentStatus={item}
          data={props.status && props.status[item]}
          key={index}
          end={index === Object.keys(props.status).length - 1}
          currentIndex={index}
          completed={
            props.status[
              Object.keys(props.status)[
                index < Object.keys(props.status).length - 1 ? index + 1 : index
              ]
            ].completed
          }
        />
      )}
    />
  );
};

export default OrderTracker;
