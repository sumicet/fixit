import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import SmallContent from '../../text/SmallContent';
import Header from '../../text/Header';
import Touchable from '../../common/Touchable';

export const addFullStars = (count, isRateCard, size) => {
    var starsVar = [];
    var i;
    for (i = 1; i <= count; i++) {
        starsVar.push(
            <Icon
                name="star"
                color={Color.starColor}
                size={
                    isRateCard
                        ? Layout.bigStarIconSize
                        : size === 'medium'
                        ? 25
                        : Layout.starIconSize
                }
                key={i}
            />
        );
    }
    return starsVar;
};

const Rating = props => {
    const rating =
        typeof props.rating === 'undefined'
            ? 0
            : Math.round(props.rating * 10) / 10 > 5
            ? 5
            : Math.round(props.rating * 10) / 10; // get the rating with one decimal

    const StarContainer = props => {
        return (
            <View>
                {props.readOnly ? (
                    <View style={styles.ratingContainer}>{props.children}</View>
                ) : (
                    <Touchable
                        onPress={() => {
                            handleStarPress(props.index);
                        }}
                        style={styles.ratingContainer}
                    >
                        {props.children}
                    </Touchable>
                )}
            </View>
        );
    };

    var starsVar = [];
    const [stars, setStars] = useState([]);

    var i;

    starsVar = addFullStars(Math.floor(rating), props.isRateCard, props.size);

    if (Math.floor(rating) != Math.ceil(rating)) {
        starsVar.push(
            <Icon
                name="star-half"
                color={Color.starColor}
                size={
                    props.isRateCard
                        ? Layout.bigStarIconSize
                        : props.size === 'medium'
                        ? 24
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
                    color={Color.starColor}
                    size={
                        props.isRateCard
                            ? Layout.bigStarIconSize
                            : props.size === 'medium'
                            ? 24
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
        starsVar = addFullStars(index + 1, props.isRateCard, props.size);
        starsVar = starsVar.concat(addEmptyStars(index + 2));
        setStars(starsVar);
        props.onStarPress(index + 1);
    };

    const Content = props => {
        return props.size === 'medium' ? (
            <Header {...props}>{props.children}</Header>
        ) : (
            <SmallContent {...props}>{props.children}</SmallContent>
        );
    };

    return (
        <View
            style={[
                styles.container,
                props.spread && { width: '100%', justifyContent: 'center' },
            ]}
        >
            {!props.isRateCard && (
                <View style={[styles.ratingContainer]}>
                    <Content
                        style={{
                            color: props.color ? props.color : Color.starColor,
                            fontFamily: 'SemiBold',
                        }}
                    >
                        {rating !== 0 ? rating : 'N/A'}
                    </Content>
                </View>
            )}
            <View
                style={[
                    styles.starsVar,
                    props.spread && {
                        width: '80%',
                        justifyContent: 'space-around',
                    },
                ]}
            >
                {stars.map((value, index) => {
                    return (
                        <StarContainer readOnly={props.readOnly} index={index}>
                            {value}
                        </StarContainer>
                    );
                })}
            </View>
            {!props.isRateCard && !props.hideVotes && (
                <View style={styles.ratingContainer}>
                    <Content
                        style={{
                            color: props.color
                                ? props.color
                                : Color.secondaryColor,
                        }}
                    >
                        (
                        {props.ratingVotesAmount
                            ? props.ratingVotesAmount
                            : '0'}
                        )
                    </Content>
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
