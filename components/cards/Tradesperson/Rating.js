import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import SmallContent from '../../text/SmallContent';
import Header from '../../text/Header';

const Rating = props => {
    const rating =
        Math.round(3.2 * 10) / 10 > 5 ? 5 : Math.round(3.2 * 10) / 10; // get the rating with one decimal

    var stars = [];

    var i;
    for (i = 1; i <= Math.floor(rating); i++) {
        stars.push(
            <Icon
                name="star"
                color={Color.primaryBrandColor}
                size={Layout.starIconSize}
                key={i}
            />
        );
    }
    if (Math.floor(rating) != Math.ceil(rating)) {
        stars.push(
            <Icon
                name="star-half"
                color={Color.primaryBrandColor}
                size={Layout.starIconSize}
                key={Math.ceil(rating)}
            />
        );
    }
    if (5 - Math.ceil(rating)) {
        for (i = Math.ceil(rating) + 1; i <= 5; i++) {
            stars.push(
                <Icon
                    name="star-border"
                    color={Color.primaryBrandColor}
                    size={Layout.starIconSize}
                    key={i}
                />
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Header
                    style={{
                        color: Color.secondaryColor,
                        fontFamily: 'asap-semibold',
                    }}
                >
                    {rating === 0 ? 'None' : rating}
                </Header>
            </View>
            <View style={styles.stars}>
                {stars.map(value => {
                    return <View style={styles.ratingContainer}>{value}</View>;
                })}
            </View>

            <View style={styles.ratingContainer}>
                <SmallContent style={{ color: Color.secondaryColor }}>
                    (103)
                </SmallContent>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    stars: {
        paddingHorizontal: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Rating;
