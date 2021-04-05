import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
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
import _ from "lodash";
import {Actions} from "react-native-router-flux";
import Constants from "../../constants";
import {getClothAction} from "../../actions/dashboardAction/CategoryAction";
import {connect} from "react-redux";
import Swiper from "react-native-swiper";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedIndex: -1,
      pageNo: 1,
      parentScrollEnable: false,
      fetchNext: true,
    };
        this.onCategoryEndReached = _.debounce(this.onCategoryEndReached.bind(this), 1000);

    //  this.onEndReached = _.debounce(this.onEndReached.bind(this), 1000);
  }

  // onEndReached() {
  //   let context = this,
  //     {teamCount} = this.props;
  //   if (offSet <= Math.ceil(teamCount / limit)) {
  //     context.setState({append: true}, () => {
  //       context.getTeams(() => {
  //         offSet = offSet + 1;
  //       });
  //     });
  //   }
  // }

  onCategoryEndReached() {
    let {
      categoryData: {nextPage, current_page},
    } = this.props;
    if (current_page < nextPage)
      this.props.getClothAction(nextPage, () =>
        this.setState({fetchNext: true}),
      );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          initialNumToRender={5}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.props.categoryData.category}
          contentContainerStyle={{
            alignItems: "center",
            backgroundColor: "#FBFBFB",
          }}
          onEndReachedThreshold={1}
          onEndReached={this.onCategoryEndReached}
          numColumns={2}
          refreshing={false}
          renderItem={({item, index}) =>
            this.renderCategoryItemView(item, index)
          }
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: moderateScale(240),
                }}>
                <Swiper
                  style={styles.slideBackground}
                  autoplay={true}
                  showsButtons={true}>
                  {this.props.bannerList.map((item, key) => (
                    // eslint-disable-next-line react/jsx-key
                    <View style={styles.swiperViewStyle} index={key}>
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
            );
          }}
        />
      </View>
    );
  }

  openCategoryDetail = _.debounce((index, screenTitle) => {
    Actions.categoryProductList({index, screenTitle});
  }, 50);

  renderCategoryItemView = (item, index) => {
    return (
      <TouchableOpacity
        style={[styles.shadowView]}
        onPress={() => {
          this.openCategoryDetail(index, item.category[0].categories_name);
        }}>
        <TouchableOpacity
          onPress={() => {
            this.openCategoryDetail(index, item.category[0].categories_name);
          }}
          style={{
            height: moderateScale(100),
            width: moderateScale(100),
          }}>
          <Image
            resizeMode="cover"
            source={{uri: item.category[0].category_image}}
            style={{flex: 1}}
          />
        </TouchableOpacity>
        <Text
          numberOfLines={2}
          style={{
            ...styles.textStyle,
            marginTop: moderateScale(5),
            textAlign: "center",
          }}>
          {item.category[0].name}
        </Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFF",
  },

  indicator: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  container: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: "#FBFBFB",
  },
  itemBackground: {
    shadowColor: "#000",
    width: moderateScale(150),
    height: moderateScale(200),
    flexDirection: "column",
    backgroundColor: "#FFF",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    margin: moderateScale(10),
  },
  shadowView: {
    shadowColor: "#000",
    width: moderateScale(145),
    height: moderateScale(160),
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    padding: moderateScale(5),
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: moderateScale(7),
    margin: moderateScale(13),
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
    fontSize: moderateScale(14),
    color: Constants.colors.Black,
    fontFamily: "Roboto-Regular",
  },
  headingText: {
    fontSize: moderateScale(17),
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
    bannerList: state.categoryReducer.bannerList,
    categoryData: state.categoryReducer.categoryData,
    loading: state.categoryReducer.loading,
  };
};
const mapDispatchToProps = {getClothAction};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
