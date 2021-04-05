import React, {Component} from "react";
import {View, StyleSheet, FlatList} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import {
  primaryColor,
  subHeadingColor,
  whiteColor,
} from "../../constants/colors";
import Constants from "../../constants";

import {
  getSubCategoryAction,
  getProductInfoAction,
} from "../../actions/dashboardAction/SubcategoryAction";
import {connect} from "react-redux";
import ProductItem from "../../components/ProductItem";
import {addCartList} from "../../actions/dashboardAction/cartListAction";
import {addWishList} from "../../actions/dashboardAction/getWishListAction";
import TopBar from "../../components/TopBar";
import {strings} from "../../constants/i18n";
class CategoryProductListing extends Component {
  addToCart = item => {
    this.props.addCartList(item);
  };

  addToWishList = item => {
    this.props.addWishList(item);
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <TopBar backEnabled title={strings.product} />
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(0.2),
            backgroundColor: "#6A89CF",
          }}></View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.props.productList[this.props.index].product}
          contentContainerStyle={{
            alignItems: "center",
          }}
          style={{
            flex: 1,
            backgroundColor: "#FBFBFB",
          }}
          numColumns={2}
          renderItem={({item, index}) => (
            <ProductItem
              {...item}
              onAddToCart={this.addToCart}
              onAddToWishList={this.addToWishList}
              index={index}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "center",
    backgroundColor: "#FFF",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBFBFB",
  },

  itemBackground: {
    shadowColor: "#000",
    width: moderateScale(150),
    height: moderateScale(240),
    flexDirection: "column",
    backgroundColor: "#FFF",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    margin: moderateScale(8),
    padding: moderateScale(5),
  },

  shadowView: {
    shadowColor: "#000",
    height: moderateScale(180),
    width: moderateScale(130),
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    alignItems: "center",
    backgroundColor: "white",
    margin: moderateScale(15),
  },
  slideBackground: {},

  swiperViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerView: {
    flex: 0.25,
    justifyContent: "center",
    backgroundColor: "#6A89CF",
    alignItems: "center",
  },
  middleView: {
    backgroundColor: Constants.colors.White,
    borderTopRightRadius: moderateScale(40),
    padding: moderateScale(5),
    borderBottomLeftRadius: moderateScale(30),
    flex: 0.75,
  },
  textInputContainer: {
    flexDirection: "row",
    height: moderateScale(46),
    marginTop: moderateScale(10),
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    borderColor: Constants.colors.border_color,
    borderRadius: moderateScale(23),
    borderWidth: moderateScale(2),
  },
  textInputStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    flex: 1,
    marginLeft: moderateScale(10),
    textAlignVertical: "center",
    paddingLeft: moderateScale(15),
  },
  textStyle: {
    fontSize: moderateScale(16),
    color: Constants.colors.Primary,
    fontFamily: "Roboto-Regular",
  },
  headingText: {
    fontSize: moderateScale(14),
    alignSelf: "flex-start",
    color: Constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },

  title: {
    fontSize: moderateScale(17),
    color: Constants.colors.Black,
    alignContent: "center",

    fontFamily: "Roboto-Regular",
  },

  subHeading: {
    fontSize: moderateScale(32),
    color: Constants.colors.Black,
    fontFamily: "Poppins-SemiBold",
    marginBottom: moderateScale(25),
  },
  bottom_container: {
    height: moderateScale(160),
    justifyContent: "center",
    alignItems: "center",
  },
  passwordTextView: {
    borderBottomWidth: 1,
    borderBottomColor: subHeadingColor,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: moderateScale(14),
    color: primaryColor,
    textAlign: "right",
    lineHeight: moderateScale(40),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Medium",
    color: Constants.colors.White,
  },
  buttonView: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Constants.colors.Primary,
    height: moderateScale(35),
    width: moderateScale(120),
    justifyContent: "center",
    alignItems: "center",
    color: Constants.colors.White,
    borderRadius: moderateScale(30),
  },
  loginText: {
    color: whiteColor,
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
});

const mapStateToProps = state => {
  return {
    productList: state.categoryReducer.categoryData.category,
  };
};
const mapDispatchToProps = {
  getSubCategoryAction,
  getProductInfoAction,
  addCartList,
  addWishList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryProductListing);
