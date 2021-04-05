import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import {strings} from "../../constants/i18n";
import Constants from "../../constants";
import {getOrderAction} from "../../actions/dashboardAction/OrderAction";
import {moderateScale} from "../../helper/responsiveFont";

import {Actions} from "react-native-router-flux";

import {connect} from "react-redux";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getOrderAction();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.props.orderList}
          renderItem={item => this.renderOrderItem(item)}
          refreshing={this.props.loading}
          onRefresh={() => this.props.getOrderAction()}
          ListEmptyComponent={
            <ListEmptyComponent message={strings.empty.order} />
          }
        />
      </View>
    );
  }

  renderOrderItem = item => {
    return (
      <TouchableOpacity
        style={styles.shadowView}
        onPress={() => Actions.orderDetails({product: item})}>
        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
          }}>
          <Image
            style={{
              flex: 1,
              height: moderateScale(90),
              width: moderateScale(90),
            }}
            resizeMode="contain"
            source={{
              uri: item.item.product_image && item.item.product_image[0],
            }}
          />
        </View>

        <View
          style={{
            flex: 0.7,
            padding: moderateScale(5),
            justifyContent: "center",
            flexDirection: "column",
          }}>
          <Text style={styles.headingText}>{item.item.name}</Text>

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
              {" "}
              {strings.quantity}:{" "}
            </Text>
            <Text
              style={{
                ...styles.headingText,
                fontSize: moderateScale(13),
              }}>
              {item.item.quantity}
            </Text>
          </View>
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
                {" "}
                {strings.price}:{" "}
              </Text>
              <Text
                style={{
                  ...styles.headingText,
                  fontSize: moderateScale(13),
                }}>
                {strings.aed} {item.item.total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}>
              <View
                style={{
                  backgroundColor:
                    item.item.status === "rejected" ||
                    item.item.status === "cancelled" ||
                    item.item.status === "failed"
                      ? "#ff0000"
                      : item.item.status === "pending" ||
                        item.item.status === "refunded"
                      ? "#fe8400"
                      : item.item.status === "on-hold"
                      ? "#5677fc"
                      : "#4BCA13",
                  height: moderateScale(10),
                  width: moderateScale(10),
                  alignSelf: "center",
                  borderRadius: moderateScale(5),
                }}></View>
              <Text
                style={{
                  ...styles.headingText,
                  color:
                    item.item.status === "rejected" ||
                    item.item.status === "cancelled" ||
                    item.item.status === "failed"
                      ? "#ff0000"
                      : item.item.status === "pending" ||
                        item.item.status === "refunded"
                      ? "#fe8400"
                      : item.item.status === "on-hold"
                      ? "#5677fc"
                      : "#4BCA13",
                  fontSize: moderateScale(13),
                  marginLeft: moderateScale(6),
                }}>
                {strings.orderStatus[item.item.status]}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.colors.White,
    flex: 1,
    flexDirection: "column",
  },
  textStyle: {
    fontSize: moderateScale(16),
    color: Constants.colors.Primary,
    fontFamily: "Roboto-Regular",
    paddingRight: moderateScale(20),
  },
  headingText: {
    fontSize: moderateScale(14),
    alignSelf: "flex-start",
    color: Constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },
  shadowView: {
    shadowColor: "#000",
    height: moderateScale(140),
    flexDirection: "row",
    padding: moderateScale(10),
    backgroundColor: "white",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.orderReducer.loading,
    orderList: state.orderReducer.orderList,
  };
};
const mapDispatchToProps = {getOrderAction};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
