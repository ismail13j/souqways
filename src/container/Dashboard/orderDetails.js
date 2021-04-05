import React, {Component} from "react";
import {View, Text, ScrollView, StyleSheet, Image, Alert} from "react-native";
import {connect} from "react-redux";
import {strings} from "../../constants/i18n";
import constants from "../../constants";
import Header from "../../components/common/Header";
import {moderateScale} from "../../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import OrderTracker from "../../components/common/OrderTracker";
import {
  getOrderStatus,
  cancelOrder,
} from "../../actions/dashboardAction/OrderAction";
import Button from "../../components/common/Button";
class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStatus: false,
    };
  }
  componentDidMount() {
    this.getOrderStatus();
  }

  getOrderStatus = () => {
    let {
      product: {
        item: {order_id, product_id},
      },
    } = this.props;
    this.props.getOrderStatus(order_id, product_id);
  };

  handleSearch = () => {
    Actions.searchScreen();
  };

  onCancel = item => {
    Alert.alert("Souqways", strings.alert.order, [
      {
        text: strings.commonText.no,
      },
      {
        text: strings.commonText.yes,
        onPress: () =>
          this.props.cancelOrder({
            order_id: item.order_id,
            product_id: item.product_id,
          }),
      },
    ]);
  };

  render() {
    const {
      product: {item},
    } = this.props;
    const currentOrder =
      this.props &&
      this.props.orders &&
      this.props.orders.find(i => i.order_id === item.order_id);
    const {
      name,
      order_id,
      total,
      currency,
      status,
      quantity,
      shipping_detail,
      description,
      product_image: [imageUrl],
    } = currentOrder;
    return (
      <View style={styles.container}>
        <Header
          iconColor={constants.colors.Primary}
          title={strings.order_detail}
          headerContainerStyle={styles.headerContainerStyle}
          // RightComponent={<RightComponent onPress={this.handleSearch} />}
        />
        <OrderTracker
          loading={this.props.loader}
          status={this.props.orderStatus.status}
          onRefresh={this.getOrderStatus}
          header={() => (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <View
                  style={[
                    styles.alignInRow,
                    styles.borderBottom,
                    {
                      paddingHorizontal: moderateScale(20),
                      paddingBottom: moderateScale(30),
                    },
                  ]}>
                  <View style={styles.productImageWrapper}>
                    <Image
                      source={{uri: imageUrl}}
                      style={styles.productImageStyle}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.textWrapper}>
                    <View style={styles.alignInRow}>
                      <Text style={styles.largeTextStyle}>
                        {strings.order_id + " -"}
                      </Text>
                      <Text style={styles.largeTextStyle}>{order_id}</Text>
                    </View>
                    <Text
                      style={{
                        ...styles.smallTextStyle,
                        textAlign: "justify",
                        fontWeight: "500",
                      }}>
                      {name}
                    </Text>
                    <View style={styles.alignInRow}>
                      <Text
                        style={{
                          ...styles.smallTextStyle,
                          color: constants.colors.gray,
                        }}>
                        {strings.seller_name}
                      </Text>
                      <Text
                        style={{
                          ...styles.smallTextStyle,
                          textAlign: "justify",
                          fontWeight: "500",
                        }}>
                        {":  " +
                          shipping_detail.first_name.toUpperCase() +
                          " " +
                          shipping_detail.last_name.toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.alignInRow}>
                      <Text
                        style={{
                          ...styles.smallTextStyle,
                          color: constants.colors.gray,
                        }}>
                        {strings.quantity}
                      </Text>
                      <Text
                        style={{...styles.smallTextStyle, fontWeight: "500"}}>
                        {":  " + quantity}
                      </Text>
                    </View>
                    <View style={styles.alignInRow}>
                      <Text
                        style={{
                          ...styles.smallTextStyle,
                          color: constants.colors.gray,
                        }}>
                        {strings.price}
                      </Text>
                      <Text
                        style={{...styles.smallTextStyle, fontWeight: "500"}}>
                        {currency + " " + total + "    "}
                      </Text>
                      <View
                        style={[
                          styles.greenDot,
                          {
                            backgroundColor:
                              status === "rejected" ||
                              status === "cancelled" ||
                              status === "failed"
                                ? "#ff0000"
                                : status === "pending" || status === "refunded"
                                ? "#fe8400"
                                : status === "on-hold"
                                ? "#5677fc"
                                : "#4BCA13",
                          },
                        ]}></View>
                      <Text
                        style={{
                          ...styles.smallTextStyle,
                          color:
                            status === "rejected" ||
                            status === "cancelled" ||
                            status === "failed"
                              ? "#ff0000"
                              : status === "pending" || status === "refunded"
                              ? "#fe8400"
                              : status === "on-hold"
                              ? "#5677fc"
                              : "#4BCA13",
                          fontWeight: "bold",
                          paddingLeft: moderateScale(5),
                        }}>
                        {strings.orderStatus[status]}
                      </Text>
                    </View>
                    {status == "pending" ||
                    status == "on-hold" ||
                    status == "processing" ? (
                      <Button
                        loading={this.props.loader}
                        loaderColor={constants.colors.pureRed}
                        title={strings.cancel}
                        style={{
                          backgroundColor: constants.colors.White,
                          borderWidth: 1,
                          borderColor: constants.colors.pureRed,
                          height: moderateScale(30),
                          width: moderateScale(100),
                          justifyContent: "center",
                          alignItem: "center",
                        }}
                        inputStyle={{color: constants.colors.pureRed}}
                        hideArrow
                        onPress={() => this.onCancel(item)}
                      />
                    ) : null}
                  </View>
                </View>
                <View style={styles.shippingAndSummaryDetailWrapper}>
                  <View style={styles.shippingDetailWrapper}>
                    <Text style={styles.largeTextStyle}>
                      {strings.shipping_detail}
                    </Text>
                    <Text
                      style={{
                        ...styles.smallTextStyle,
                        textAlign: "justify",
                        fontWeight: "500",
                      }}>
                      {shipping_detail.first_name.toUpperCase() +
                        " " +
                        shipping_detail.last_name.toUpperCase()}
                    </Text>
                    <Text style={styles.smallTextStyle}>
                      {shipping_detail.address_1 +
                        ", " +
                        shipping_detail.city +
                        ", " +
                        +shipping_detail.country}
                    </Text>
                  </View>

                  <View style={styles.summaryWrapper}>
                    <Text style={styles.largeTextStyle}>{strings.summary}</Text>
                    <Text style={styles.smallTextStyle}>{description}</Text>
                  </View>
                </View>
                <View style={styles.shippingAndSummaryDetailWrapper}>
                  <Text style={styles.largeTextStyle}>
                    {strings.shipping_detail}
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.White,
  },
  headerContainerStyle: {
    borderBottomColor: constants.colors.lightGrey,
    borderBottomWidth: 2,
  },
  content: {
    marginTop: moderateScale(20),
  },
  alignInRow: {
    flexDirection: "row",
  },
  productImageWrapper: {
    flex: 0.3,
  },
  textWrapper: {
    flex: 0.7,
    paddingLeft: moderateScale(20),
  },
  productImageStyle: {
    height: moderateScale(90),
    width: moderateScale(90),
  },
  greenDot: {
    backgroundColor: "#4BCA13",
    height: moderateScale(10),
    width: moderateScale(10),
    alignSelf: "center",
    borderRadius: moderateScale(5),
  },
  largeTextStyle: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-Regular",
    color: constants.colors.Primary,
  },
  mediumTextStyle: {
    fontSize: moderateScale(15),
    fontFamily: "Poppins-Regular",
    color: constants.colors.Primary,
  },
  smallTextStyle: {
    fontSize: moderateScale(13),
    fontFamily: "Poppins-Regular",
    color: constants.colors.dark,
  },
  borderBottom: {
    borderBottomWidth: moderateScale(4),
    borderBottomColor: constants.colors.lightGrey,
  },
  shippingAndSummaryDetailWrapper: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  shippingDetailWrapper: {
    paddingBottom: moderateScale(20),
    marginBottom: moderateScale(20),
    borderBottomColor: constants.colors.lightGrey,
    borderBottomWidth: 3,
  },
});
const mapStateToProps = state => ({
  orderStatus: state.orderReducer.orderStatus,
  loader: state.orderReducer.loading,
  orders: state.orderReducer.orderList,
});

const mapDispatchToProps = {getOrderStatus, cancelOrder};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
