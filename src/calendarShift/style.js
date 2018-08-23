import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';

const STYLESHEET_ID = 'stylesheet.calendar.main';

export default function getStyle(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: appStyle.calendarBackground
    },
    monthView: {
      backgroundColor: appStyle.calendarBackground
    },
    week: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    dayContainer: {
      width: 32
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

