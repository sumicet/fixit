import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import MediumButton from '../buttons/MediumButtom';
import Line from '../common/Line';
import Touchable from '../common/Touchable';
import Header from '../text/Header';
import SmallContent from '../text/SmallContent';
import TextField from '../text/TextField';
import QuizScreen from './QuizScreen';

const ResetEmailOrPasswordContainer = props => {
    const [input, setInput] = useState();

    const onChangeText = input => {
        setInput(input);
    };

    return (
        <QuizScreen centerTitle={true} {...props}>
            <View
                style={{
                    flex: 1,
                    //justifyContent: 'center',
                    paddingHorizontal: Layout.screenHorizontalPadding,
                }}
            >
                <Line
                    style={{
                        flex: 0,
                        paddingTop: Layout.generalMargin,
                        alignItems: 'flex-start',
                    }}
                >
                    <SmallContent style={{ color: Color.secondaryColor }}>
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
                        //style={{paddingVertical: Layout.generalMargin}}
                        // containerStyle={{
                        //     marginVertical: Layout.generalMargin,
                        // }}
                        textAlignVertical="center"
                        secureTextEntry={props.secureTextEntry}
                    />
                </Line>
                {props.showConfirmPasswordField ? (
                    <Line style={{ flex: 0 }}>
                        <TextField
                            onPress={() => {}}
                            value={input}
                            onChangeText={input => {
                                onChangeText(input);
                            }}
                            placeholder="confirm new password"
                            multiline={false}
                            //style={{paddingVertical: Layout.generalMargin}}
                            // containerStyle={{
                            //     marginVertical: Layout.generalMargin,
                            // }}
                            textAlignVertical="center"
                            secureTextEntry={props.secureTextEntry}
                        />
                    </Line>
                ) : null}
                <Line style={{ flex: 0, paddingTop: Layout.generalMargin }}>
                    <MediumButton
                        text={props.buttonText}
                        onPress={props.onPress}
                    />
                </Line>
            </View>
        </QuizScreen>
    );
};

const styles = StyleSheet.create({});

export default ResetEmailOrPasswordContainer;
