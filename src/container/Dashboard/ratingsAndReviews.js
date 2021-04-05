import React, {Component} from "react";
import {View, Text, StyleSheet, FlatList, ScrollView} from "react-native";
import {connect} from "react-redux";
import {AirbnbRating} from "react-native-ratings";
import {Actions} from "react-native-router-flux";

import Header from "../../components/common/Header";
import {strings} from "../../constants/i18n";
import constants from "../../constants";
import {moderateScale} from "../../helper/responsiveFont";
import CreateAnyButton from "../../components/common/CreateAnyButton";
import UserReviews from "../../components/common/UserReviews";
import Review from "react-native-customer-review-bars";
import RightComponent from "../../components/common/RightComponent";
import Loader from "../../components/common/Loader";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";

class RatingsAndReviews extends Component {
  handleSearch = () => {
    Actions.searchScreen();
  };
  handleWriteAReview = () => {
    const {productData} = this.props;
    Actions.writeAReview({productData});
  };
  render() {
    const {average_rating, reviewData, reviews} = this.props.userDetail;
    return (
      <View style={styles.container}>
        <Header
          iconColor={constants.colors.Primary}
          title={strings.ratings_reviews}
          headerContainerStyle={styles.headerContainerStyle}
        />
        {this.props.loading ? (
          <Loader />
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <View style={styles.ratings}>
                <Text style={styles.overallRatingText}>
                  {strings.overall_ratings}
                </Text>
                <Text style={styles.ratingNumber}>{average_rating}</Text>
                <AirbnbRating
                  size={30}
                  isDisabled={true}
                  showRating={false}
                  defaultRating={average_rating}
                />
                <Text
                  style={{
                    ...styles.overallRatingText,
                    marginTop: moderateScale(8),
                  }}>
                  {strings.based_on_review}
                </Text>
              </View>
              <Review reviews={reviews} barStyle={styles.barStyle} />
              <CreateAnyButton
                buttonStyle={styles.buttonStyle}
                buttonText={strings.rate_and_write_review}
                textStyle={styles.buttonTextStyle}
                onPress={this.handleWriteAReview}
              />
            </View>

            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <ListEmptyComponent
                  message={strings.empty.review}
                  style={{marginTop: moderateScale(50)}}
                />
              }
              data={reviewData}
              renderItem={({item, index}) => (
                <UserReviews
                  key={index}
                  mainContainerStyle={styles.mainContainerStyle}
                  disableEdit={true}
                  needTextOneWrapper={styles.needTextOneWrapper}
                  imageOne={constants.Images.calender}
                  needTextOne={""}
                  needTextOneStyle={styles.needTextOneStyle}
                  needTextTwoStyle={styles.needTextTwoStyle}
                  image={styles.userImage}
                  {...item}
                />
              )}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.White,
  },
  content: {
    // height: moderateScale(
    //   !constants.BaseStyle.isIphoneX
    //     ? (constants.BaseStyle.DEVICE_HEIGHT * 65) / 100
    //     : (constants.BaseStyle.DEVICE_HEIGHT * 50) / 100,
    // ),
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainerStyle: {
    borderBottomColor: constants.colors.lightGrey,
    borderBottomWidth: 2,
  },
  overallRatingText: {
    color: constants.colors.grey,
    fontSize: moderateScale(14),
  },
  ratings: {
    alignItems: "center",
    marginTop: moderateScale(21),
    fontWeight: "600",
  },
  ratingNumber: {
    color: constants.colors.DarkBlack,
    marginTop: moderateScale(10),
    fontSize: moderateScale(60),
  },
  barStyle: {backgroundColor: constants.colors.lightGrey},
  buttonStyle: {
    marginTop: moderateScale(21),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(
      (constants.BaseStyle.DEVICE_WIDTH * 6) / 100,
    ),
    marginBottom: moderateScale(20),

    paddingHorizontal: moderateScale(
      (constants.BaseStyle.DEVICE_WIDTH * 15) / 100,
    ),
    borderWidth: 1,
    borderColor: constants.colors.border_color,
  },
  buttonTextStyle: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  mainContainerStyle: {
    shadowColor: constants.colors.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingTop: moderateScale(20),

    marginTop: moderateScale(0.5),
    marginBottom: moderateScale(0.5),
    backgroundColor: constants.colors.White,
  },
  userReviewsContainer: {
    marginTop: moderateScale(20),
  },
  userImage: {
    alignSelf: "center",
    borderRadius: moderateScale(100),
  },
  needTextOneWrapper: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  needTextOneStyle: {
    fontSize: moderateScale(10),
    color: constants.colors.mediumGray,
    marginLeft: moderateScale(5),
  },
  needTextTwoStyle: {
    fontSize: moderateScale(12),
  },
});
const mapStateToProps = state => ({
  userDetail: state.RatingsAndReviewsReducer.productReviews,
  loading: state.RatingsAndReviewsReducer.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RatingsAndReviews);
