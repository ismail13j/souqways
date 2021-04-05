import React, {Component} from "react";
//AntDesign

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import {strings} from "../../constants/i18n";
import VectorIcon from "react-native-vector-icons/AntDesign";
import Constants from "../../constants";
//eslint-disable-next-line
import Icon from "react-native-vector-icons/AntDesign";
import {getProductInfoAction} from "../../actions/dashboardAction/SubcategoryAction";
import {
  getSearchProductAction,
  onCancelData,
} from "../../actions/dashboardAction/SearchAction";
//
import {moderateScale} from "../../helper/responsiveFont";
import {whiteColor} from "../../constants/colors";
import {Actions} from "react-native-router-flux";
import {SearchBar} from "react-native-elements";
import ProductItem from "../../components/ProductItem";

import {connect} from "react-redux";

import {addCartList} from "../../actions/dashboardAction/cartListAction";
import {addWishList} from "../../actions/dashboardAction/getWishListAction";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";
import _ from "lodash";
class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      clickedIndex: -1,
      modalVisible: false,
      selectedCategory: "",
      CategoryId: "",
    };
  }

  // static getDerivedStateFromProps(nextProps) {
  //   if (nextProps.searchList.length) {
  //     Keyboard.dismiss();
  //   }
  //   return null;
  // }
  componentDidMount() {
    this.startSearch();
  }

  toggleModal(
    visible,
    cb = () => {
      //
    },
  ) {
    this.setState({modalVisible: visible, search: ""}, () => {
      cb();
    });
  }
  startSearch = () => {
    let data = new FormData();
    data.append("category_id", this.state.CategoryId);
    data.append("product_name", this.state.search);
    this.props.getSearchProductAction(data);
  };
  updateSearch = (search = "") => {
    this.setState(
      {search},
      _.debounce(() => {
        if (this.state.search.length > 2) {
          this.startSearch();
        }
      }, 1000),
    );
  };

  deleteSearch = () => {
    this.props.onCancelData();
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
            height: moderateScale(50),
            alignItems: "center",
            padding: moderateScale(10),
            marginTop: Platform.OS === "ios" ? moderateScale(20) : 0,
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
              Actions.pop();
              this.props.onCancelData();
            }}>
            <Icon name="arrowleft" size={25} color={Constants.colors.Primary} />
          </TouchableOpacity>
          <Text style={styles.textStyle}>{strings.search_products}</Text>
          <TouchableOpacity
            style={{
              width: moderateScale(70),
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              //this.opentheEditProfile()
            }}>
            <Image
              // source={require('../.././assets/icon/magnifying-glass.png')}
              style={{
                marginLeft: moderateScale(10),
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            height: moderateScale(50),
            alignItems: "center",
            backgroundColor: Constants.colors.Primary,
          }}>
          <View
            style={{
              flex: 0.85,
              backgroundColor: Constants.colors.Primary,
            }}>
            <SearchBar
              underlineColorAndroid="#07308A"
              containerStyle={{
                backgroundColor: Constants.colors.Primary,
                margin: moderateScale(0),
                borderWidth: moderateScale(0),
                borderColor: Constants.colors.Primary,
                borderBottomColor: Constants.colors.Primary,
                borderTopColor: Constants.colors.Primary,
                padding: moderateScale(0),
              }}
              value={this.state.search}
              leftIconContainerStyle={{
                backgroundColor: Constants.colors.Primary,
              }}
              inputContainerStyle={{
                marginLeft: moderateScale(0),
                marginRight: moderateScale(0),
                borderColor: Constants.colors.Primary,
                borderWidth: moderateScale(0),
                backgroundColor: Constants.colors.Primary,
              }}
              inputStyle={{
                fontSize: moderateScale(14),
                padding: moderateScale(0),
                fontFamily: "Poppins-Medium",
                color: "white",
              }}
              onChangeText={this.updateSearch}
              onClearText={this.deleteSearch}
              icon={{
                type: "font-awesome",
                size: moderateScale(25),
                name: "search",
              }}
              placeholder={strings.search_here}
            />
          </View>

          <TouchableOpacity
            style={{
              width: moderateScale(40),
              flex: 0.15,
              height: moderateScale(30),
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Constants.colors.Primary,
            }}
            onPress={() => {
              this.toggleModal(true);
            }}>
            <VectorIcon
              name="filter"
              size={moderateScale(20)}
              color={"white"}
            />
            {this.state.selectedCategory ? (
              <View
                style={{
                  backgroundColor: "red",
                  height: moderateScale(8),
                  width: moderateScale(8),
                  borderRadius: moderateScale(100),
                  position: "absolute",
                  top: moderateScale(5),
                  right: moderateScale(15),
                }}
              />
            ) : null}
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: moderateScale(10),
            alignItems: "center",
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={this.props.searchList}
            ListEmptyComponent={
              <ListEmptyComponent message={strings.empty.product} />
            }
            onRefresh={() => {
              this.startSearch();
            }}
            refreshing={this.props.loading}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <ProductItem
                  {...item}
                  onAddToCart={this.addToCart}
                  onAddToWishList={this.addToWishList}
                  index={index}></ProductItem>
              );
            }}
          />
        </View>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}>
          {this.renderCategoryModal()}
        </Modal>
      </View>
    );
  }
  addToCart = item => {
    this.props.addCartList(item);
  };

  addToWishList = item => {
    this.props.addWishList(item);
  };
  renderCategoryModal = () => {
    return (
      <View style={styles.modal}>
        <View
          style={{
            backgroundColor: "white",
            height: moderateScale(50),
            alignItems: "center",
            padding: moderateScale(10),
            marginTop: Platform.OS === "ios" ? moderateScale(20) : 0,
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
              this.toggleModal(!this.state.modalVisible);
            }}>
            <Icon name="arrowleft" size={25} color={Constants.colors.Primary} />
          </TouchableOpacity>
          <Text style={styles.textStyle}>{strings.select_category}</Text>
          <TouchableOpacity
            style={{
              width: moderateScale(70),
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              this.toggleModal(!this.state.modalVisible, () => {
                this.startSearch();
              });
            }}>
            <Text style={styles.textStyle}>{strings.done}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(1),
            backgroundColor: "grey",
          }}></View>

        <View
          style={{
            padding: moderateScale(15),
            backgroundColor: Constants.colors.Primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text
            numberOfLines={1}
            style={{...styles.headingText, color: whiteColor, width: "80%"}}>
            {strings.select_category} : {this.state.selectedCategory}
          </Text>
          {this.state.selectedCategory ? (
            <TouchableOpacity
              onPress={() =>
                this.setState({selectedCategory: "", CategoryId: ""})
              }>
              <Text style={[styles.textStyle, {color: Constants.colors.White}]}>
                {strings.cancel}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.props.categorylist}
          style={{
            flex: 1,
            backgroundColor: "#FBFBFB",
          }}
          keyExtractor={item => item.email}
          renderItem={({item, index}) => this.renderListItem(item, index)}
        />
      </View>
    );
  };

  renderListItem(item) {
    return (
      <TouchableOpacity
        style={{...styles.shadowView, height: moderateScale(80)}}
        onPress={() =>
          this.setState({
            CategoryId: item.category[0].cat_ID,
            selectedCategory: item.category[0].name,
          })
        }>
        <View
          style={{
            ...styles.subcontainer,
            flex: 0.65,
            alignItems: "flex-start",
            paddingLeft: 20,
          }}>
          <View style={{paddingTop: 20}}>
            <Text style={styles.textStyle}>{item.category[0].name}</Text>
            <View></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
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
  textStyle: {
    fontSize: moderateScale(16),
    color: Constants.colors.Primary,
    fontFamily: "Roboto-Regular",
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
    height: moderateScale(0),
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6.68,
    elevation: 5,
    alignItems: "center",
    backgroundColor: "white",
    margin: moderateScale(15),
  },
  modal: {
    flex: 1,
    backgroundColor: Constants.colors.White,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.searchReducer.loading,
    orderList: state.orderReducer.orderList,
    searchList: state.searchReducer.searchList,
    categorylist: state.categoryReducer.categoryData.category,
  };
};

const mapDispatchToProps = {
  getSearchProductAction,
  getProductInfoAction,
  onCancelData,
  addCartList,
  addWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
