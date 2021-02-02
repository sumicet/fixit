import React from 'react';
import { View, StyleSheet } from 'react-native';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import SmallContent from '../../text/SmallContent';
import SmallBoldContent from '../../text/SmallBoldContent';
import PostedBy from '../Job/PostedBy';
import Rating from '../Tradesperson/Rating';
import Line from '../../common/Line';
import { useSelector } from 'react-redux';

const Review = props => {
    const name = useSelector(state => state.customers.all).find(
        elem => elem.userId === props.review.userId
    )?.name;

    const date = new Date(props.review.date);

    return (
        <View style={styles.container}>
            <View
                style={[
                    props.review.comment && styles.line,
                    { flexDirection: 'row' },
                ]}
            >
                <View>
                    <Rating
                        rating={props.review.rating}
                        readOnly={true}
                        hideVotes={true}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <SmallContent>
                        {date.toLocaleString('default', {
                            month: 'short',
                        })}{' '}
                        {date.getDate()}, {date.getFullYear()}
                    </SmallContent>
                </View>
            </View>
            {props.review.comment && (
                <View style={styles.line}>
                    <SmallContent>{props.review.comment}</SmallContent>
                </View>
            )}
            <View style={styles.line}>
                <SmallBoldContent>
                    <SmallContent>By </SmallContent>
                    {name}
                </SmallBoldContent>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: Color.textField,
        borderRadius: Layout.borderRadius,
        padding: Layout.screenHorizontalPadding,
        marginBottom: Layout.cardMargin,
    },
    line: {
        paddingBottom: Layout.generalPadding / 2,
    },
});

export default Review;
