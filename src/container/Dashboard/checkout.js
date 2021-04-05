import React, {Component} from "react";
import {View, StyleSheet, ScrollView, Alert} from "react-native";
import {connect} from "react-redux";
import Header from "../../components/common/Header";
import {strings} from "../../constants/i18n";
import constants from "../../constants";
import DeliveryAddress from "./deliveryAddress";
import {
  getPaymentCredentials,
  getSavedAddresses,
} from "../../actions/dashboardAction/Address";
import Loader from "../../components/common/Loader";
import OrderSummery from "../../components/order/OrderSummery";
import StepIndicator from "../../components/order/StepIndicator";
import {createOrder} from "../../actions/dashboardAction/OrderAction";
/* eslint-disable-next-line*/
const deliveryOptions = [
  {id: 0, type: "Standard (14 Days)", price: 10, currency: "AED"},
  {id: 1, type: "Express (7 Days)", price: 20, currency: "AED"},
  {id: 2, type: "Premium (3 Days)", price: 30, currency: "AED"},
];

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      shipping: {},
      deliveryType: 0,
      paymentType: 0,
      billing: {},
      deliveryCost: 0,
      paymentOptions: [
        {
          id: 0,
          type: strings.credit_debit,
          comment: strings.credit_debit_message,
        },
        {
          id: 1,
          type: strings.cod,
          comment: strings.cod_message,
        },
      ],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps && nextProps.selectedAddress) {
      return {
        shipping: nextProps.selectedAddress,
        billing: nextProps.billingAddress,
      };
    }
    if (nextProps && nextProps.billingAddress) {
      return {
        billing: nextProps.billingAddress,
      };
    }
    return null;
  }

  componentDidMount() {
    // this.props.getPaymentCredentials();
    this.props.getSavedAddresses(true);
  }

  changeAddress = shipping => {
    this.setState({shipping});
  };

  handleOrder = () => {
    if (!Object.keys(this.state.shipping).length) {
      Alert.alert("Souqways", "Select Delivery Address");
      return;
    }
    this.setState({currentStep: 1});
  };

  addressChange = () => {
    this.setState({currentStep: 0});
  };

  onChangeDeliveryType = id => {
    this.setState({deliveryType: id});
  };
  onChangePaymentType = id => {
    this.setState({paymentType: id});
  };
  calculateCost = () => {
    const {cartList} = this.props;
    const cost = cartList.reduce((cost, item) => {
      return cost + parseInt(item.line_total) * item.quantity;
    }, 0);
    return {
      cost,
      totalCost: cost + this.state.deliveryCost,
    };
  };

  confirmOrder = () => {
    let finalCost = this.calculateCost();
    const {billing, shipping, paymentType} = this.state;

    let createOrderData = {
      currency: "AED",
      customer_id: shipping.user_id,
      billing,
      shipping,
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: finalCost.cost,
        },
      ],
      payment_method: paymentType == 0 ? "wctelr" : "cod",
      payment_method_title: paymentType == 0 ? "" : "cash on delivery",
    };
    this.props.createOrder(createOrderData);
  };
  renderSteps = currentStep => {
    switch (currentStep) {
      case 0:
        return (
          <DeliveryAddress
            selectedAddress={this.state.shipping}
            billingAddress={this.state.billing}
            onChangeAddress={this.changeAddress}
            onNextPress={this.handleOrder}
          />
        );
      case 1:
        return (
          <OrderSummery
            shippingAddress={this.state.shipping}
            billingAddress={this.state.billing}
            onChangeAddress={this.addressChange}
            deliveryOptions={this.state.paymentOptions}
            deliveryType={this.state.paymentType}
            onChangeDeliveryType={this.onChangePaymentType}
            cartList={this.props.cartList}
            amount={this.calculateCost()}
            confirmOrder={this.confirmOrder}
            loading={this.props.checkoutLoader}
            shippingCharge={this.state.deliveryCost}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          iconColor={constants.colors.Primary}
          title={strings.check_out}
          headerContainerStyle={styles.headerContainerStyle}
        />
        <StepIndicator step={this.state.currentStep} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          {this.props.loading ? (
            <Loader />
          ) : (
            this.renderSteps(this.state.currentStep)
          )}
        </ScrollView>
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

const mapStateToProps = state => ({
  selectedAddress: state.Address.selectedAddress,
  loading: state.Address.loading,
  billingAddress: state.Address.billingAddress,
  cartList: state.getCartListReducer.cartList,
  checkoutLoader: state.orderReducer.loading,
});

const mapDispatchToProps = {
  getPaymentCredentials,
  getSavedAddresses,
  createOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
