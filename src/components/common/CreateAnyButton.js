import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from "react-native";
import constants from "../../constants";


const CreateAnyButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.buttonStyle, props.buttonStyle]} onPress={props.onPress} disabled={props.disableButton}>
        {props.disableButton ? <ActivityIndicator color={constants.colors.White} size="small"/> : <Text style={props.textStyle}>{props.buttonText}</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonStyle: {
    alignItems: "center",
  },
});
export default CreateAnyButton;
