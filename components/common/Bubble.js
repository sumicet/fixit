import React from 'react';
import { View } from "react-native";

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../text/SmallContent';

const Bubble = props => {
    return (
        <View
            style={[
                {
                    backgroundColor: Color.primaryBrandColor,
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: Layout.borderRadius,
                },
                props.style,
            ]}
        >
            <SmallContent
                style={{
                    textAlign: 'left',
                    color: Color.importantTextOnTertiaryColorBackground,
                }}
            >
                {props.text}
            </SmallContent>
        </View>
    );
};

export default Bubble;