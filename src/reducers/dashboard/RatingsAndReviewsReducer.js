import ActionTypes from "../../ActionTypes";

const initialState = {
  productReviews: [],
  loading: false,
};

const RatingsAndReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RATINGS_AND_REVIEW_REQUEST:
      return {...state, loading: true};
    case ActionTypes.RATINGS_AND_REVIEW_SUCCESS:
      return {...state, productReviews: action.payload, loading: false};
    case ActionTypes.RATINGS_AND_REVIEW_FAIL:
      return {...state, loading: false};
    case "CLEAR_LOADERS":
      return {...state, loading: false};
    case "LOGOUT_SUCCESS":
      return initialState;
    default:
      return state;
  }
};

export default RatingsAndReviewsReducer;
