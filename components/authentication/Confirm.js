import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import MediumButton from '../buttons/MediumButtom';
import Line from '../common/Line';
import LineDescription from '../common/LineDescription';
import Container from '../containers/Container';

const Confirm = props => {
    return (
        <Container style={{ marginTop: 0 }}>
            <LineDescription
                text={props.text}
                textStyle={{ fontFamily: 'Asap-Regular' }}
            />
            {props.children}
            <Line
                style={{ flex: 0, paddingTop: Layout.screenHorizontalPadding }}
            >
                <MediumButton
                    text="Continue"
                    onPress={props.onPress}
                />
            </Line>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default Confirm;
