import React from 'react';
import { View, StyleSheet } from 'react-native';
import MediumButton from '../../components/buttons/MediumButtom';
import Line from '../../components/common/Line';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Container from '../../components/containers/Container';

const SelectOption = props => {
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
                    <MediumButton text={'Reset email'} style={{backgroundColor: Color.disabled}} onPress={() => {}} />
                </Line>
                <Line
                    style={{
                        width: '100%',
                        flex: 0,
                        paddingBottom: Layout.screenHorizontalPadding,
                    }}
                >
                    <MediumButton text={'Reset password'} onPress={() => {props.navigation.navigate('VerifyEmail')}} />
                </Line>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default SelectOption;
