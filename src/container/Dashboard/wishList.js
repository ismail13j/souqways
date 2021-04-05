import React, {Component} from "react";
import {View, StyleSheet, FlatList, Alert} from "react-native";
import {strings} from "../../constants/i18n";
import constants from "../../constants";
import {moderateScale} from "../../helper/responsiveFont";
import WishListItem from "../../components/WishListItem";
import {addCartList} from "../../actions/dashboardAction/cartListAction";
import {
  deleteWishList,
  getWishListAction,
} from "../../actions/dashboardAction/getWishListAction";

import {connect} from "react-redux";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";
import Loader from "../../components/common/Loader";
import Header from "../../components/common/Header";
class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      wishList: [],
      isProductAdded: false,
      deleteItem: {},
    };
  }

  getWishList = () => {
    this.props.getWishListAction();
  };

  onDelete = item => {
    Alert.alert("Souqways", strings.alert.delete, [
      {text: strings.commonText.no},
      {
        text: strings.commonText.yes,
        onPress: () => {
          this.props.deleteWishList({
            product_id: item.post_id,
            user_id: this.props.userID,
          });
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title={strings.wishList} />
        <View
          style={{
            flex: 1,
          }}>
          {this.props.loading ? (
            <Loader
              style={{
                position: "absolute",
                height: constants.BaseStyle.DEVICE_HEIGHT * 0.9,
                width: constants.BaseStyle.DEVICE_WIDTH,
                zIndex: 999,
              }}
            />
          ) : null}
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshing={false}
            onRefresh={this.getWishList}
            data={this.props.wishList}
            ListEmptyComponent={
              <ListEmptyComponent
                loading={this.props.loading}
                message={strings.commonText.emptyText}
              />
            }
            renderItem={({item, index}) => {
              return (
                <WishListItem
                  item={item}
                  onAddToCart={() => {
                    if (item.stock_status === "instock") {
                      this.props.addCartList(item, true);
                    }
                  }}
                  onDelete={this.onDelete}
                  index={index}
                />
              );
            }}
            keyExtractor={(item, index) => (item.id + index).toString()}
          />
        </View>
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
  buttonText: {
    fontSize: moderateScale(13),
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
  headingText: {
    fontSize: moderateScale(14),
    alignSelf: "flex-start",
    color: constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },
  buttonStyle: {
    backgroundColor: constants.colors.Primary,
    height: moderateScale(30),
    width: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    color: constants.colors.White,
    borderRadius: moderateScale(15),
  },
  textStyle: {
    fontSize: moderateScale(20),
    color: constants.colors.Primary,
    fontFamily: "Poppins-Regular",
  },
  shadowView: {
    shadowColor: "#000",
    height: moderateScale(139),
    flexDirection: "row",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),

    backgroundColor: "white",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
  },
  flatlistView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
  },
  emptyText: {
    alignSelf: "center",
    fontSize: moderateScale(20),
    color: "#999",
  },
});

const mapStateToProps = state => {
  return {
    loading: state.getWishListReducer.loader,
    wishList: state.getWishListReducer.wishList,
    userID: state.loginReducer.loginData.data.ID,
  };
};
const mapDispatchToProps = {
  deleteWishList,
  addCartList,
  getWishListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
