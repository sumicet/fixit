import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';

import Line from '../../components/common/Line';
import TextField from '../../components/text/TextField';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const AuthLine = props => {
    return (
        <Line
            style={{
                width: '100%',
                height: 'auto',
                flex: 0,
                flexDirection: 'row',
            }}
        >
            <View style={{ paddingRight: Layout.screenHorizontalPadding }}>
                <View
                    style={{
                        height: Layout.menuIconSize,
                        width: Layout.menuIconSize,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon
                        name={props.iconName}
                        size={Layout.menuIconSize}
                        color={Color.importantTextOnTertiaryColorBackground}
                    />
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <TextField
                    defaultValue={props.value}
                    onChangeText={props.onChange}
                    placeholder={props.placeholder}
                    multiline={false}
                    textAlignVertical="center"
                    style={{
                        color: Color.primaryColor,
                        backgroundColor:
                            Color.importantTextOnTertiaryColorBackground,
                    }}
                    secureTextEntry={props.secureTextEntry}
                    autoCapitalize="none"
                />
            </View>
        </Line>
    );
};

export default AuthLine;
