import React from 'react';
import { View, StyleSheet } from 'react-native';

import Color from '../../../constants/Color';
import RelativeTime from '../../common/RelativeTime';
import SmallContent from '../../text/SmallContent';
import SuperSmallContent from '../../text/SuperSmallContent';

const PostedBy = props => {
    return (
        <View style={{ paddingBottom: 2, flexDirection: 'row' }}>
            {props.size === 'medium' ? (
                <SmallContent
                    style={{
                        color: props.textColor
                            ? props.textColor
                            : Color.secondaryColor,
                    }}
                >
                    Posted by user •{' '}
                </SmallContent>
            ) : (
                <SuperSmallContent
                    style={{
                        color: props.textColor
                            ? props.textColor
                            : Color.secondaryColor,
                    }}
                >
                    Posted by user •{' '}
                </SuperSmallContent>
            )}
            <RelativeTime
                size={props.size}
                date={props.date}
                textColor={props.textColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default PostedBy;
