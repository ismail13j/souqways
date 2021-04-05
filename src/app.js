import React, { Component } from 'react';
import { View, ActivityIndicator , Dimensions,StatusBar} from 'react-native';
import Route from '../src/routes/';
import SplashScreen from 'react-native-splash-screen';
import constants from './constants';
import {connect} from "react-redux";
import PushNotification from './helper/pushNotifications';
import { changeLanguage } from './constants/i18n';
console.disableYellowBox = true;

const {height,width}=Dimensions.get("window");

const Loader =(props)=>
{
    if(props.visible){
    return(
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        zIndex: 999,
        position: "absolute",
        height,
        width
      }}>
        <ActivityIndicator size="large" color={constants.colors.Primary}/>
      </View>
    )
  }else{
    return null;
  }
 
}

class App extends Component {
  constructor(props) {
    super(props);
    changeLanguage(this.props.lang);
    this.state = {
      lang:this.props.lang
    };
  }

  componentDidMount() {


    PushNotification.getFirebaseToken()
      .then(token => {
        console.log("token========<", token)
      })
      .catch(e => console.warn(e));
    PushNotification.firebaseRemoteMessageListener();
    
    SplashScreen.hide();

    
  }

  render() {
    return (
        
      <View style={{ flex: 1 }}>
        {/* <StatusBar backgroundColor={constants.colors.Primary} barStyle="light-content"/> */}
            <Route isUserLoggedIn={this.props.isLoggedIn} />
            <Loader visible={this.props.langLoader}/>
          </View>
    );
  }
}

const mapStateToProps = state => ({
  langLoader: state.appState.langLoader,
  isUserLoggedIn: state.appState.isLoggedIn,
  lang:state.appState.lang
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
