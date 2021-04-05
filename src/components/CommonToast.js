import Toast from "react-native-root-toast";
import constants from "../constants";

// export const CommonToast = (value, type) => {
//   return (
//     <View
//       style={{
//         backgroundColor: "red",
//         zIndex: 999,
//         position: "absolute",
//         height: 50,
//       }}>
//       <Toast
//         // position={50}
//         backgroundColor={
//           type === "success"
//             ? constants.colors.toast.success.background
//             : constants.colors.toast.warning.background
//         }
//         shadowColor={constants.colors.Black}
//         textColor={
//           type === "success"
//             ? constants.colors.toast.success.text
//             : constants.colors.toast.warning.text
//         }
//         duration={Toast.durations.LONG}
//         position={Toast.positions.TOP}
//         opacity={1}
//         shadow={false}
//         animation={true}
//         hideOnPress={true}
//         delay={0}>
//         {value}
//       </Toast>
//     </View>
//   );
// };

export const CommonToast = (value, success = true) => {
  return Toast.show(value, {
    backgroundColor: success
      ? constants.colors.toast.success.background
      : constants.colors.toast.warning.background,
    shadowColor: constants.colors.Black,
    textColor: success
      ? constants.colors.toast.success.text
      : constants.colors.toast.warning.text,
    duration: Toast.durations.LONG,
    position: -90,
    opacity: 1,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
};
