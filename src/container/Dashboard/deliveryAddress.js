import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {strings} from "../../constants/i18n";
import Constants from "../../constants";
import {getProductInfoAction} from "../../actions/dashboardAction/SubcategoryAction";
import {
  getSearchProductAction,
  onCancelData,
} from "../../actions/dashboardAction/SearchAction";
import {moderateScale} from "../../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import RightArrow from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import CheckBox from "react-native-check-box";

class DeliveryAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props && this.props.isChecked,
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            Actions.savedAddress({
              addressType: "shipping",
              isSame: this.state.isChecked,
            })
          }
          style={{
            borderColor: Constants.colors.White,
            backgroundColor: Constants.colors.Primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: moderateScale(50),
            marginHorizontal: moderateScale(5),
            borderWidth: moderateScale(1),
          }}>
          <Text
            style={{
              ...styles.headingText,
              fontSize: moderateScale(16),
              paddingLeft: moderateScale(0),
              alignSelf: "center",
              marginLeft: moderateScale(10),
              marginRight: moderateScale(20),
              color: Constants.colors.White,
            }}>
            {strings.select_delivery_address}
          </Text>

          <RightArrow
            name="ios-arrow-forward"
            size={25}
            color={Constants.colors.White}
          />
        </TouchableOpacity>
        <CheckBox
          style={{padding: moderateScale(10)}}
          onClick={() => {
            this.setState({
              isChecked: !this.state.isChecked,
            });
          }}
          isChecked={this.state.isChecked}
          rightText={strings.delivery_shipping}
        />
        {!this.state.isChecked ? (
          <View>
            <TouchableOpacity
              onPress={() =>
                Actions.savedAddress({
                  addressType: "billing",
                  isSame: this.state.isChecked,
                })
              }
              style={{
                borderColor: Constants.colors.White,
                backgroundColor: Constants.colors.Primary,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: moderateScale(50),
                marginHorizontal: moderateScale(5),
                borderWidth: moderateScale(1),
              }}>
              <Text
                style={{
                  ...styles.headingText,
                  fontSize: moderateScale(16),
                  paddingLeft: moderateScale(0),
                  alignSelf: "center",
                  marginLeft: moderateScale(10),
                  marginRight: moderateScale(20),
                  color: Constants.colors.White,
                }}>
                {strings.select_billing}
              </Text>

              <RightArrow
                name="ios-arrow-forward"
                size={25}
                color={Constants.colors.White}
              />
            </TouchableOpacity>
            {this.renderAddress(this.props && this.props.billingAddress, 0)}
          </View>
        ) : null}

        {this.renderAddress(this.props && this.props.selectedAddress, 1)}
      </View>
    );
  }

  renderAddress = (item, type) => {
    if (!item.first_name) {
      return null;
    }
    return (
      <View>
        <View style={styles.shadowView}>
          <Text style={styles.heading}>
            {type == 1 ? strings.delivery : strings.billing} {strings.address}:
          </Text>
          <Text style={styles.headingText}>
            {`${item.first_name && item.first_name.trim()}, ${item.last_name &&
              item.last_name.trim()}, ${item.address_1 &&
              item.address_1.trim()}, ${item.city &&
              item.state.trim()},${item.country && item.country.trim()}`}
          </Text>
        </View>

        {/* <Text style={styles.headingText}>
          {item.zipcode && item.zipcode.trim()}
        </Text> */}
        {type != 0 ? (
          <TouchableOpacity
            onPress={() => this.props.onNextPress()}
            style={{
              borderColor: Constants.colors.White,
              backgroundColor: Constants.colors.Primary,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: moderateScale(50),
              // marginTop: moderateScale(40),
              marginHorizontal: moderateScale(5),
              borderWidth: moderateScale(1),
            }}>
            <Text
              style={{
                ...styles.headingText,
                fontSize: moderateScale(16),
                paddingLeft: moderateScale(0),
                alignSelf: "center",
                marginLeft: moderateScale(10),
                marginRight: moderateScale(20),
                color: Constants.colors.White,
              }}>
              {strings.delivery_address}
            </Text>

            <RightArrow
              name="ios-arrow-forward"
              size={25}
              color={Constants.colors.White}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.colors.White,
    flex: 1,
    flexDirection: "column",
  },

  headingText: {
    fontSize: moderateScale(14),
    alignSelf: "flex-start",
    color: Constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },
  heading: {
    fontSize: moderateScale(16),
    alignSelf: "flex-start",
    color: Constants.colors.Primary,
    fontFamily: "Poppins-Medium",
  },

  textStyle: {
    fontSize: moderateScale(16),
    color: Constants.colors.Primary,
    fontFamily: "Roboto-Regular",
  },

  itemBackground: {
    shadowColor: "#000",
    height: moderateScale(150),
    flexDirection: "column",
    backgroundColor: "#FFF",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    padding: moderateScale(5),
    margin: moderateScale(10),
  },

  shadowView: {
    shadowColor: "#000",
    minHeight: moderateScale(60),
    flexDirection: "column",
    backgroundColor: "#FFF",
    // marginVertical: moderateScale(30),
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    padding: moderateScale(10),
    margin: moderateScale(10),
  },
  modal: {
    flex: 1,
    backgroundColor: Constants.colors.Primary,
  },
});
const mapStateToProps = state => {
  return {
    loading: state.searchReducer.loading,
    address: state.Address.selectedAddress,
    isChecked: state.Address.isSame,
  };
};
const mapDispatchToProps = {
  getSearchProductAction,
  getProductInfoAction,
  onCancelData,
};
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);
