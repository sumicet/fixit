import React from 'react';
import { View } from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../text/SmallContent';

const SmallBubble = props => {
    return (
        <View
            style={[
                {
                    flex: 1,
                    padding: Layout.generalPadding,
                    paddingHorizontal: Layout.generalPadding * 2,
                    borderRadius: Layout.borderRadius,
                    backgroundColor: Color.textField,
                },
                props.style,
            ]}
        >
            <SmallContent
                style={[
                    {
                        color: Color.textColor,
                    },
                    props.textStyle,
                ]}
            >
                {props.text}
            </SmallContent>
        </View>
    );
};

export default SmallBubble;
