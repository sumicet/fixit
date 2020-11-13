import React from 'react';
import { View, StyleSheet } from 'react-native';

import Color from '../../../constants/Color';
import RelativeTime from '../../common/RelativeTime';
import SuperSmallContent from '../../text/SuperSmallContent';

const PostedBy = props => {
    return (
        <View style={{ paddingBottom: 2, flexDirection: 'row' }}>
            <SuperSmallContent style={{ color: Color.secondaryColor }}>
                Posted by user •{' '}
            </SuperSmallContent>
            <RelativeTime date={props.date} />
        </View>
    );
};

const styles = StyleSheet.create({});

export default PostedBy;
