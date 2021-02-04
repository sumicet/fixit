import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import ScrollableContainer from '../../components/containers/ScrollableContainer';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Line from '../../components/common/Line';
import SmallContent from '../../components/text/SmallContent';
import Touchable from '../../components/common/Touchable';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { PROPERTY_TYPES } from '../../data/Jobs/PropertyTypes';
import Header from '../../components/text/Header';
import Dropdown from '../../components/dropdown/Dropdown';
import Rating, {
    addFullStars,
} from '../../components/cards/Tradesperson/Rating';
import MediumButton from '../../components/buttons/MediumButtom';
import Grid from '../../components/layout/Grid';
import LineDescription from '../../components/common/LineDescription';
import AlertWithContent from '../../components/alert/AlertWithContent';
import { DISTANCE } from '../../data/Jobs/Distance';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetFiltersForCustomer,
    setFiltersForCustomer,
} from '../../store/actions/tradespeople';

const SearchScreen = props => {
    const filters = useSelector(state => state.tradespeople.filters);

    const [tradespersonFilters, setTradespersonFilters] = useState({
        occupationId: filters.occupationId,
        distance: filters.distance,
        rating: filters.rating,
    });

    const dispatch = useDispatch();
    const userType = useSelector(state => state.auth.userType);

    return (
        <ScrollableContainer>
            {userType === 'customer' ? (
                <View>
                    <Line style={{ flex: 0, flexDirection: 'row' }}>
                        <Touchable
                            style={{
                                flex: 0,
                            }}
                            onPress={() => {
                                dispatch(resetFiltersForCustomer());
                                props.navigation.goBack();
                            }}
                        >
                            <Icon
                                name="reload1"
                                size={Layout.menuIconSize}
                                color={
                                    Color.importantTextOnTertiaryColorBackground
                                }
                            />
                        </Touchable>
                        <View style={{ flex: 1 }}>
                            <Header
                                style={{
                                    color:
                                        Color.importantTextOnTertiaryColorBackground,
                                }}
                            >
                                Filters
                            </Header>
                        </View>
                        <Touchable
                            style={{
                                flex: 0,
                            }}
                            onPress={() => {
                                dispatch(
                                    setFiltersForCustomer(
                                        tradespersonFilters.occupationId,
                                        tradespersonFilters.distance,
                                        tradespersonFilters.rating
                                    )
                                );
                                props.navigation.goBack();
                            }}
                        >
                            <Icon
                                name="check"
                                size={Layout.mediumButtonIconSize}
                                color={
                                    Color.importantTextOnTertiaryColorBackground
                                }
                            />
                        </Touchable>
                    </Line>
                    <LineDescription text="Occupation" />
                    <Line style={{ flex: 0 }}>
                        <Grid
                            data={OCCUPATIONS}
                            onPress={index => {
                                setTradespersonFilters({
                                    occupationId: index + 1,
                                    distance: tradespersonFilters.distance,
                                    rating: tradespersonFilters.rating,
                                });
                            }}
                            initialSelectedIndexes={[
                                tradespersonFilters.occupationId,
                            ]}
                        />
                    </Line>
                    <LineDescription text="Distance" />
                    <Line style={{ flex: 0 }}>
                        <Grid
                            data={DISTANCE}
                            onPress={index => {
                                setTradespersonFilters({
                                    occupationId:
                                        tradespersonFilters.occupationId,
                                    distance: index,
                                    rating: tradespersonFilters.rating,
                                });
                            }}
                            initialSelectedIndexes={[
                                tradespersonFilters.distance,
                            ]}
                        />
                    </Line>
                    <LineDescription text="Minimum rating" />
                    <Line
                        style={{
                            flex: 0,
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <Rating
                            isRateCard={true}
                            rating={tradespersonFilters.rating}
                            onStarPress={index => {
                                setTradespersonFilters({
                                    ...tradespersonFilters,
                                    rating: index,
                                });
                            }}
                            spread={true}
                        />
                    </Line>
                </View>
            ) : null}
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default SearchScreen;
