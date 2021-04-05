import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {moderateScale} from "../../helper/responsiveFont";
import {
  primaryColor,
  subHeadingColor,
  whiteColor,
} from "../../constants/colors";
import Constants from "../../constants";
import {getSubCategoryAction} from "../../actions/dashboardAction/SubcategoryAction";
import {connect} from "react-redux";
import Swiper from "react-native-swiper";

class Category extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSubCategoryAction();
  }
  render() {
    if (this.props.loading) {
      return (
        <View style={styles.mainContainer}>
          <ActivityIndicator size="large" color={Constants.colors.Primary} />
        </View>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(1),
            backgroundColor: "#6A89CF",
          }}></View>

        <View
          style={{
            flex: 0.3,
          }}>
          <Swiper
            style={styles.slideBackground}
            autoplay={true}
            showsButtons={false}>
            {this.props.bannerlist.map((item, key) => (
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
              </View>
            ))}
          </Swiper>
        </View>
        <View
          style={{
            flex: 0.7,
          }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            {this.props.productList.map(item => this.renderFlatListView(item))}
          </ScrollView>
        </View>
      </View>
    );
  }

  renderFlatListView = item => {
    return (
      <View
        style={{
          width: "100%",
        }}>
        <View
          style={{
            width: "100%",
          }}>
          <Text style={styles.headingText}>{item.category}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            data={item.product}
            showsHorizontalScrollIndicator={false}
            style={{
              height: moderateScale(200),
              width: "100%",
              marginTop: moderateScale(5),
            }}
            renderItem={({item, index}) => {
              return (
                <View key={index}>
                  <View style={[styles.shadowView]}>
                    <View
                      style={{
                        height: moderateScale(100),
                        width: moderateScale(100),
                      }}>
                      <Image
                        resizeMode="contain"
                        source={{uri: item.image}}
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
                      {item.post_name}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />

          <TouchableOpacity
            style={{
              height: moderateScale(30),
              width: moderateScale(30),
              position: "absolute",
              marginLeft: moderateScale(4),
              marginTop: moderateScale(110),
            }}>
            <Image
              resizeMode="contain"
              resizeMethod="resize"
              source={require("../../assets/icon/ic_left_arrow.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderHorizontalList = () => {
    return (
      <View style={[styles.shadowView]}>
        <Image
          style={{
            flex: 1,
            height: 90,
            width: "100%",
          }}
          resizeMode="contain"
          source={require("../../assets/icon/jacket.png")}
        />
      </View>
    );
  };
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

  shadowView: {
    shadowColor: "#000",
    width: moderateScale(150),
    height: moderateScale(160),
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.3,
    alignItems: "center",
    backgroundColor: "white",
    margin: moderateScale(15),
    shadowRadius: 2,
    elevation: 1,
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
    fontSize: moderateScale(17),
    padding: moderateScale(8),
    alignSelf: "flex-start",
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
    // loading: state.subCategoryReducer.loading,
    bannerlist: state.categoryReducer.bannerList,
    // productList: state.subCategoryReducer.productList,
  };
};
const mapDispatchToProps = {getSubCategoryAction};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
