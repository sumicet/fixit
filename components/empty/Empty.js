import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmptyIcon from '../../assets/icons/Miscellaneous/EmptyIcon';
import SmallContent from '../text/SmallContent';
import Color from '../../constants/Color';
import Line from '../common/Line';
import Layout from '../../constants/Layout';

const Empty = props => {
    return (
        <View
            style={{
                flex: props.size === 'small' ? 0 : 1,
                flexDirection: props.size === 'small' ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Line style={[{ flex: 0 }, props.size === 'small' && {paddingBottom: 0, paddingRight: Layout.generalPadding}]}>
                {props.size === 'small' ? (
                    <EmptyIcon size={40} />
                ) : (
                    <EmptyIcon size={80} />
                )}
            </Line>
            <Line style={{ flex: 0, paddingBottom: 0 }}>
                <SmallContent style={{ color: Color.placeholderTextColor }}>
                    {props.message ? props.message : 'Nothing to see here..'}
                </SmallContent>
            </Line>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Empty;
