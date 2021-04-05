import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import Header from "../../components/common/Header";
import constants from "../../constants";
import {strings} from "../../constants/i18n";
import OrderTracker from "../../components/common/OrderTracker";
import {connect} from "react-redux";
class OrderStatus extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          iconColor={constants.colors.Primary}
          title={strings.order_detail}
          headerContainerStyle={styles.headerContainerStyle}
        />
        <OrderTracker
          visible={true}
          status={{
            placed: {
              time: "2019-12-08T13:00:09.200Z",
              title: "Order Placed",
              message:
                " We have received your orderWe have received your orderWe have received your order ",
              completed: true,
            },
            confirmed: {
              time: "2019-12-09T05:15:09.200Z",
              title: "Order Confirmed",
              message: "Your order has been confirmed",
              completed: true,
            },
            processed: {
              time: "2019-12-11T09:00:09.200Z",
              title: "Order Processed",
              message: "We are preparing your order",
              completed: true,
            },
            completed: {
              time: "2019-12-13T13:00:09.200Z",
              title: "Order Completed",
              message: "Your order is on way",
              completed: true,
            },
            delivered: {
              time: "2019-12-14T14:00:09.200Z",
              title: "Order Delivered",
              message: "Enjoy your product",
              completed: false,
            },
            return: {
              time: "2019-12-14T14:00:09.200Z",
              title: "Return Request",
              message: "Enjoy your product",
              completed: false,
            },
          }}
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
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);
