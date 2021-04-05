/*
 * @file: i18n.js
 * @description: App i18n Localization
 * @auther Suraj Sanwal
 * */
// import AppConstants from "./AppConstants";
("use strict");
let Strings = 
{
  Common: {
    username:"Username",
    password:"Password",
    login:"Login",
    serverError:
      "The server is not reachable right now, sorry for inconvenience.",
    internetConnectivity: "Please check your internet connectivity",
    close: "Close",
    smartMe: "smart me",
    Warning: "Warning",
    Error: "Error",
    someThingWentWrong: "SomeThing Went Wrong !!",
    prev: "Prev",
    validate: "Validate",
    next: "Next",
    smartChager: "Smart Charge",
    mannual: "Mannual",
    submit: "Submit",
    incorrectDetail: "Incorrect details.",
    usernameCheck: "Please check username",
    passwordCheck: "Please check password",
    allInputs: "Please fill the input fields"
  },
  chargerApms: {
    login: "Login",
    serialNumber: "Serial Number"
  },
  chargeOptions: {
    headerTitle: "Select Charger",
    title: "Electric charger selection",
    secondLastLine: "I have another electric car",
    lastLine: "I'll connect to electric car later"
  },
  smartMe: {
    title: "Connect Charger"
  },
  Status: {
    title: "Status"
  },
  login: {
    contentTitle: "Login to TrueX"
  },
  champsLogin: {
    serialNumberRequired: "Please check  serial number field!!",
    codeRequired: "Please check  code field!!",
    nameRequired: "Please check the name field !!",
    addressRequired: "Please check address field!!",
    zipRequired: "Please check zip field!!",
    cityRequired: "Please check city field!!",
    areaRequired: "Please check area field!!"
  },
  champsForm: {
    serialNumber: "Serial Number",
    code: "Code",
    name: "Name",
    serialHeader:
      "Enter the serial number and code for your ChargeAmps charger",
    serialBottomContent: "We'll never share your data with anyone else."
  },
  chargerLocation: {
    address: "Address",
    zip: "Zip",
    city: "City",
    powerArea: "Power area if known",
    DK1: "DK1",
    DK2: "DK2",
    title: "Where is your charger located ?"
  },
  chargePerference: {
    title: "Charger preferences",
    readyAtText: "When must your car be finished charging ?",
    leastAtText: "How long does your car need to charge ?",
    climateType: "Climate Friendly",
    Cheapest: "Cheapest",
    chargeType: "Charge type"
  }
};

module.exports = Strings;
