import React from 'react';
import { StyleSheet } from 'react-native';
import Color from '../../constants/Color';
import Header from '../text/Header';
import Line from './Line';

const LineDescription = props => {
    return (
        <Line style={{ flex: 0, alignItems: 'flex-start' }}>
            <Header style={{ color: Color.textOnTertiaryColorBackground, textAlign: 'left' }}>
                {props.text}
            </Header>
            {props.children}
        </Line>
    );
};

const styles = StyleSheet.create({});

export default LineDescription;
