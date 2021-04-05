import {Latest_Server_URL} from "../../constants/url";
import ActionTypes from "../../ActionTypes";
import {CommonToast} from "../../components/CommonToast";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";

export const getRatingsAndReviews = productId => {
  return dispatch => {
    dispatch({type: ActionTypes.RATINGS_AND_REVIEW_REQUEST});
    RestClient.isConnected()
      .then(() => {
        fetch(
          `${Latest_Server_URL}/review-rating-list?product_id=${productId}`,
          {
            method: "GET",
          },
        )
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              let reviewObj = Object.keys(responseJson.rating_array);
              let reviews = reviewObj.reduce((d, i) => {
                d.push({
                  type: i,
                  value: parseInt(responseJson.rating_array[i], 10) || 0,
                });
                return d;
              }, []);
              dispatch({
                type: ActionTypes.RATINGS_AND_REVIEW_SUCCESS,
                payload: {...responseJson, reviews: reviews.reverse()},
              });
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: ActionTypes.RATINGS_AND_REVIEW_FAIL});
            }
          })
          .catch(e => {
            dispatch({type: ActionTypes.RATINGS_AND_REVIEW_FAIL, e});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(e => {
        CommonToast(strings.connectionError, false);
        dispatch({type: ActionTypes.RATINGS_AND_REVIEW_FAIL, e});
      });
  };
};
//eslint-disable-next-line
export const submitAReview = (data, cb = () => {}) => {
  return dispatch => {
    dispatch({type: ActionTypes.SUBMIT_REVIEW_REQUEST});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Latest_Server_URL}/review-rating`, {
          method: "POST",
          body: data,
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: ActionTypes.SUBMIT_REVIEW_SUCCESS,
                payload: responseJson,
              });
              cb();
            } else {
              CommonToast(responseJson.message);
              dispatch({type: ActionTypes.SUBMIT_REVIEW_FAIL});
              cb();
            }
          })
          .catch(() => {
            dispatch({type: ActionTypes.SUBMIT_REVIEW_FAIL});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(() => {
        CommonToast(strings.connectionError, false);
        dispatch({type: ActionTypes.SUBMIT_REVIEW_FAIL});
      });
  };
};
