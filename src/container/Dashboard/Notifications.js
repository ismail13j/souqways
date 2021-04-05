import React, {Component} from "react";
import Header from "../../components/common/Header";
import {View, StyleSheet, FlatList} from "react-native";
import {connect} from "react-redux";
import constants from "../../constants";
import {strings} from "../../constants/i18n";
import {moderateScale} from "../../helper/responsiveFont";
import RenderNotification from "../../components/common/RenderNotification";
import {getNotification} from "../../actions/dashboardAction/NotificationActions";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    this.props.getNotification();
  }
  onEndReached = () => {
    let {total_page} = this.props;
    if (total_page > this.state.page) {
      this.setState({page: this.state.page + 1}, () =>
        this.props.getNotification(this.state.page),
      );
    }
  };
  render() {
    const {notifications} = this.props;
    return (
      <View style={styles.container}>
        <Header
          iconColor={constants.colors.Primary}
          title={strings.notification_setting}
          headerContainerStyle={styles.headerContainerStyle}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={this.onEndReached}
          onRefresh={() => this.props.getNotification()}
          refreshing={this.props.loading}
          ListEmptyComponent={
            <ListEmptyComponent
              loading={this.props.loading}
              message={strings.errors.notification}
            />
          }
          data={notifications}
          renderItem={({item}) => <RenderNotification {...item} />}
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
  headerContainerStyle: {
    borderBottomColor: constants.colors.lightGrey,
    borderBottomWidth: 2,
  },
  content: {
    marginTop: moderateScale(20),
  },
});

const mapStateToProps = state => ({
  notifications: state.notification.payload,
  loading: state.notification.loading,
  total_page: state.notification.total_page,
});

const mapDispatchToProps = {getNotification};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
