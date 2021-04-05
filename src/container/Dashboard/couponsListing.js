import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Constants from "../../constants";
import {
  discountValue,
  getCouponsListAction,
} from "../../actions/dashboardAction/cartListAction";
import {moderateScale} from "../../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import COUPON from "react-native-vector-icons/MaterialCommunityIcons";
import {connect} from "react-redux";
import {strings} from "../../constants/i18n";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";
import Header from "../../components/common/Header";
class CouponsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getCouponsListAction();
  }
  refreshing = () => {
    this.props.getCouponsListAction();
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={strings.coupons} />
           <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          refreshing={this.props.loading}
          data={this.props.couponList}
          ListEmptyComponent={
            <ListEmptyComponent message={strings.empty.coupon} />
          }
          renderItem={item => this.renderOrderItem(item)}
          onRefresh={this.refreshing}
        />
      </SafeAreaView>
    );
  }

  renderOrderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.discountValue(item);
          Actions.pop();
        }}
        style={styles.shadowView}
        key={index}>
        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
          }}>
          <View
            style={{
              backgroundColor: "#fff",
              height: moderateScale(100),
              width: moderateScale(100),
              borderRadius: moderateScale(50),
              justifyContent: "center",
              alignItems: "center",
            }}>
            <COUPON
              name="wallet-giftcard"
              size={60}
              color={Constants.colors.Primary}></COUPON>
          </View>
        </View>

        <View
          style={{
            flex: 0.7,
            padding: moderateScale(5),
            marginLeft: moderateScale(20),
            justifyContent: "center",
            flexDirection: "column",
          }}>
          <View
            style={{
              flexDirection: "row",
              height: moderateScale(40),
            }}>
            <Text
              style={{
                ...styles.headingText,
                fontSize: moderateScale(30),
                color: Constants.colors.Yellow,
              }}>
              {item.amount}
              {"%"}
            </Text>
            <Text
              style={{
                ...styles.headingText,
                marginLeft: moderateScale(5),
                alignSelf: "flex-end",
              }}>
              {"Discount"}
            </Text>
          </View>
          <Text
            style={{
              ...styles.headingText,
              color: Constants.colors.Primary,
              fontSize: moderateScale(16),
            }}>
            {item.description}
          </Text>
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
              {`Valid until:${item.expiry_date}`}
            </Text>
            <Text
              style={{
                ...styles.headingText,
                fontSize: moderateScale(13),
              }}></Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    flexDirection: "column",
  },
  headingText: {
    fontSize: moderateScale(14),
    alignSelf: "flex-start",
    color: Constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },
  textStyle: {
    fontSize: moderateScale(20),
    color: Constants.colors.Primary,
    fontFamily: "Poppins-Regular",
  },

  shadowView: {
    height: moderateScale(149),
    flexDirection: "row",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    borderColor: Constants.colors.Primary,
    margin: moderateScale(15),
    borderStyle: "dashed",
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    backgroundColor: "#EBE9E9",
    elevation: 5,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.getCartListReducer.loading,
    couponList: state.getCartListReducer.couponList,
  };
};
const mapDispatchToProps = {discountValue, getCouponsListAction};

export default connect(mapStateToProps, mapDispatchToProps)(CouponsListing);
