import React from "react";
import {View, Text, StyleSheet} from "react-native";
import constants from "../../constants";
import {moderateScale} from "../../helper/responsiveFont";
import DeliveryOptions from "./DeliveryOptions";
import OrderView from "./OrderView";
import Button from "../common/Button";
import {strings} from "../../constants/i18n";

const OrderSummery = ({
  amount,
  cartList,
  shippingAddress,
  billingAddress,
  onChangeAddress,
  deliveryType,
  deliveryOptions,
  onChangeDeliveryType,
  confirmOrder,
  loading,
  shippingCharge,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{strings.shipping_to}</Text>
          <Text style={styles.editButton} onPress={onChangeAddress}>
            {strings.edit}
          </Text>
        </View>
        <View>
          <Text style={[styles.smallText, styles.boldText]}>
            {shippingAddress.first_name} {shippingAddress.last_name}
          </Text>
          <Text style={styles.smashippingAddressllText}>
            {shippingAddress.address_1}, {shippingAddress.city} ,
            {shippingAddress.zipcode}
          </Text>
          <Text style={styles.smallText}>
            {strings.contact} {shippingAddress.phone}
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{strings.billing}</Text>
          <Text style={styles.editButton} onPress={onChangeAddress}>
            {strings.edit}
          </Text>
        </View>
        <View>
          <Text style={[styles.smallText, styles.boldText]}>
            {billingAddress.first_name} {billingAddress.last_name}
          </Text>
          <Text style={styles.smashippingAddressllText}>
            {billingAddress.address_1}, {billingAddress.city} ,
            {billingAddress.zipcode}
          </Text>
          <Text style={styles.smallText}>
            {strings.contact}: {billingAddress.phone}
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{strings.yourOrder}:</Text>
        </View>
        <OrderView orderItems={cartList} />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{strings.payment}</Text>
        </View>
        <DeliveryOptions
          options={deliveryOptions}
          deliveryType={deliveryType}
          onChangeDeliveryType={onChangeDeliveryType}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={[styles.headingContainer, styles.costView]}>
          <Text style={styles.lightText}>
            {strings.item_cost} ({cartList.length})
          </Text>
          <Text style={styles.lightText}>
            {strings.aed} {parseFloat(amount.cost).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={[styles.headingContainer, styles.costView]}>
          <Text style={styles.lightText}>{strings.shipping}</Text>
          <Text style={styles.lightText}>
            {strings.aed} {parseFloat(shippingCharge).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={[styles.headingContainer, styles.costView]}>
          <Text style={styles.lightText}>{strings.totalCost}</Text>
          <Text style={styles.lightText}>
            {strings.aed} {parseFloat(amount.totalCost).toFixed(2)}
          </Text>
        </View>
      </View>
      <Button
        title={strings.proceed}
        onPress={confirmOrder}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(50),
  },
  subContainer: {
    marginVertical: moderateScale(5),
    borderColor: constants.colors.fadeBorder,
    borderBottomWidth: 1,
    paddingVertical: moderateScale(5),
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-Regular",
    color: constants.colors.Primary,
  },
  editButton: {
    fontSize: moderateScale(12),
    fontFamily: "Poppins-Regular",
    color: constants.colors.Primary,
  },
  smallText: {
    fontSize: moderateScale(13),
    fontFamily: "Poppins-Regular",
    color: constants.colors.dark,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: moderateScale(15),
  },
  lightText: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-Regular",
    color: constants.colors.gray,
  },
  costView: {paddingHorizontal: moderateScale(20)},
});

export default OrderSummery;
