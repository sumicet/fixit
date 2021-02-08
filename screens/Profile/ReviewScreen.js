import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';
import Rating from '../../components/cards/Tradesperson/Rating';
import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import Line from '../../components/common/Line';
import Container from '../../components/containers/Container';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import Header from '../../components/text/Header';
import TextField from '../../components/text/TextField';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Touchable from '../../components/common/Touchable';
import LineDescription from '../../components/common/LineDescription';
import SmallContent from '../../components/text/SmallContent';
import { setInAppNotification } from '../../store/actions/ui';
import { ERROR, SUCCESS } from '../../constants/Actions';
import { addReview } from '../../store/actions/reviews';

const ReviewScreen = props => {
    const oldReview = props.route.params && props.route.params.oldReview;
    const [text, setText] = useState(oldReview && oldReview.comment);
    const [rating, setRating] = useState(oldReview && oldReview.rating);

    const tradesperson = props.route.params && props.route.params.tradesperson;
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();

    const handleSubmitPress = () => {
        if (!rating) {
            dispatch(
                setInAppNotification(
                    'Please leave a rating.',
                    'This field cannot be empty.',
                    ERROR
                )
            );
        } else {
            dispatch(addReview(userId, tradesperson.userId, rating, text));
            dispatch(
                setInAppNotification(
                    'Success!',
                    'Thank you for submitting a review.',
                    SUCCESS
                )
            );
            props.navigation.goBack();
        }
    };

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Touchable
                    style={{ flex: 0, paddingRight: 15 }}
                    onPress={handleSubmitPress}
                >
                    <Icon
                        name="check"
                        size={28}
                        color={Color.importantTextOnTertiaryColorBackground}
                    />
                </Touchable>
            ),
        });
    });

    return (
        <ScrollableContainer>
            <TradespersonCard
                userId={tradesperson.userId}
                name={tradesperson.name}
                occupationsIds={tradesperson.occupationsIds}
                streetAddress={tradesperson.streetAddress}
                experienceId={tradesperson.experienceId}
                insurance={tradesperson.insurance}
                rating={tradesperson.rating}
                ratingVotesAmount={tradesperson.ratingVotesAmount}
                recommendedByIds={tradesperson.recommendedByIds}
                profilePicture={tradesperson.profilePicture}
                phoneNumber={tradesperson.phoneNumber}
                distance={tradesperson.distance}
                readOnly={true}
            />
            <LineDescription
                text="Please rate your experience."
                style={{ paddingTop: Layout.screenHorizontalPadding }}
            />
            <Line
                style={{
                    flex: 0,
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                <Rating
                    isRateCard={true}
                    rating={oldReview ? oldReview.rating : 0}
                    onStarPress={index => {
                        setRating(index);
                    }}
                    spread={true}
                />
            </Line>
            <LineDescription text="Describe what happened.">
                <SmallContent>This is optional.</SmallContent>
            </LineDescription>
            <Line style={{ flex: 0 }}>
                <TextField
                    value={text}
                    onChangeText={input => {
                        setText(input);
                    }}
                    placeholder="Let your inner keyboard warrior come out!"
                    multiline={true}
                    minHeight={200}
                    maxHeight={200}
                    textAlignVertical="top"
                />
            </Line>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default ReviewScreen;
