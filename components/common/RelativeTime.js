import React from 'react';
import Color from '../../constants/Color';
import SuperSmallContent from '../text/SuperSmallContent';

const RelativeTime = props => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Math.abs(Date.now() - props.date);

    if (elapsed < msPerMinute) {
        return (
            <SuperSmallContent
                style={{
                    color: props.textColor
                        ? props.textColor
                        : Color.secondaryColor,
                }}
            >
                Now
            </SuperSmallContent>
        );
    } else if (elapsed < msPerHour) {
        return (
            <SuperSmallContent
                style={{
                    color: props.textColor
                        ? props.textColor
                        : Color.secondaryColor,
                }}
            >
                {Math.round(elapsed / msPerMinute)}m ago
            </SuperSmallContent>
        );
    } else if (elapsed < msPerDay) {
        return (
            <SuperSmallContent
                style={{
                    color: props.textColor
                        ? props.textColor
                        : Color.secondaryColor,
                }}
            >
                {Math.round(elapsed / msPerHour)}h ago
            </SuperSmallContent>
        );
    } else if (elapsed < msPerMonth) {
        return (
            <SuperSmallContent
                style={{
                    color: props.textColor
                        ? props.textColor
                        : Color.secondaryColor,
                }}
            >
                {Math.round(elapsed / msPerDay)}d ago
            </SuperSmallContent>
        );
    } else if (elapsed < msPerYear) {
        return (
            <SuperSmallContent
                style={{
                    color: props.textColor
                        ? props.textColor
                        : Color.secondaryColor,
                }}
            >
                {Math.round(elapsed / msPerMonth)}mo ago
            </SuperSmallContent>
        );
    } else {
        return (
            <SuperSmallContent
                style={{
                    color: props.textColor
                        ? props.textColor
                        : Color.secondaryColor,
                }}
            >
                {Math.round(elapsed / msPerYear)}y ago
            </SuperSmallContent>
        );
    }
};

export default RelativeTime;
