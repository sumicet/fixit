import * as React from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import Color from '../../../constants/Color';

function Waves() {
    return (
        <View
            style={{
                position: 'absolute',
                width: Dimensions.get('window').width,
            }}
        >
            <View
                style={{
                    backgroundColor: Color.tertiaryBrandColor,
                    height: 150 + StatusBar.currentHeight,
                    top: 0,
                }}
            ></View>
            <View>
                <Svg
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                    height={100}
                    width="100%"
                    preserveAspectRatio="none"
                >
                    <Path
                        fill={Color.tertiaryBrandColor}
                        d="M0 0l26.7 32C53.3 64 107 128 160 144c53.3 16 107-16 160 5.3C373.3 171 427 245 480 266.7c53.3 21.3 107-10.7 160-16C693.3 245 747 267 800 240c53.3-27 107-101 160-101.3 53.3.3 107 74.3 160 64C1173.3 192 1227 96 1280 64c53.3-32 107 0 133 16l27 16V0H0z"
                    />
                </Svg>
            </View>
        </View>
    );
}

export default Waves;
