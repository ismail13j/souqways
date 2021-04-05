import React, {useEffect} from "react";
import {View, Image} from "react-native";
import constants from "../../constants";
import Header from "../../components/common/Header";
import {moderateScale} from "../../helper/responsiveFont";
import OrderTracker from "../../components/common/OrderTracker";
import {getOrderStatus} from "../../actions/dashboardAction/OrderAction";
import {strings} from "../../constants/i18n";
import {useSelector, useDispatch} from "react-redux";
import {Actions} from "react-native-router-flux";
import Loader from "../../components/common/Loader";
const OrderConfirmation = props => {
  let dispatch = useDispatch();

  let loader = useSelector(state => state.orderReducer.loading);
  let orderStatus = useSelector(state => state.orderReducer.orderStatus);
  useEffect(() => {
    dispatch(getOrderStatus(props.order_id, props.product_id));
  }, []);
  return (
    <View style={{backgroundColor: constants.colors.White, flex: 1}}>
      <Header
        onBackPress={() =>
          props.onBackPress ? props.onBackPress() : Actions.reset("dashboard")
        }
        title={strings.order_status}
      />
      {loader ? (
        <Loader />
      ) : (
        <OrderTracker
          onRefresh={() =>
            dispatch(getOrderStatus(props.order_id, props.product_id))
          }
          loading={loader}
          status={orderStatus.status}
          header={() => (
            <View
              style={{
                backgroundColor: props.success
                  ? constants.colors.Primary
                  : constants.colors.pureRed,
                margin: moderateScale(20),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: moderateScale(15),
                minHeight: moderateScale(300),
                width: constants.BaseStyle.DEVICE_WIDTH - moderateScale(40),
              }}>
              <Image
                source={
                  props.success
                    ? constants.Images.layer
                    : constants.Images.cancel
                }
              />
              <View style={{position: "absolute"}}>
                <Image
                  source={
                    props.success
                      ? constants.Images.checked
                      : constants.Images.cancel
                  }
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default OrderConfirmation;
