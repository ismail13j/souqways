import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import constants from "../../constants";
import Header from "../../components/common/Header";
import {strings} from "../../constants/i18n";
import RightComponent from "../../components/common/RightComponent";
import {moderateScale} from "../../helper/responsiveFont";
import {Actions} from "react-native-router-flux";
import {
  deleteAddress,
  getSavedAddresses,
  setSelectedAddress,
  setBillingAddress,
} from "../../actions/dashboardAction/Address";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";

class SavedAddress extends Component {
  componentDidMount() {
    this.props.getSavedAddresses();
  }
  handleEditAddress = item => {
    Actions.addAddress({address: item});
  };

  handleDeleteAddress = address_id => {
    Alert.alert("Souqways", strings.alert.address, [
      {
        text: strings.commonText.no,
      },
      {
        text: strings.commonText.yes,
        onPress: () => {
          this.props.deleteAddress({address_id});
        },
      },
    ]);
  };
  handleAddAddress = () => {
    Actions.addAddress();
  };

  handlePress = address => {
    if (this.props.addressType === "billing") {
      this.props.setBillingAddress(address, this.props.isSame);
    } else {
      if (this.props.isSame) {
        this.props.setBillingAddress(address, this.props.isSame);
      }
      this.props.setSelectedAddress(address, this.props.isSame);
    }

    Actions.pop();
  };

  render() {
    const {savedAddress} = this.props;

    return (
      <View style={styles.container}>
        <Header
          iconColor={constants.colors.Primary}
          title={strings.save_address}
          headerContainerStyle={styles.headerContainerStyle}
          RightComponent={
            <RightComponent
              iconName="pluscircleo"
              onPress={this.handleAddAddress}
            />
          }
        />

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={savedAddress}
          refreshing={this.props.loading}
          onRefresh={() => this.props.getSavedAddresses()}
          ListEmptyComponent={
            <ListEmptyComponent message={strings.empty.address} />
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              disabled={this.props.disablePress}
              style={[styles.keyValueWrapper, styles.addressWrapper]}
              onPress={() => this.handlePress(item)}>
              <View style={styles.editIconStyle}>
                <Icon
                  color={constants.colors.Primary}
                  name={"edit"}
                  size={25}
                  style={styles.editStyle}
                  onPress={() => this.handleEditAddress(item)}
                />
                <Icon
                  color={constants.colors.red}
                  name={"delete"}
                  size={25}
                  onPress={() => this.handleDeleteAddress(item.id)}
                />
              </View>
              <View style={styles.commonTextViewStyle}>
                <Text style={styles.itemKey}>{`${strings.first_name}:  `}</Text>
                <Text style={styles.itemValue}>{item.first_name}</Text>
              </View>
              <View style={styles.commonTextViewStyle}>
                <Text style={styles.itemKey}>{`${strings.last_name}:  `}</Text>
                <Text style={styles.itemValue}>{item.last_name}</Text>
              </View>
              <View style={styles.commonTextViewStyle}>
                <Text style={styles.itemKey}>{`${strings.country}:  `}</Text>
                <Text style={styles.itemValue}>{item.country}</Text>
              </View>
              {/* <View style={styles.commonTextViewStyle}>
                  <Text style={styles.itemKey}>{`${strings.state}:  `}</Text>
                  <Text style={styles.itemValue}>{item.state}</Text>
                </View> */}
              <View style={styles.commonTextViewStyle}>
                <Text style={styles.itemKey}>{`${strings.city}:  `}</Text>
                <Text style={styles.itemValue}>{item.city}</Text>
              </View>
              <View style={styles.commonTextViewStyle}>
                <Text
                  style={styles.itemKey}>{`${strings.street_address}:  `}</Text>
                <Text style={styles.itemValue}>
                  {item.address_1} {item.address_2}
                </Text>
              </View>
              {/* <View style={styles.commonTextViewStyle}>
                  <Text
                    style={styles.itemKey}>{`${strings.postal_code}:  `}</Text>
                  <Text style={styles.itemValue}>{item.zipcode}</Text>
                </View> */}
              <View style={styles.commonTextViewStyle}>
                <Text style={styles.itemKey}>{`${strings.phone_no}:  `}</Text>
                <Text style={styles.itemValue}>{item.phone}</Text>
              </View>
              <View style={styles.commonTextViewStyle}>
                <Text
                  style={styles.itemKey}>{`${strings.email_address}:  `}</Text>
                <Text style={styles.itemValue}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.White,
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
  editStyle: {
    paddingRight: moderateScale(8),
  },

  editIconStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  content: {
    padding: moderateScale(10),
  },
  addressWrapper: {
    borderBottomColor: constants.colors.lightGrey,
    borderBottomWidth: 2,
  },
  commonTextViewStyle: {
    flexDirection: "row",
    marginLeft: moderateScale(50),
    marginBottom: moderateScale(10),
  },
  keyValueWrapper: {
    flex: 1,
    paddingTop: moderateScale(5),
    //   flexDirection: "row"
  },
  itemKey: {
    color: constants.colors.fadeGrey,
    fontSize: moderateScale(13),
    flex: 0.3,
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    padding: moderateScale(5),
  },
  itemValue: {
    color: constants.colors.DarkBlack,
    fontSize: moderateScale(14),
    flex: 0.7,
    fontFamily: "Roboto-Regular",
    padding: moderateScale(5),
  },
});
const mapStateToProps = state => ({
  savedAddress: state.Address.addresses,
  loading: state.Address.loading,
});

const mapDispatchToProps = {
  deleteAddress,
  setSelectedAddress,
  getSavedAddresses,
  setBillingAddress,
};
export default connect(mapStateToProps, mapDispatchToProps)(SavedAddress);
