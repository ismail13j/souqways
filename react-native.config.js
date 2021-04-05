module.exports = {
  project: {
    ios: {},
    android: {},

    // grouped into "project"
  },
  assets: ["./src/assets/fonts/"],
  dependencies: {
    "react-native-notifications": {
      platforms: {
        android: {
          packageInstance: "new RNNotificationsPackage(this.getApplication())",
        },
      },
    },
  },

  // stays the same
};
