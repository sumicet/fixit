import React from 'react';
import { View } from 'react-native';
import Color from '../../constants/Color';
import SmallContent from '../text/SmallContent';
import SuperSmallContent from '../text/SuperSmallContent';

const RelativeTime = props => {
    const Text = props => {
        return (
            <View>
                {props.size === 'medium' ? (
                    <SmallContent
                        style={{
                            color: props.textColor
                                ? props.textColor
                                : Color.secondaryColor,
                        }}
                    >
                        {props.text}
                    </SmallContent>
                ) : (
                    <SuperSmallContent
                        style={{
                            color: props.textColor
                                ? props.textColor
                                : Color.secondaryColor,
                        }}
                    >
                        {props.text}
                    </SuperSmallContent>
                )}
            </View>
        );
    };

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Math.abs(Date.now() - props.date);

    if (elapsed < msPerMinute) {
        return <Text size={props.size} text="Now" />;
    } else if (elapsed < msPerHour) {
        return (
            <Text
                size={props.size}
                textColor={props.textColor}
                text={Math.round(elapsed / msPerMinute) + 'm ago'}
            />
        );
    } else if (elapsed < msPerDay) {
        return (
            <Text
                size={props.size}
                textColor={props.textColor}
                text={Math.round(elapsed / msPerHour) + 'h ago'}
            />
        );
    } else if (elapsed < msPerMonth) {
        return (
            <Text
                size={props.size}
                textColor={props.textColor}
                text={Math.round(elapsed / msPerDay) + 'd ago'}
            />
        );
    } else if (elapsed < msPerYear) {
        return (
            <Text
                size={props.size}
                textColor={props.textColor}
                text={Math.round(elapsed / msPerMonth) + 'mo ago'}
            />
        );
    } else {
        return (
            <Text
                size={props.size}
                textColor={props.textColor}
                text={Math.round(elapsed / msPerYear) + 'y ago'}
            />
        );
    }
};

export default RelativeTime;
