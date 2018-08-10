import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import styleConstructor from './style';
import lodash from 'lodash';

class Day extends Component {
  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    date: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.onDayPress = this.onDayPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    const changed = ['state', 'children', 'marking', 'onPress'].reduce((prev, next) => {
      if (prev) {
        return prev;
      } else if (nextProps[next] !== this.props[next]) {
        return next;
      }
      return prev;
    }, false);
    if (!lodash.isEmpty(nextProps.chooseDate)) {
      if (nextProps.chooseDate.day === nextProps.children) {
        return true;
      }
    }
    if (!lodash.isEmpty(this.props.chooseDate)) {
      if (this.props.chooseDate.day === this.props.children) {
        return true;
      }
    }
    if (changed === 'marking') {
      let markingChanged = false;
      if (this.props.marking && nextProps.marking) {
        // markingChanged = (!(
        //   this.props.marking.marked === nextProps.marking.marked
        //   && this.props.marking.selected === nextProps.marking.selected
        //   && this.props.marking.dotColor === nextProps.marking.dotColor
        //   && this.props.marking.disabled === nextProps.marking.disabled));
        if (this.props.marking !== nextProps.marking) {
          markingChanged = true;
        }
      } else {
        markingChanged = true;
      }
      return markingChanged;
    } else {
      return !!changed;
    }
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    const dotStyle = [this.style.dot];

    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true
      };
    }
    let dot;
    if (marking.marked) {
      dotStyle.push(this.style.visibleDot);
      if (marking.dotColor) {
        dotStyle.push({backgroundColor: marking.dotColor});
      }
      dot = (<View style={dotStyle}/>);
    }
    let topExtra;
    if (marking.topExtra || marking.reEmployee) {
      topExtra = (
        <View style={[this.style.topExtra]}>
          <Text
            style={[
              this.style.extraText,
              marking.selectedExtraTextColor ? { color: marking.selectedExtraTextColor } : {},
            ]}
          >
            {marking.topExtra || marking.reEmployee}
          </Text>
        </View>
      );
    }

    if (marking.selected) {
      containerStyle.push({
        backgroundColor: (marking.selectedColor)
          ? marking.selectedColor
          : '#00adf5',
        borderRadius: 10,
      });
      dotStyle.push(this.style.selectedDot);
      textStyle.push(this.style.selectedText);
    } else if (typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled') {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      textStyle.push(this.style.todayText);
    }
    if (marking.hasOwnProperty('borderColorShift')) {
      containerStyle.push({ borderColor: marking.borderColorShift, borderWidth: 1 })
      textStyle.push({ marginTop: 0 })
    }
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={this.onDayPress}
        disabled={
          typeof marking.disabled !== 'undefined'
            ? marking.disabled
            : this.props.state === 'disabled'
        }
      >
        <Text style={textStyle}>{String(this.props.children)}</Text>
        {dot}
        {topExtra}
      </TouchableOpacity>
    );
  }
}

export default Day;
