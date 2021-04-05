import React, {Component} from "react";
import {Router, Stack, Scene} from "react-native-router-flux";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import {primaryColor} from "../constants/colors";
import {strings} from "../constants/i18n";
import {moderateScale} from "../helper/responsiveFont";
import constants from "../constants";

import TopBar from "./../components/TopBar";
import TabView from "./../components/Tab";

import Login from "../container/Auth/Login";
import SignOut from "../container/Auth/SignOut";
import ForgotPassword from "../container/Auth/ForgotPassword";

import ChangePassword from "../container/Auth/ChangePassword";
import EditProfile from "../container/Dashboard/editProfile";
import CategoryProductListing from "../container/Dashboard/categoryProducts";
import ProductDetail from "../container/Dashboard/productDetail";
import RatingsAndReviews from "../container/Dashboard/ratingsAndReviews";
import Category from "../container/Dashboard/category";
import MyOrders from "../container/Dashboard/myOrders";
import SearchScreen from "../container/Dashboard/searchScreen";
import Home from "../container/Dashboard/home";
import SavedAddress from "../container/Dashboard/savedAddress";
import SignUP from "../container/Auth/SignUP";
import myAccount from "../container/Dashboard/myAccount";
import WishList from "../container/Dashboard/wishList";
import Setting from "../container/Dashboard/settings";
import CartList from "../container/Dashboard/cartList";
import CouponsListing from "../container/Dashboard/couponsListing";
import WriteAReview from "../container/Dashboard/writeAReview";
import AddAddress from "../container/Dashboard/addAddress";
import OrderDetails from "../container/Dashboard/orderDetails";
import OrderStatus from "../container/Dashboard/OrderStatus";
import checkout from "../container/Dashboard/checkout";
import Notifications from "../container/Dashboard/Notifications";
import WebViewComponent from "../container/Dashboard/WebViewComponent";
import OrderConfirmation from "../container/Dashboard/OrderConfirmation";

class Route extends Component {
  render() {
    return (
      <Router navigationBarStyle={{backgroundColor: primaryColor}}>
        <Scene key="root" hideNavBar>
          <Stack key="auth" initial={!this.props.isLoggedIn}>
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="forgotPassword" component={ForgotPassword} hideNavBar />
            <Scene key="signout" component={SignOut} hideNavBar />
            <Scene key="signup" component={SignUP} hideNavBar />
          </Stack>
          <Stack
            key="dashboard"
            initial={this.props.isLoggedIn}
            hideNavBar
            hideTabBar>
            <Stack key="tabStack" navBar={data => <TopBar {...data} />}>
              <Scene
                key="dash"
                tabs={true}
                showLabel={false}
                swipeEnabled
                tabBarPosition={"bottom"}
                lazy={true}>
                <Scene
                  key="home"
                  component={Home}
                  title={strings.home}
                  icon={data => (
                    <TabView
                      {...data}
                      activeIcon={constants.Images.Tabs.Active.Home}
                      inActiveIcon={constants.Images.Tabs.InActive.Home}
                    />
                  )}
                  hideNavBar
                />
                <Scene
                  key="category"
                  component={Category}
                  title={strings.category}
                  icon={data => (
                    <TabView
                      {...data}
                      activeIcon={constants.Images.Tabs.Active.Category}
                      inActiveIcon={constants.Images.Tabs.InActive.Category}
                    />
                  )}
                  hideNavBar
                />

                <Scene
                  key="myAccount"
                  component={myAccount}
                  title={strings.account}
                  icon={data => (
                    <TabView
                      {...data}
                      activeIcon={constants.Images.Tabs.Active.MyAccount}
                      inActiveIcon={constants.Images.Tabs.InActive.MyAccount}
                    />
                  )}
                  hideNavBar
                />
                <Scene
                  key="myOrder"
                  component={MyOrders}
                  title={strings.my_order}
                  icon={data => {
                    return (
                      <TabView
                        {...data}
                        activeIcon={() => (
                          <Icon
                            name={"handbag"}
                            color={constants.colors.Primary}
                            size={moderateScale(20)}
                          />
                        )}
                        inActiveIcon={() => (
                          <Icon name={"handbag"} size={moderateScale(20)} />
                        )}
                        renderIcon
                      />
                    );
                  }}
                  hideNavBar
                />
              </Scene>
            </Stack>
            <Scene
              key="couponsListing"
              component={CouponsListing}
              navBar={null}
              title="CartList"
              hideNavBar
            />
            <Scene
              key="notifications"
              component={Notifications}
              navBar={null}
              title="Notifications"
              hideNavBar
            />
            <Scene
              key="settings"
              component={Setting}
              navBar={null}
              title="Wishlist"
              hideNavBar
            />
            <Scene
              key="wishlist"
              component={WishList}
              navBar={null}
              title="Wishlist"
              hideNavBar
            />
            <Scene
              key="productDetail"
              component={ProductDetail}
              navBar={null}
              title="ProductDetail"
              hideNavBar
            />
            <Scene
              key="orderStatus"
              component={OrderStatus}
              title={strings.order_status}
              hideNavBar
              navBar={null}
            />
            <Scene
              key="checkout"
              component={checkout}
              title={strings.order_status}
              hideNavBar
              navBar={null}
            />

            <Scene
              key="categoryProductList"
              component={CategoryProductListing}
              navBar={null}
              title=""
              hideNavBar
            />
            <Scene
              key="searchScreen"
              component={SearchScreen}
              navBar={null}
              title="Search Screen"
              hideNavBar
            />
            <Scene
              key="changePassword"
              component={ChangePassword}
              navBar={null}
              title="Change Password"
              hideNavBar
            />
            <Scene
              key="ratingsAndReviews"
              component={RatingsAndReviews}
              navBar={null}
              title="RATINGS & REVIEWS"
              hideNavBar
            />
            <Scene
              key="writeAReview"
              component={WriteAReview}
              navBar={null}
              title="RATINGS & REVIEWS"
              hideNavBar
            />
            <Scene
              key="savedAddress"
              component={SavedAddress}
              navBar={null}
              title="SAVED ADDRESS"
              hideNavBar
            />
            <Scene
              key="addAddress"
              component={AddAddress}
              navBar={null}
              title="SAVED ADDRESS"
              hideNavBar
            />
            <Scene
              key="cartList"
              component={CartList}
              navBar={null}
              title="CartList"
              hideNavBar
            />
            <Scene
              key="editProfile"
              component={EditProfile}
              navBar={null}
              title="Edit Profile"
              hideNavBar
            />
            <Scene
              key="productDetail"
              component={ProductDetail}
              navBar={null}
              title="ProductDetail"
              hideNavBar
            />
            <Scene
              key="orderDetails"
              component={OrderDetails}
              navBar={null}
              title="CartList"
              hideNavBar
            />
            <Scene
              key="webView"
              component={WebViewComponent}
              navBar={null}
              title="Web View"
              hideNavBar
            />
            <Scene
              key="orderConfirmation"
              component={OrderConfirmation}
              navBar={null}
              title="OrderConfirmation"
              hideNavBar
            />
            <Scene
              key="signOut"
              component={SignOut}
              navBar={null}
              title="Signout"
              hideNavBar
            />
          </Stack>
        </Scene>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isRemind,
    lang: state.appState.lang,
  };
}
export default connect(mapStateToProps, {})(Route);
