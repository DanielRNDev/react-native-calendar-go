import { StyleSheet, Platform, Dimensions } from 'react-native';
import * as defaultStyle from '../../../style';

const STYLESHEET_ID = 'stylesheet.day.basic';

const baseSize = Math.floor(Dimensions.get('screen').width / 22.0);

export default function styleConstructor(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    container: {
      width: baseSize * 1.3,
      height: baseSize * 1.5,
      alignItems: 'center',
      justifyContent: 'center',

    },
    base: {
      width: baseSize,
      height: baseSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: baseSize / 2,
      fontFamily: appStyle.textDayFontFamily,
      color: '#333333',
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6,
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: 16,
    },
    todayText: {
      color: appStyle.todayTextColor,
    },
    selectedText: {
      color: appStyle.selectedDayTextColor,
    },
    disabledText: {
      color: appStyle.textDisabledColor,
    },
    dot: {
      width: 4,
      height: 4,
      marginTop: 1,
      borderRadius: 2,
      opacity: 0,
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor,
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor,
    },
    topExtra: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'transparent',
    },
    extraText: {
      color: '#f44336',
      fontSize: 8,
    },
    ...(theme[STYLESHEET_ID] || {}),
  });
}
