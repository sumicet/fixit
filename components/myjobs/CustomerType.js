import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../text/SmallContent';
import { CUSTOMER_TYPES } from '../../data/Jobs/CustomerTypes';

const CustomerType = props => {
    return (
        <View style={styles.container}>
            <Icon name="user" size={18} color={Color.secondaryColor} />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                {
                    CUSTOMER_TYPES.find(elem => elem.id === props.customerType)
                        .name
                }
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

export default CustomerType;
