import React from 'react';
import { View, StyleSheet } from 'react-native';

import Color from '../../../constants/Color';
import SuperSmallContent from '../../text/SuperSmallContent';

const PostedBy = props => {
    return (
        <View style={{ paddingBottom: 2 }}>
            <SuperSmallContent style={{ color: Color.secondaryColor }}>
                Posted by user 5m ago
            </SuperSmallContent>
        </View>
    );
};

const styles = StyleSheet.create({});

export default PostedBy;
