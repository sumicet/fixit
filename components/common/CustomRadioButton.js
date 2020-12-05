import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Color from '../../constants/Color';
import SmallContent from '../text/SmallContent';

const CustomRadioButton = props => {
    const handlePress = () => {
        props.onToggleCheck(props.index);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <RadioButton
                    value={props.checked[props.index]}
                    status={
                        props.checked[props.index] ? 'checked' : 'unchecked'
                    }
                    onPress={handlePress}
                    uncheckedColor={Color.textColor}
                    color={Color.primaryBrandColor}
                />
                <View style={{ justifyContent: 'center' }}>
                    <SmallContent>{props.text}</SmallContent>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({});

export default CustomRadioButton;
