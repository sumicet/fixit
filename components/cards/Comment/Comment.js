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

const Screen = props => {
    const name = useSelector(state => state.tradespeople.all).find(
        elem => elem.userId === props.review.userId
    ).name;

    return (
        <View style={styles.container}>
            <View style={[styles.line, { flexDirection: 'row' }]}>
                <View>
                    <SmallBoldContent
                        style={{
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    >
                        {name}
                    </SmallBoldContent>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Rating
                        rating={props.review.rating}
                        readOnly={true}
                        hideVotes={true}
                    />
                </View>
            </View>
            {props.review.comment && (
                <View style={styles.line}>
                    <SmallContent>{props.review.comment}</SmallContent>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: Color.textField,
        borderRadius: Layout.borderRadius,
        padding: Layout.generalPadding,
        marginBottom: Layout.cardMargin,
    },
    line: {
        paddingBottom: Layout.generalPadding / 2,
    },
});

export default Screen;
