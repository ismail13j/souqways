import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import {
  primaryColor,
  subHeadingColor,
  whiteColor,
} from "../../constants/colors";
import {Actions} from "react-native-router-flux";
import Constants from "../../constants";
import {
  getCategoryAction,
  getClothAction,
} from "../../actions/dashboardAction/CategoryAction";
import ProductItem from "../../components/ProductItem";
import {connect} from "react-redux";
import _ from "lodash";
import Swiper from "react-native-swiper";
import {strings} from "../../constants/i18n";
import Loader from "../../components/common/Loader";
import {
  getCartListAction,
  addCartList,
} from "../../actions/dashboardAction/cartListAction";
import {
  getWishListAction,
  addWishList,
} from "../../actions/dashboardAction/getWishListAction";
class Home extends Component {
  constructor(props) {
    super(props);
    // StatusBarIOS.
    StatusBar.setBarStyle("dark-content", true);
    // StatusBar.setBackgroundColor(Constants.colors.Primary, true);
    this.state = {
      clickedIndex: -1,
      pageNo: 1,
      pageProductNo: 1,
    };
  }

  componentDidMount() {
    this.getProductsAction();
    this.props.getClothAction();
    this.props.getCartListAction(true);
    this.props.getWishListAction(true);
  }

  getProductsAction = () => {
    this.props.getCategoryAction(this.state.pageProductNo);
  };

  onEndReachedDayProducts = () => {
    this.getProductsAction();
  };

  addToCart = item => {
    this.props.addCartList(item);
  };

  addToWishList = item => {
    this.props.addWishList(item);
  };

  onCategoryEndReached = _.debounce(() => {
    let {
      categoryData: {nextPage, current_page},
    } = this.props;
    if (current_page < nextPage) this.props.getClothAction(nextPage);
  }, 1000);

  onCategoryRefresh = () => {
    this.props.getClothAction(1);
  };

