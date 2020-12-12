import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import MediumButton from '../buttons/MediumButtom';
import Line from '../common/Line';
import SmallContent from '../text/SmallContent';
import TextField from '../text/TextField';
import Container from './Container';

const ResetEmailOrPasswordContainer = props => {
    const [input, setInput] = useState();

    const onChangeText = input => {
        setInput(input);
    };

    return (
        <Container style={{paddingTop: 0, marginTop: 0}}>
            <View
                style={{
                    flex: 1,
                }}
            >
                <Line
                    style={{
                        flex: 0,
                        paddingTop: Layout.generalMargin,
                        alignItems: 'flex-start',
                    }}
                >
                    <SmallContent style={{ color: Color.textOnTertiaryColorBackground }}>
                        {props.text}
                    </SmallContent>
                </Line>
                <Line style={{ flex: 0 }}>
                    <TextField
                        onPress={() => {}}
                        value={input}
                        onChangeText={input => {
                            onChangeText(input);
                        }}
                        placeholder={props.placeholder}
                        autoCapitalize="none"
                        keyboardType={props.keyboardType}
                        autoCompleteType={props.autoCompleteType}
                        multiline={false}
                        textAlignVertical="center"
                        secureTextEntry={props.secureTextEntry}
                    />
                </Line>
                {props.showConfirmPasswordField && (
                    <Line style={{ flex: 0 }}>
                        <TextField
                            onPress={() => {}}
                            value={input}
                            onChangeText={input => {
                                onChangeText(input);
                            }}
                            placeholder="confirm new password"
                            multiline={false}
                            textAlignVertical="center"
                            secureTextEntry={props.secureTextEntry}
                        />
                    </Line>
                )}
                <Line style={{ flex: 0, paddingTop: Layout.generalMargin }}>
                    <MediumButton
                        text={props.buttonText}
                        onPress={props.onPress}
                    />
                </Line>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default ResetEmailOrPasswordContainer;
