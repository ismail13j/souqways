import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {strings} from "../../constants/i18n";
import ImageViewer from "react-native-image-zoom-viewer";

import {AirbnbRating} from "react-native-ratings";
import {moderateScale} from "../../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import Swiper from "react-native-swiper";
import Constants from "../../constants";
import Icon from "react-native-vector-icons/AntDesign";
import RightArrow from "react-native-vector-icons/Ionicons";

import {addCartList} from "../../actions/dashboardAction/cartListAction";
import {getRatingsAndReviews} from "../../actions/dashboardAction/RatingsAndReviewsAction";

import {
  addWishList,
  deleteWishList,
} from "../../actions/dashboardAction/getWishListAction";

import {connect} from "react-redux";
import Modal from "react-native-modal";
import Header from "../../components/common/Header";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      isProductAdded: false,
      isCountUpdated: false,
      isModalVisible: false,
      product: this.props && this.props.product,
    };
  }

  incrementTheCounter = () => {
    this.setState({counter: this.state.counter + 1});
  };

  decrementTheCounter = () => {
    if (this.state.counter > 1) {
      this.setState({counter: this.state.counter - 1});
    }
  };
  showRatingsAndReviews = productData => {
    const {post_id} = productData;
    this.props.getRatingsAndReviews(post_id);
    Actions.ratingsAndReviews({productData});
  };
  render() {
    let {product} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header title={strings.product_detail} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}>
          <TouchableOpacity style={styles.viewer_container}>
            <Swiper
              style={styles.slideBackground}
              autoplay={false}
              showsButtons={false}>
              {product.image &&
                product.image.galleryImg &&
                product.image.galleryImg.map((item, key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.swiperViewStyle}
                    onPress={() => {
                      this.setState({isModalVisible: true});
                    }}>
                    <Image
                      style={{
                        flex: 1,
                        height: "100%",
                        width: "100%",
                        backgroundColor: "white",
                      }}
                      resizeMode="contain"
                      source={{
                        uri: item,
                      }}
                    />
                  </TouchableOpacity>
                ))}
            </Swiper>
          </TouchableOpacity>

          <View>
            <View style={styles.detail_container}>
              <Text style={styles.headingText}>{product.post_name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View style={{flexDirection: "row", flex: 0.4}}>
                  <Text
                    style={{
                      ...styles.headingText,
                      fontSize: moderateScale(16),
                      color: Constants.colors.gray,
                    }}>
                    {"Brand:"}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...styles.headingText,
                      fontSize: moderateScale(16),
                    }}>
                    {product.brand && product.brand[0].name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.showRatingsAndReviews(product)}
                style={{
                  borderColor: "gray",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: moderateScale(40),
                  borderWidth: moderateScale(1),
                }}>
                <AirbnbRating
                  size={15}
                  // onFinishRating={() => this.showRatingsAndReviews(product)}
                  isDisabled={true}
                  showRating={false}
                  defaultRating={product.average_rating}
                />

                <Text
                  style={{
                    ...styles.headingText,
                    fontSize: moderateScale(16),
                    paddingLeft: moderateScale(0),
                    alignSelf: "center",
                    marginLeft: moderateScale(10),
                    marginRight: moderateScale(20),

                    color: Constants.colors.gray,
                  }}>
                  {`( ${product.review_count || 0}  ${strings.review})`}
                </Text>

                <RightArrow
                  name="ios-arrow-forward"
                  size={25}
                  color={Constants.colors.Primary}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: moderateScale(1),

                backgroundColor: Constants.colors.gray,
              }}></View>

            <View style={styles.cart_container}>
              <View
                style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View
                  style={{
                    flexDirection: "row",
                  }}>
                  <Text
                    style={{
                      ...styles.headingText,
                      fontSize: moderateScale(16),
                      color: Constants.colors.gray,
                    }}>
                    {strings.status}
                  </Text>
                  <Text
                    style={{
                      ...styles.headingText,
                      fontSize: moderateScale(16),
                      color: "green",
                    }}>
                    {product.stock_status}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    margin: moderateScale(5),
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      marginRight: moderateScale(8),
                    }}
                    disabled={product.cart_status || this.state.counter <= 1}
                    onPress={() => {
                      this.decrementTheCounter();
                    }}>
                    <Icon
                      name="minuscircleo"
                      size={23}
                      color={
                        product.cart_status || this.state.counter <= 1
                          ? "grey"
                          : "red"
                      }
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: moderateScale(20),
                    }}>
                    <Text
                      style={{
                        color: Constants.colors.Black,
                        textAlign: "center",
                        fontFamily: "Poppins-Medium",

                        fontSize: moderateScale(16),
                      }}>
                      {this.state.counter}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      marginLeft: moderateScale(8),
                    }}
                    disabled={product.cart_status}
                    onPress={() => {
                      this.incrementTheCounter();
                    }}>
                    <Icon
                      name="pluscircleo"
                      size={23}
                      color={product.cart_status ? "grey" : "green"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}>
                <Text
                  style={{
                    ...styles.headingText,
                    fontSize: moderateScale(16),
                    color: Constants.colors.gray,
                  }}>
                  {strings.price}
                </Text>
                <Text
                  style={{
                    ...styles.headingText,
                    fontSize: moderateScale(16),
                  }}>
                  {product.price}
                </Text>
              </View>

              <Text
                style={{
                  ...styles.headingText,
                  fontSize: moderateScale(15),
                  color: Constants.colors.gray,
                  marginTop: moderateScale(2),
                }}>
                {product.description}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                }}>
                <View style={styles.buttonView}>
                  {product.cart_status ? (
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() => {
                        Actions.cartList();
                      }}>
                      {this.props.loading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.buttonText}>{strings.go_cart}</Text>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() => {
                        this.props.addCartList({
                          ...product,
                          quantity: this.state.counter,
                        });
                        this.setState(
                          {
                            product: {
                              ...product,
                              cart_status: !product.cart_status,
                            },
                          },
                          () => Actions.cartList(),
                        );
                      }}>
                      {this.props.loading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.buttonText}>
                          {strings.add_cart}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    alignContent: "center",
                    alignSelf: "center",
                    marginTop: moderateScale(20),
                    marginLeft: moderateScale(8),
                  }}
                  onPress={() => {
                    if (product.wishlist_status) {
                      this.setState(
                        {
                          product: {
                            ...product,
                            wishlist_status: !product.wishlist_status,
                          },
                        },
                        () => {
                          this.props.deleteWishList({
                            product_id: product.post_id,
                          });
                        },
                      );
                    } else {
                      this.setState(
                        {
                          product: {
                            ...product,
                            wishlist_status: !product.wishlist_status,
                          },
                        },
                        () => {
                          this.props.addWishList({
                            ...product,
                            quantity: 1,
                          });
                        },
                      );
                    }
                  }}>
                  {product.wishlist_status ? (
                    <Icon name="heart" size={30} color="red" />
                  ) : (
                    <Icon name="hearto" size={30} color="red" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {this.props.wishloading ? (
          <View
            style={{
              size: "large",
              alignSelf: "center",
              marginTop: Dimensions.get("window").height / 2,
              position: "absolute",
            }}>
            <ActivityIndicator size="large" color={Constants.colors.Primary} />
          </View>
        ) : null}
        {this.renderModal()}
      </SafeAreaView>
    );
  }

  renderModal = () => {
    let {product} = this.props;

    let images =
      product.image &&
      product.image.galleryImg &&
      product.image.galleryImg.reduce((images, item) => {
        images.push({
          url: item,
        });
        return images;
      }, []);
    return (
      <Modal
        animationType="slide"
        style={{
          flex: 1,
          margin: 0,
        }}
        visible={this.state.isModalVisible}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              backgroundColor: "white",
              height: moderateScale(50),
              alignItems: "center",
              padding: moderateScale(10),
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <TouchableOpacity
              style={{
                width: moderateScale(50),
                flexDirection: "row",
                alignItems: "flex-start",
              }}
              onPress={() => {
                this.setState({isModalVisible: false});
              }}>
              <Icon
                name="arrowleft"
                size={25}
                color={Constants.colors.Primary}
              />
            </TouchableOpacity>
          </View>
          <ImageViewer
            saveToLocalByLongPress={true}
            backgroundColor="#fff"
            imageUrls={images}
            enablePreload
            enableSwipeDown
            enableImageZoom={true}
            renderArrowLeft={() => {
              <View>
                <Icon
                  name="arrowleft"
                  size={25}
                  color={Constants.colors.Primary}
                />
              </View>;
            }}
          />
        </SafeAreaView>
      </Modal>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slideBackground: {
    backgroundColor: "white",
    height: moderateScale(250),
  },

  headingText: {
    fontSize: moderateScale(22),
    alignSelf: "flex-start",
    color: Constants.colors.Black,
    fontFamily: "Poppins-Medium",
  },
  textStyle: {
    fontSize: moderateScale(20),
    color: Constants.colors.Primary,
    fontFamily: "Poppins-Regular",
  },

  textInputStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    flex: 1,
    marginLeft: moderateScale(10),
    textAlignVertical: "center",
    paddingLeft: moderateScale(15),
  },

  textInputContainer: {
    flexDirection: "row",
    height: moderateScale(46),
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
    borderColor: Constants.colors.border_color,
    borderRadius: moderateScale(23),
    borderWidth: moderateScale(2),
    marginTop: moderateScale(10),
  },
  viewer_container: {
    flex: 0.45,
    backgroundColor: "white",
    marginTop: moderateScale(5),
  },

  detail_container: {
    flex: 0.2,
    padding: moderateScale(12),
  },

  cart_container: {
    flex: 0.35,
    padding: moderateScale(12),
  },

  buttonView: {
    alignContent: "center",
    marginTop: Platform.OS === "ios" ? moderateScale(10) : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Constants.colors.Primary,
    height: moderateScale(45),
    width: moderateScale(145),
    marginTop: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    color: Constants.colors.White,
    borderRadius: moderateScale(30),
  },
  swiperViewStyle: {
    height: moderateScale(250),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  buttonText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Medium",
    color: Constants.colors.White,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.getCartListReducer.loading,
    wishloading: state.getWishListReducer.loading,
    userID: state.loginReducer.loginData.data.ID,
  };
};

const mapDispatchToProps = {
  getRatingsAndReviews,
  addWishList,
  deleteWishList,
  addCartList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