  render() {
    const {loading} = this.props;
    if (loading) {
      return <Loader />;
    }
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "white",
        }}>
        {/* <StatusBar backgroundColor="blue" barStyle="light-content" /> */}
        <View style={styles.mainContainer}>
          <View></View>
          <View
            style={{
              flexDirection: "row",
              height: moderateScale(55),
              alignItems: "center",
              paddingLeft: moderateScale(10),
              paddingRight: moderateScale(10),
              backgroundColor: "#fff",
            }}>
            <View
              style={{
                flex: 0.2,
              }}>
              <Image source={require("../../assets/icon/ic_location.png")} />
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "flex-start",
                marginRight: moderateScale(6),
              }}>
              <Text style={styles.textStyle}>
                {!this.props.profileResponse
                  ? "Nothing found!"
                  : this.props.profileResponse.address}
              </Text>
            </View>
            <TouchableOpacity
              style={{...styles.buttonStyle, flex: 0.3}}
              onPress={() => {
                Actions.editProfile();
              }}>
              <Text style={styles.buttonText}>{strings.change}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: moderateScale(240),
            }}>
            <Swiper
              style={styles.slideBackground}
              autoplay={true}
              showsButtons={true}>
              {this.props.bannerlist &&
                this.props.bannerlist.map((item, key) => (
                  <View style={styles.swiperViewStyle} key={key}>
                    <Image
                      style={{
                        flex: 1,
                        height: "100%",
                        width: "100%",
                        backgroundColor: item && item.color,
                      }}
                      resizeMode="cover"
                      source={{
                        uri: item && item.params.bg.image,
                      }}
                    />
                    <Text
                      style={{
                        ...styles.headingText,
                        alignContent: "flex-start",
                        alignSelf: "flex-start",
                        margin: moderateScale(10),
                        position: "absolute",
                      }}>
                      {item.description}
                    </Text>
                  </View>
                ))}
            </Swiper>
          </View>

          <Text style={{...styles.headingText, margin: moderateScale(5)}}>
            {strings.deal_of_day}
          </Text>

          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            keyExtractor={item => item.post_id && item.post_id.toString()}
            data={this.props.dealOfDayList}
            // onEndReached={this.onEndReachedDayProducts}
            // onEndReachedThreshold={10}
            style={{
              marginTop: moderateScale(5),
            }}
            refreshing={false}
            renderItem={({item, index}) => {
              return (
                <ProductItem
                  {...item}
                  onAddToCart={this.addToCart}
                  onAddToWishList={this.addToWishList}
                  index={index}
                />
              );
            }}
          />

          <View
            style={{
              height: moderateScale(250),
            }}>
            <Text style={{...styles.headingText, margin: moderateScale(5)}}>
              {strings.shop_by_categories}
            </Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => Math.random()}
              horizontal={true}
              data={this.props.categoryData.category}
              style={{
                backgroundColor: "#fff",
                marginTop: moderateScale(5),
                height: moderateScale(500),
              }}
              refreshing={false}
              onEndReachedThreshold={1}
              onEndReached={this.onCategoryEndReached}
              renderItem={this.renderCategoryItemView}
              onRefresh={this.onCategoryRefresh}
            />
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={this.props.categoryData.category}
            keyExtractor={() => Math.random()}
            // onEndReachedThreshold={0.8}
            // onEndReached={this.onCategoryEndReached}
            renderItem={({item, index}) => {
              if (index >= 5) return null;
              return (
                <View
                  key={index}
                  style={{
                    height: moderateScale(310),
                  }}>
                  <Text
                    style={{...styles.headingText, margin: moderateScale(5)}}>
                    {item &&
                      item.category &&
                      item.category[0] &&
                      item.category[0].cat_name}
                  </Text>

                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    data={item && item.product}
                    keyExtractor={item => item.post_id.toString()}
                    style={{
                      backgroundColor: "#fff",
                      marginTop: moderateScale(5),
                    }}
                    renderItem={({item, index}) => {
                      return (
                        <ProductItem
                          {...item}
                          onAddToCart={this.addToCart}
                          onAddToWishList={this.addToWishList}
                          key={index}
                        />
                      );
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    );
  }

  renderCategoryItemView = ({item, index}) => {
    if (index >= 5 && item.category[0].categories_name === "Uncategorized")
      return null;
    return (
      <TouchableOpacity
        onPress={() => {
          this.openCategoryDetail(index, item.category[0].categories_name);
        }}>
        <View style={[styles.shadowView]}>
          <View
            style={{
              height: moderateScale(100),
              width: moderateScale(100),
            }}>
            <Image
              resizeMode="contain"
              source={{uri: item.category[0].category_image}}
              style={{flex: 1}}
            />
          </View>
          <Text
            numberOfLines={2}
            style={{
              ...styles.textStyle,
              marginTop: moderateScale(5),
              textAlign: "center",
            }}>
            {item.category[0].name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  openCategoryDetail = _.debounce((index, screenTitle) => {
    Actions.categoryProductList({index, screenTitle});
  }, 50);
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  slideBackground: {},

  swiperViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    padding: moderateScale(5),
    margin: moderateScale(10),
  },

  shadowView: {
    shadowColor: "#000",
    width: moderateScale(150),
    height: moderateScale(160),
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    padding: moderateScale(5),
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: moderateScale(7),
    margin: moderateScale(15),
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
    color: Constants.colors.Black,
    fontFamily: "Roboto-Regular",
  },
  headingText: {
    fontSize: moderateScale(17),
    color: Constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },

  welcomeHeader: {
    fontSize: moderateScale(17),
    color: Constants.colors.Black,
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
    loading:
      state.categoryReducer.loading || state.categoryReducer.subCategoryLoader,
    bannerlist: state.categoryReducer.bannerList,
    categoryData: state.categoryReducer.categoryData,
    dealOfDayList: state.categoryReducer.dealOfDayList,
    profileResponse: state.loginReducer.userData.data,
  };
};
const mapDispatchToProps = {
  getCategoryAction,
  getClothAction,
  getCartListAction,
  getWishListAction,
  addCartList,
  addWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
