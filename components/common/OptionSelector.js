import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import MediumButton from '../buttons/MediumButtom';
import Container from '../containers/Container';
import Line from './Line';

const OptionSelector = (props) => {
    return (
        <Container style={{paddingTop: 0, marginTop: 0}}>
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <Line
                    style={{
                        width: '100%',
                        flex: 0,
                        paddingBottom: Layout.screenHorizontalPadding,
                    }}
                >
                    <MediumButton text={props.text1} style={{backgroundColor: Color.disabled}} onPress={props.onPress1} />
                </Line>
                <Line
                    style={{
                        width: '100%',
                        flex: 0,
                        paddingBottom: Layout.screenHorizontalPadding,
                    }}
                >
                    <MediumButton text={props.text2} onPress={props.onPress2} />
                </Line>
            </View>
        </Container>
    );
};

export default OptionSelector;