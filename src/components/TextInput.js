/* eslint-disable react/display-name */
import React, {forwardRef} from "react";
import {TextInput} from "react-native";

const InputBox = forwardRef((props, ref) => {
  let {
    secure,
    formInput,
    text,
    onBlur,
    onChangeText,
    onKeyPress,
    onSubmitEditing,
    maxLength,
    editable,
    multiline,
    placeholder,
    placeholderColor,
    returnKeyType,
    keyboardType,
  } = props;
  return (
    <TextInput
      {...props}
      ref={ref}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      secureTextEntry={secure}
      style={formInput}
      value={text}
      onBlur={onBlur}
      editable={editable}
      maxLength={maxLength || 150}
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
      returnKeyType={returnKeyType}
      placeholderTextColor={placeholderColor}
      placeholder={placeholder}
      multiline={multiline}
      keyboardType={keyboardType}
      onSubmitEditing={onSubmitEditing}
    />
  );
});
export default InputBox;
