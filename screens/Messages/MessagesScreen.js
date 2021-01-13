import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MediumButton from '../../components/buttons/MediumButtom';
import Line from '../../components/common/Line';
import Touchable from '../../components/common/Touchable';
import Color from '../../constants/Color';

const MessagesScreen = props => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Color.primaryColor,
            }}
        >
            <Line style={{ flex: 0 }}>
                <View
                    style={{
                        backgroundColor: 'red',
                        height: 100,
                        width: 100,
                    }}
                ></View>
            </Line>
            <MediumButton
                text="Next"
                onPress={() => {
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: 'MessagesCopy' }],
                        })
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default MessagesScreen;
