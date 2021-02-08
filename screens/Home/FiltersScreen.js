import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import ScrollableContainer from '../../components/containers/ScrollableContainer';
import Color from '../../constants/Color';
import Line from '../../components/common/Line';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import Rating from '../../components/cards/Tradesperson/Rating';
import Grid from '../../components/layout/Grid';
import LineDescription from '../../components/common/LineDescription';
import { DISTANCE } from '../../data/Jobs/Distance';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetFiltersForCustomer,
    searchAllTradespeople,
    setFiltersForCustomer,
} from '../../store/actions/tradespeople';
import {
    resetFiltersForTradesperson,
    searchAllJobs,
    setFiltersForTradesperson,
} from '../../store/actions/job';
import HeaderRight from '../../components/navigation/HeaderRight';

const FiltersScreen = props => {
    const filters = useSelector(state => state.tradespeople.filters);
    const input = useSelector(state => state.ui.searchBarText);

    const [tradespersonFilters, setTradespersonFilters] = useState({
        occupationId: filters.occupationId,
        distance: filters.distance,
        rating: filters.rating,
    });

    const filtersJob = useSelector(state => state.job.filters);

    const [jobFilters, setJobFilters] = useState({
        occupationId: filtersJob.occupationId,
        distance: filtersJob.distance,
    });

    const dispatch = useDispatch();
    const userType = useSelector(state => state.auth.userType);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <HeaderRight
                        onPress={() => {
                            if (userType === 'customer') {
                                dispatch(resetFiltersForCustomer());
                                input !== '' &&
                                    input !== null &&
                                    dispatch(searchAllTradespeople(input));
                                props.navigation.goBack();
                            } else {
                                dispatch(resetFiltersForTradesperson());
                                input !== '' &&
                                    input !== null &&
                                    dispatch(searchAllJobs(input));
                                props.navigation.goBack();
                            }
                        }}
                        iconName="filter-remove"
                    />
                    <HeaderRight
                        onPress={() => {
                            if (userType === 'customer') {
                                dispatch(
                                    setFiltersForCustomer(
                                        tradespersonFilters.occupationId,
                                        tradespersonFilters.distance,
                                        tradespersonFilters.rating
                                    )
                                );
                                props.navigation.goBack();
                            } else {
                                dispatch(
                                    setFiltersForTradesperson(
                                        jobFilters.occupationId,
                                        jobFilters.distance
                                    )
                                );
                                props.navigation.goBack();
                            }
                        }}
                        iconName="check"
                    />
                </View>
            ),
        });
    }, []);

    return (
        <ScrollableContainer
            style={{ backgroundColor: Color.secondaryBrandColor }}
        >
            {userType === 'customer' ? (
                <View>
                    <LineDescription text="Occupation" />
                    <Line style={{ flex: 0 }}>
                        <Grid
                            data={OCCUPATIONS}
                            onPress={index => {
                                const updatedFilters = tradespersonFilters;
                                updatedFilters.occupationId = index + 1;
                                setTradespersonFilters(updatedFilters);
                            }}
                            initialSelectedIndexes={[
                                tradespersonFilters.occupationId,
                            ]}
                            activeBackgroundColor={
                                Color.textOnTertiaryColorBackground
                            }
                            backgroundColor="#807ddb"
                            activeTextColor={Color.secondaryBrandColor}
                            textColor={
                                Color.importantTextOnTertiaryColorBackground
                            }
                        />
                    </Line>
                    <LineDescription text="Distance" />
                    <Line style={{ flex: 0 }}>
                        <Grid
                            data={DISTANCE}
                            onPress={index => {
                                const updatedFilters = tradespersonFilters;
                                updatedFilters.distance = index;
                                setTradespersonFilters(updatedFilters);
                            }}
                            initialSelectedIndexes={[
                                tradespersonFilters.distance,
                            ]}
                            activeBackgroundColor={
                                Color.textOnTertiaryColorBackground
                            }
                            backgroundColor="#807ddb"
                            activeTextColor={Color.secondaryBrandColor}
                            textColor={
                                Color.importantTextOnTertiaryColorBackground
                            }
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
                                const updatedFilters = tradespersonFilters;
                                updatedFilters.rating = index;
                                setTradespersonFilters(updatedFilters);
                            }}
                            spread={true}
                        />
                    </Line>
                </View>
            ) : (
                <View>
                    <LineDescription text="Occupation" />
                    <Line style={{ flex: 0 }}>
                        <Grid
                            data={OCCUPATIONS}
                            onPress={index => {
                                const updatedFilters = jobFilters;
                                updatedFilters.occupationId = index + 1;
                                setJobFilters(updatedFilters);
                            }}
                            initialSelectedIndexes={[jobFilters.occupationId]}
                            activeBackgroundColor={
                                Color.textOnTertiaryColorBackground
                            }
                            backgroundColor="#807ddb"
                            activeTextColor={Color.secondaryBrandColor}
                            textColor={
                                Color.importantTextOnTertiaryColorBackground
                            }
                        />
                    </Line>
                    <LineDescription text="Distance" />
                    <Line style={{ flex: 0 }}>
                        <Grid
                            data={DISTANCE}
                            onPress={index => {
                                const updatedFilters = jobFilters;
                                updatedFilters.distance = index;
                                setJobFilters(updatedFilters);
                            }}
                            initialSelectedIndexes={[jobFilters.distance]}
                            activeBackgroundColor={
                                Color.textOnTertiaryColorBackground
                            }
                            backgroundColor="#807ddb"
                            activeTextColor={Color.secondaryBrandColor}
                            textColor={
                                Color.importantTextOnTertiaryColorBackground
                            }
                        />
                    </Line>
                </View>
            )}
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default FiltersScreen;
