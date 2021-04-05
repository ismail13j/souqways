import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import constants from "../../constants";
import {moderateScale} from "../../helper/responsiveFont";
import {
  getCouponsListAction,
  deleteCartList,
  addCartList,
  updateCart,
  getCartListAction,
} from "../../actions/dashboardAction/cartListAction";
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import {strings} from "../../constants/i18n";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";
import Header from "../../components/common/Header";
import CartItem from "../../components/common/CartItem";
import Loader from "../../components/common/Loader";
class CartList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: false,
      clickedIndex: -1,
      cartList: [],
      isFetching: false,
      counter: 0,
      disCount: {},
      deleteItem: {},
      productCount: 0,
    };
  }

  static getDerivedStateFromProps(nextProp, prevState) {
    if (prevState.cartList !== nextProp.cartList) {
      return {cartList: nextProp.cartList};
    }
    return null;
  }

  incrementTheCounter = product => {
    this.props.updateCart({
      key: product.key,
      product_id: product.product_id,
      quantity: parseInt(product.quantity) + 1,
    });
  };

  decrementTheCounter = product => {
    this.props.updateCart({
      key: product.key,
      product_id: product.product_id,
      quantity: parseInt(product.quantity) - 1,
    });
  };

  getTotal = cartList => {
    let totalPrice =
      cartList &&
      cartList.reduce((cost, item) => {
        cost = cost + item.line_total * item.quantity;
        return cost;
      }, 0);

    return totalPrice.toFixed(2);
  };

  onRefresh = () => {
    this.props.getCartListAction();
  };

  onDelete = item => {
    Alert.alert("Souqways", strings.alert.delete, [
      {text: strings.commonText.no},
      {
        text: strings.commonText.yes,
        onPress: () => {
          this.props.deleteCartList({
            key: item.key,
            user_id: this.props.userID,
          });
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title={strings.cart} />
        {this.props.loading ? (
          <Loader />
        ) : (
          <View style={{flex: 1}}>
            {this.props.cartList && this.props.cartList.length ? (
              <TouchableOpacity
                style={{
                  height: moderateScale(60),
                  marginTop: moderateScale(10),
                }}
                onPress={() => {
                  Actions.couponsListing({hideDrawer: true});
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: moderateScale(15),
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      ...styles.headingText,
                      fontSize: moderateScale(18),
                      color: constants.colors.Primary,
                    }}>
                    {strings.add_coupon}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <Icon
                      name="pluscircleo"
                      size={25}
                      color={constants.colors.Primary}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}
            {this.props.cartList && this.props.cartList.length ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 0.19,
                  paddingVertical: moderateScale(5),
                  backgroundColor: constants.colors.Primary,
                  alignItems: "center",
                }}>
                <View
                  style={{
                    flex: 0.75,
                    alignItems: "center",
                    paddingLeft: moderateScale(15),
                    justifyContent: "flex-start",
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...styles.headingText,
                      fontSize: moderateScale(16),
                      color: constants.colors.White,
                    }}>
                    {strings.total_item}{" "}
                    {(this.props &&
                      this.props.cartList &&
                      this.props.cartList.length) ||
                      0}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      ...styles.headingText,
                      fontSize: moderateScale(16),
                      color: constants.colors.White,
                    }}>
                    {strings.discount}
                    {this.props.discount && this.props.discount.amount}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      ...styles.headingText,
                      fontSize: moderateScale(16),
                      color: constants.colors.White,
                    }}>
                    {strings.total_price}
                    {strings.aed}{" "}
                    {parseFloat(this.getTotal(this.state.cartList)).toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.3,
                    alignItems: "center",
                  }}>
                  <TouchableOpacity
                    disabled={
                      this.props &&
                      this.props.cartList &&
                      this.props.cartList.length === 0
                    }
                    style={styles.buttonStyle}
                    onPress={() => {
                      Actions.checkout();
                    }}>
                    <Text style={styles.buttonText}>{strings.check_out}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            <View
              style={{
                flex: 1,
                marginTop: moderateScale(2),
              }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={this.props.cartList}
                refreshing={false}
                onRefresh={this.onRefresh}
                renderItem={({item, index}) => (
                  <CartItem
                    item={item}
                    index={index}
                    onIncrement={this.incrementTheCounter}
                    onDecrement={this.decrementTheCounter}
                    onDelete={this.onDelete}
                  />
                )}
                ListEmptyComponent={
                  <ListEmptyComponent
                    loading={this.props.loading}
                    message={strings.empty.cart}
                    // style={{marginTop: constants.BaseStyle.DEVICE_HEIGHT * 0.3}}
                  />
                }
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

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

const mapStateToProps = state => {
  return {
    loading: state.getCartListReducer.loading,
    cartList: state.getCartListReducer.cartList,
    discount: state.getCartListReducer.discount,
    userID: state.loginReducer.loginData.data.ID,
  };
};

const mapDispatchToProps = {
  deleteCartList,
  getCouponsListAction,
  addCartList,
  updateCart,
  getCartListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(CartList);
