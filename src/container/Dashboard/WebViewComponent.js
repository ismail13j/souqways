import React, {Component} from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import {WebView} from "react-native-webview";
import Header from "../../components/common/Header";
import constants from "../../constants";
import {strings} from "../../constants/i18n";
import {CommonToast} from "../../components/CommonToast";
import {updatePaymentStatus} from "../../actions/dashboardAction/OrderAction";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";
import OrderConfirmation from "./OrderConfirmation";
class WebViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      orderStatus: false,
    };
  }
  componentDidMount() {
    this.BackButtonListener();
  }

  BackButtonListener = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBack);
  };

  handleBack = () => {
    Alert.alert("Souqways", strings.alert.back, [
      {text: strings.commonText.no},
      {
        text: strings.commonText.yes,
        onPress: () => {
          this.setState({modalVisible: false}, () => {
            Actions.pop();
          });
          return false;
        },
      },
    ]);
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
  }

  onNavigationStateChange = event => {
    const {url} = event;

    if (url.includes("34.211.31.84:7076")) {
      let status = false;
      if (url.includes("order-received")) {
        // updatePaymentStatus()
        status = true;
        CommonToast(strings.payment_success);
      } else {
        CommonToast(strings.payment_failed, false);
      }
      this.props.updatePaymentStatus(
        this.props.order.id,
        status,
        orderStatus => {
          this.setState({modalVisible: true, orderStatus});
        },
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Header title={strings.payment} onBackPress={this.handleBack} />
        <WebView
          ref={ref => (this.webview = ref)}
          startInLoadingState={true}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          source={{uri: this.props.uri}}
          style={{marginTop: 20}}
          renderLoading={() => (
            <View style={styles.container}>
              <ActivityIndicator
                color={constants.colors.Primary}
                size="large"
              />
            </View>
          )}
          onNavigationStateChange={this.onNavigationStateChange}
          // onLoadProgress={}
        />
        <Modal
          isVisible={this.state.modalVisible}
          style={{
            height: constants.BaseStyle.DEVICE_HEIGHT,
            width: constants.BaseStyle.DEVICE_WIDTH,
            margin: 0,
            padding: 0,
          }}>
          <OrderConfirmation
            product_id={this.props.product_id}
            order_id={this.props.order.id}
            success={this.state.orderStatus}
            onBackPress={() => {
              this.setState({modalVisible: false}, () => {
                Actions.pop();
                Actions.reset("dashboard");
                // Actions.dashboard();
              });
            }}
          />
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.colors.White,
    flex: 1,
  },
});
const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = {updatePaymentStatus};
export default connect(mapStateToProps, mapDispatchToProps)(WebViewComponent);
