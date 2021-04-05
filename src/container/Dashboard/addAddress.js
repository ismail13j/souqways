import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {connect} from "react-redux";
import Header from "../../components/common/Header";
import RightComponent from "../../components/common/RightComponent";
import {moderateScale} from "../../helper/responsiveFont";
import constants from "../../constants";
import {strings} from "../../constants/i18n";
import Input from "../../components/TextInput";
import CreateAnyButton from "../../components/common/CreateAnyButton";
import {
  saveAddress,
  getSavedAddresses,
  updateAddress,
} from "../../actions/dashboardAction/Address";
import {Actions} from "react-native-router-flux";
import {CommonToast} from "../../components/CommonToast";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:
        (this.props && this.props.address && this.props.address.first_name) ||
        "",
      last_name:
        (this.props && this.props.address && this.props.address.last_name) ||
        "",
      country:
        (this.props && this.props.address && this.props.address.country) || "",
      state:
        (this.props && this.props.address && this.props.address.state) || "",
      city: (this.props && this.props.address && this.props.address.city) || "",
      street_address:
        (this.props && this.props.address && this.props.address.description) ||
        "",
      postal_code:
        (this.props && this.props.address && this.props.address.zipcode) || "",
      phone_no:
        (this.props && this.props.address && this.props.address.phone) || "",
      email:
        (this.props && this.props.address && this.props.address.email) || "",
      address_id:
        (this.props && this.props.address && this.props.address.id) || "",
      disableSubmitButton: false,
    };
  }

  handleSaveAddress = () => {
    const {
      first_name,
      last_name,
      country,
      city,
      street_address,
      phone_no,
      address_id,
    } = this.state;
    const {
      userDetail: {ID, user_email},
    } = this.props;
    let saveAddressData = {};
    if (first_name == "") return CommonToast(strings.errors.firstName, false);
    if (last_name == "") return CommonToast(strings.errors.lastName, false);
    if (phone_no == "") return CommonToast(strings.errors.phone, false);
    saveAddressData = {
      user_id: ID,
      first_name,
      last_name,
      billing_address_1: street_address,
      billing_address_2: "",
      billing_city: city,
      billing_email: user_email,
      billing_country: country,
      billing_phone: phone_no,
    };
    if (address_id != "") {
      saveAddressData.edit_id = address_id;
      this.props.updateAddress(saveAddressData, () => {
        this.props.getSavedAddresses();
        Actions.pop();
      });
    } else {
      this.props.saveAddress(saveAddressData, () => {
        this.props.getSavedAddresses();
        Actions.pop();
      });
    }
    this.setState({disableSubmitButton: true});
  };

  focus = key => {
    this[key].focus();
  };

  render() {
    let {
      first_name,
      last_name,
      country,
      city,
      street_address,
      phone_no,
      disableSubmitButton,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          iconColor={constants.colors.Primary}
          title={strings.save_new_address}
          headerContainerStyle={styles.headerContainerStyle}
          RightComponent={
            <RightComponent
              iconName="pluscircleo"
              iconColor={constants.colors.White}
            />
          }
        />
        <KeyboardAwareScrollView
          extraScrollHeight={moderateScale(50)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.content}>
          <Text style={styles.labelStyle}>{strings.first_name}</Text>
          <View
            style={{
              ...styles.textInputContainer,
            }}>
            <Input
              placeholder={strings.first_name}
              text={first_name}
              onChangeText={first_name => {
                this.setState({first_name});
              }}
              formInput={styles.textInputStyle}
              ref={ref => (this.first_name = ref)}
              returnKeyType="next"
              onSubmitEditing={() => this.focus("last_name")}
            />
          </View>
          <Text style={styles.labelStyle}>{strings.last_name}</Text>

          <View style={styles.textInputContainer}>
            <Input
              placeholder={strings.last_name}
              text={last_name}
              formInput={styles.textInputStyle}
              onChangeText={last_name => {
                this.setState({last_name});
              }}
              ref={ref => (this.last_name = ref)}
              returnKeyType="next"
              onSubmitEditing={() => this.focus("country")}
            />
          </View>
          <Text style={styles.labelStyle}>{strings.country}</Text>
          <View style={styles.textInputContainer}>
            <View
              style={{
                flex: 0.8,
              }}>
              <Input
                placeholder={strings.country}
                text={country}
                formInput={styles.textInputStyle}
                onChangeText={country => {
                  this.setState({country});
                }}
                ref={ref => (this.country = ref)}
                returnKeyType="next"
                onSubmitEditing={() => this.focus("city")}
              />
            </View>
          </View>
          {/* <Text style={styles.labelStyle}>{strings.state}</Text>
          <View style={styles.textInputContainer}>
            <Input
              placeholder={strings.state}
              text={state}
              onChangeText={state => {
                this.setState({state});
              }}
              formInput={styles.textInputStyle}
            />
          </View> */}
          <Text style={styles.labelStyle}>{strings.city}</Text>
          <View style={styles.textInputContainer}>
            <Input
              placeholder={strings.city}
              formInput={styles.textInputStyle}
              text={city}
              onChangeText={city => {
                this.setState({city});
              }}
              ref={ref => (this.city = ref)}
              returnKeyType="next"
              onSubmitEditing={() => this.focus("street_address")}
            />
          </View>
          <Text style={styles.labelStyle}>{strings.street_address}</Text>
          <View style={styles.textInputContainer}>
            <Input
              placeholder={strings.street_address}
              text={street_address}
              onChangeText={street_address => {
                this.setState({street_address});
              }}
              formInput={styles.textInputStyle}
              ref={ref => (this.street_address = ref)}
              returnKeyType="next"
              onSubmitEditing={() => this.focus("phone_no")}
            />
          </View>
          {/* <Text style={styles.labelStyle}>{strings.postal_code}</Text>
          <View style={styles.textInputContainer}>
            <Input
              placeholder={strings.postal_code}
              multiline={true}
              formInput={styles.textInputStyle}
              text={postal_code}
              onChangeText={postal_code => {
                this.setState({postal_code});
              }}
            />
          </View> */}
          <Text style={styles.labelStyle}>{strings.phone_no}</Text>
          <View style={styles.textInputContainer}>
            <Input
              placeholder={strings.phone_no}
              formInput={styles.textInputStyle}
              text={phone_no}
              onChangeText={phone_no => {
                this.setState({phone_no});
              }}
              keyboardType="numeric"
              ref={ref => (this.phone_no = ref)}
              returnKeyType="done"
              onSubmitEditing={this.handleSaveAddress}
            />
          </View>

          {/* <Text style={styles.labelStyle}>{strings.email_address}</Text>
           <View style={styles.textInputContainer}>
            <Input
              placeholder={strings.email_address}
              multiline={true}
              formInput={styles.textInputStyle}
              text={email}
              onChangeText={email => {
                this.setState({email});
              }}
            />
          </View> */}
          <CreateAnyButton
            disableButton={disableSubmitButton}
            buttonStyle={styles.buttonStyle}
            buttonText={strings.submit}
            textStyle={styles.buttonTextStyle}
            onPress={this.handleSaveAddress}
          />
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
  content: {
    padding: moderateScale(10),
  },
  textInputStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    flex: 1,
    textAlignVertical: "center",
  },
  textInputContainer: {
    flexDirection: "row",
    height: moderateScale(43),
    marginLeft: moderateScale(15),
    marginRight: moderateScale(20),
    borderBottomWidth: moderateScale(0.7),
    borderBottomColor: constants.colors.Primary,
  },
  labelStyle: {
    fontSize: moderateScale(16),
    color: constants.colors.Primary,
    fontFamily: "Roboto-Regular",
    marginLeft: moderateScale(15),
    marginTop: moderateScale(12),
  },
  buttonStyle: {
    width: moderateScale((constants.BaseStyle.DEVICE_WIDTH * 70) / 100),

    marginTop: moderateScale(21),
    paddingVertical: moderateScale(
      (constants.BaseStyle.DEVICE_WIDTH * 6) / 100,
    ),
    marginBottom: moderateScale(20),

    paddingHorizontal: moderateScale(
      (constants.BaseStyle.DEVICE_WIDTH * 15) / 100,
    ),
    borderWidth: 1,
    borderColor: constants.colors.border_color,
    backgroundColor: constants.colors.Primary,
    borderRadius: moderateScale(40),
  },
  buttonTextStyle: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: constants.colors.White,
  },
});

const mapStateToProps = state => ({
  userDetail: state.loginReducer.loginData.data,
});

const mapDispatchToProps = {
  saveAddress,
  getSavedAddresses,
  updateAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
