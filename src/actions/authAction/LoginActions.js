import {Actions} from "react-native-router-flux";
import {Platform, NativeModules} from "react-native";
import {Server_URL, Social_Login_URL} from "../../constants/url";

import {CommonToast} from "../../components/CommonToast";
import PushNotification from "../../helper/pushNotifications";
import RestClient from "../../helper/RestClient";
import {strings} from "../../constants/i18n";
import {GoogleSignin} from "@react-native-community/google-signin";
import {firebase} from "@react-native-firebase/auth";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import constants from "../../constants";
const {RNTwitterSignIn} = NativeModules;

export const _loginAction = (data, isRemind) => {
  return async dispatch => {
    data.device_id = Platform.OS;
    data.device_token = await PushNotification.getFirebaseToken();
    dispatch({type: "LOGIN_REQUEST", data: data});
    RestClient.isConnected()
      .then(() => {
        fetch(`${Server_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: responseJson,
                isRemind,
                data,
              });

              Actions.dashboard();
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "LOGIN_FAIL", responseJson});
            }
          })
          .catch(e => {
            dispatch({type: "LOGIN_FAIL", e});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(e => {
        dispatch({type: "LOGIN_FAIL", e});
        CommonToast(strings.connectionError, false);
      });
  };
};

export const facebookLogin = () => {
  return async dispatch => {
    dispatch({
      type: "LOGIN_REQUEST",
    });
    // Login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      CommonToast(strings.errors.fbCancel, false);
      dispatch({type: "LOGIN_FAIL"});
    } else {
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        CommonToast(strings.errors.accessToken, false);
        dispatch({type: "LOGIN_FAIL"});
      } else {
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken,
        );
        const resp = await firebase.auth().signInWithCredential(credential);
        let {user} = resp;
        if (user) {
          let username = user.email && user.email.split("@")[0];
          let firstname = user.displayName && user.displayName.split(" ")[0];
          let lastname = user.displayName && user.displayName.split(" ")[1];
          dispatch(
            socialLogin({
              username,
              email: user.email,
              firstname,
              lastname,
              avatar: user.photoURL,
            }),
          );
        } else {
          CommonToast(strings.errors.socialLogin, false);
          dispatch({type: "LOGIN_FAIL"});
        }
      }
    }
  };
};

export const googleSignIn = () => {
  return async dispatch => {
    dispatch({
      type: "LOGIN_REQUEST",
    });
    await GoogleSignin.configure({
      webClientId:
        "363183175074-vn9eiqp4lrag31268ihip6p0nlio0dc0.apps.googleusercontent.com",
    });
    const {accessToken, idToken} = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );
    const resp = await firebase.auth().signInWithCredential(credential);
    let {user} = resp;
    if (user) {
      let username = user.email && user.email.split("@")[0];
      let firstname = user.displayName && user.displayName.split(" ")[0];
      let lastname = user.displayName && user.displayName.split(" ")[1];
      dispatch(
        socialLogin({
          username,
          email: user.email,
          firstname,
          lastname,
          avatar: user.photoURL,
        }),
      );
    } else {
      CommonToast(strings.errors.socialLogin, false);
      dispatch({type: "LOGIN_FAIL"});
    }
  };
};

export const twitterLogin = () => {
  return async dispatch => {
    dispatch({
      type: "LOGIN_REQUEST",
    });
    if (Platform.OS === "android") {
      await RNTwitterSignIn.init(
        constants.DevKeys.TWITTER_CONSUMER_KEY,
        constants.DevKeys.TWITTER_CONSUMER_SECRET,
      );
    }
    const {authToken, authTokenSecret} = await RNTwitterSignIn.logIn();

    const credential = firebase.auth.TwitterAuthProvider.credential(
      authToken,
      authTokenSecret,
    );
    const resp = await firebase.auth().signInWithCredential(credential);
    let {
      user,
      additionalUserInfo: {profile},
    } = resp;
    if (user || profile) {
      let username =
        Platform.OS === "ios"
          ? profile.email && profile.email.split("@")[0]
          : user.email && user.email.split("@")[0];
      let firstname =
        (user.displayName && user.displayName.split(" ")[0]) || "";
      let lastname = (user.displayName && user.displayName.split(" ")[1]) || "";

      dispatch(
        socialLogin({
          username,
          email: Platform.OS === "ios" ? profile.email : user.email,
          firstname,
          lastname,
          avatar: user.photoURL,
        }),
      );
    } else {
      CommonToast(strings.errors.socialLogin, false);
      dispatch({type: "LOGIN_FAIL"});
    }
  };
};

export const socialLogin = (data = {}) => {
  return async dispatch => {
    data.device_id = Platform.OS;
    data.device_token = await PushNotification.getFirebaseToken();
    dispatch({
      type: "LOGIN_REQUEST",
      data: RestClient.createFormData(data),
      url: `${Social_Login_URL}/social-login`,
    });
    RestClient.isConnected()
      .then(() => {
        fetch(`${Social_Login_URL}/social-login`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: RestClient.createFormData(data),
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.status === 200) {
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: {data: responseJson},
                isRemind: true,
                data,
              });

              Actions.dashboard();
            } else {
              CommonToast(responseJson.message, false);
              dispatch({type: "LOGIN_FAIL", responseJson});
            }
          })
          .catch(e => {
            dispatch({type: "LOGIN_FAIL", e});
            CommonToast(strings.serverError, false);
          });
      })
      .catch(e => {
        dispatch({type: "LOGIN_FAIL", e});
        CommonToast(strings.connectionError, false);
      });
  };
};
