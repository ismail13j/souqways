import React, {Component} from "react";
import {View, Text, StyleSheet, Image, TextInput} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";

import constants from "../../constants";
import Header from "../../components/common/Header";
import {strings} from "../../constants/i18n";
import {moderateScale} from "../../helper/responsiveFont";
import {AirbnbRating} from "react-native-ratings";
import CreateAnyButton from "../../components/common/CreateAnyButton";
import {
  submitAReview,
  getRatingsAndReviews,
} from "../../actions/dashboardAction/RatingsAndReviewsAction";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
class WriteAReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userComment: "",
      userRating: 0,
      disableSubmitButton: false,
    };
  }
  handleWriteAReview = () => {
    const {
      user: {ID, first_name, user_email},
      productData: {post_id},
    } = this.props;
    const {userComment, userRating} = this.state;
    let data = new FormData();
    data.append("product_id", post_id);
    data.append("review", userComment);
    data.append("reviewer", first_name);
    data.append("reviewer_email", user_email);
    data.append("rating", userRating);
    data.append("user_id", ID);
    this.setState({disableSubmitButton: true});
    this.props.submitAReview(data, () => {
      this.props.getRatingsAndReviews(post_id);
      Actions.pop();
    });
  };

  handleSearch = () => {
    Actions.searchScreen();
  };
  render() {
    const {userComment, disableSubmitButton} = this.state;
    const {
      productData: {image, post_name},
    } = this.props;

    return (
      <View style={styles.container}>
        <Header
          iconColor={constants.colors.Primary}
          title={strings.ratings_reviews}
          headerContainerStyle={styles.headerContainerStyle}
        />
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={[styles.alignItemsCenter, styles.productStyle]}>
              <Image
                source={{uri: image.featuredImg}}
                resizeMode="contain"
                style={styles.productImage}
              />
              <Text numberOfLines={2} style={styles.productNameTextStyle}>
                {post_name}
              </Text>
            </View>
            <View style={styles.ratingsWrapper}>
              <Text style={styles.productRatingText}>
                {strings.your_rating}
              </Text>
              <AirbnbRating
                size={30}
                showRating={false}
                defaultRating={0}
                onFinishRating={userRating => this.setState({userRating})}
              />
              <TextInput
                value={userComment}
                multiline={true}
                placeholder="Write your review here..."
                onChangeText={userComment => this.setState({userComment})}
                style={styles.textInputStyle}
              />
              <CreateAnyButton
                disableButton={disableSubmitButton}
                buttonStyle={styles.buttonStyle}
                buttonText={strings.submit}
                textStyle={styles.buttonTextStyle}
                onPress={this.handleWriteAReview}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.White,
  },
  headerContainerStyle: {
    borderBottomColor: constants.colors.lightGrey,
    borderBottomWidth: 2,
  },
  productNameTextStyle: {
    color: constants.colors.DarkBlack,
    fontSize: moderateScale(18),
    width: "70%",
    textAlign: "justify",
  },
  productImage: {
    height: moderateScale(94),
    width: moderateScale(94),
    marginRight: moderateScale(5),
  },
  content: {
    marginHorizontal: moderateScale(10),
  },
  alignItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  productStyle: {
    borderBottomColor: constants.colors.lightGrey,
    borderBottomWidth: 2,
    paddingVertical: moderateScale(30),
    width: "100%",
  },
  productRatingText: {
    fontSize: moderateScale(22),
    fontWeight: "400",
    marginBottom: moderateScale(20),
  },
  ratingsWrapper: {
    alignItems: "center",
    paddingVertical: moderateScale(23),
  },
  buttonStyle: {
    width: moderateScale((constants.BaseStyle.DEVICE_WIDTH * 60) / 100),
    marginTop: moderateScale(21),
    borderRadius: moderateScale(40),
    backgroundColor: constants.colors.Primary,
    paddingVertical: moderateScale(
      (constants.BaseStyle.DEVICE_WIDTH * 5) / 100,
    ),
    marginBottom: moderateScale(20),

    paddingHorizontal: moderateScale(
      (constants.BaseStyle.DEVICE_WIDTH * 20) / 100,
    ),
    borderWidth: 1,
    borderColor: constants.colors.border_color,
  },

  buttonTextStyle: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: constants.colors.White,
  },

  textInputStyle: {
    borderColor: constants.colors.lightGrey,
    borderWidth: moderateScale(2),
    width: moderateScale((constants.BaseStyle.DEVICE_WIDTH * 80) / 100),
    height: moderateScale((constants.BaseStyle.DEVICE_HEIGHT * 25) / 100),
    padding: moderateScale(20),
    borderRadius: moderateScale(5),
    fontSize: moderateScale(14),
    marginTop: moderateScale(20),
  },
});
const mapStateToProps = state => ({
  user: state.loginReducer.userData.data,
});

const mapDispatchToProps = {submitAReview, getRatingsAndReviews};

export default connect(mapStateToProps, mapDispatchToProps)(WriteAReview);
