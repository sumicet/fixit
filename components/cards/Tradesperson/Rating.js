import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import SmallContent from '../../text/SmallContent';
import Header from '../../text/Header';
import Touchable from '../../common/Touchable';

const Rating = props => {
    const rating =
        Math.round(props.rating * 10) / 10 > 5
        ? 5
        : Math.round(props.rating * 10) / 10; // get the rating with one decimal

    var starsVar = [];
    const [stars, setStars] = useState([]);

    var i;

    const addFullStars = count => {
        var starsVar = [];
        for (i = 1; i <= count; i++) {
            starsVar.push(
                <Icon
                    name="star"
                    color={
                        props.isBeingRated
                            ? Color.primaryColor
                            : Color.starColor
                    }
                    size={
                        props.isRateCard
                            ? Layout.bigStarIconSize
                            : Layout.starIconSize
                    }
                    key={i}
                />
            );
        }
        return starsVar;
    };

    starsVar = addFullStars(Math.floor(rating));

    if (Math.floor(rating) != Math.ceil(rating)) {
        starsVar.push(
            <Icon
                name="star-half"
                color={
                    props.isBeingRated ? Color.primaryColor : Color.starColor
                }
                size={
                    props.isRateCard
                        ? Layout.bigStarIconSize
                        : Layout.starIconSize
                }
                key={Math.ceil(rating)}
            />
        );
    }

    const addEmptyStars = startIndex => {
        var starsVar = [];
        for (i = startIndex; i <= 5; i++) {
            starsVar.push(
                <Icon
                    name="star-border"
                    color={
                        props.isBeingRated
                            ? Color.smallTextOnStarColorBackground
                            : Color.starColor
                    }
                    size={
                        props.isRateCard
                            ? Layout.bigStarIconSize
                            : Layout.starIconSize
                    }
                    key={i}
                />
            );
        }
        return starsVar;
    };

    if (5 - Math.ceil(rating)) {
        starsVar = starsVar.concat(addEmptyStars(Math.ceil(rating) + 1));
    }

    useEffect(() => {
        setStars(starsVar);
    }, []);

    const handleStarPress = async index => {
        var starsVar = [];
        starsVar = addFullStars(index + 1);
        starsVar = starsVar.concat(addEmptyStars(index + 2));
        setStars(starsVar);
        props.onStarPress(index + 1);
    };

    return (
        <View style={[styles.container]}>
            {props.isRateCard ? null : (
                <View style={styles.ratingContainer}>
                    <Header
                        style={{
                            color: Color.secondaryColor,
                            fontFamily: 'asap-semibold',
                        }}
                    >
                        {rating}
                    </Header>
                </View>
            )}
            <View style={styles.starsVar}>
                {stars.map((value, index) => {
                    return (
                        <Touchable
                            onPress={() => {
                                handleStarPress(index);
                            }}
                            style={styles.ratingContainer}
                        >
                            {value}
                        </Touchable>
                    );
                })}
            </View>
            {props.isRateCard ? null : (
                <View style={styles.ratingContainer}>
                    <SmallContent style={{ color: Color.secondaryColor }}>
                        (103)
                    </SmallContent>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0,
    },
    starsVar: {
        paddingHorizontal: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Rating;
