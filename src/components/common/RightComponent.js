import React from "react";
import {TouchableOpacity} from "react-native";
import constants from "../../constants";

import Icon from "react-native-vector-icons/AntDesign";

const RightComponent = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Icon name={props.iconName || "search1"} size={25} color={props.iconColor ||constants.colors.Primary} />
  </TouchableOpacity>
);

export default RightComponent;
