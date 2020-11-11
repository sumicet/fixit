import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ExperienceIcon from '../../../assets/icons/User/ExperienceIcon';
import SmallContent from '../../text/SmallContent';
import Layout from '../../../constants/Layout';
import Color from '../../../constants/Color';

const Experience = props => {
    return (
        <View style={styles.container}>
            <ExperienceIcon />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                10y
            </SmallContent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Layout.generalPadding,
    },
});

export default Experience;
