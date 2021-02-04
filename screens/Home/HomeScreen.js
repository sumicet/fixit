import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import Layout from '../../constants/Layout';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import LineDescription from '../../components/common/LineDescription';
import JobList from '../../components/cards/Job/JobList';
import EndOfPageSpace from '../../components/layout/EndOfPageSpace';
import Container from '../../components/containers/Container';
import CurrentLocation from '../../components/headers/CurrentLocation';

const HomeScreen = props => {
    const isFocused = useIsFocused();
    const userType = useSelector(state => state.auth.userType);
    const allTradespeople = useSelector(state => state.tradespeople.all);
    const allJobs = useSelector(state => state.job.allJobs);
    

    useEffect(() => {
        if (isFocused) {
            // TODO add notification
        }
    }, [props, isFocused]);

    const handleRequestQuote = (tradespersonId) => {
        props.navigation.navigate('HomeStackWithoutSearchBar', {
            screen: 'SelectJob',
            params: {
                tradespersonId
            }
        })
    }

    return (
        <Container
            style={{ paddingHorizontal: 0, paddingTop: 0, marginTop: 0 }}
        >
            {userType === 'tradesperson' ? (
                <JobList
                    title="Recommended jobs"
                    list={allJobs}
                    navigation={props.navigation}
                    onCardPress={id => {
                        props.navigation.navigate('HomeStackWithoutSearchBar', {
                            screen: 'JobDetails',
                            params: {
                                id,
                            },
                        });
                    }}
                />
            ) : (
                <FlatList
                    data={allTradespeople.filter(tp => tp.occupationsIds)}
                    style={{ flex: 1 }}
                    keyExtractor={(item, i) => `key-${i}`}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                height: Layout.screenHorizontalPadding,
                            }}
                        />
                    )}
                    ListHeaderComponent={() => (
                        <View>
                            <CurrentLocation />
                            <LineDescription
                                style={{
                                    paddingHorizontal:
                                        Layout.screenHorizontalPadding,
                                }}
                                text="Recommended tradespeople"
                            />
                        </View>
                    )}
                    ListFooterComponent={() => <EndOfPageSpace />}
                    renderItem={itemData => (
                        <View
                            style={{
                                paddingHorizontal:
                                    Layout.screenHorizontalPadding,
                            }}
                        >
                            <TradespersonCard
                                onRequestQuote={handleRequestQuote}
                                navigation={props.navigation}
                                userId={itemData.item.userId}
                                name={itemData.item.name}
                                occupationsIds={itemData.item.occupationsIds}
                                streetAddress={itemData.item.streetAddress}
                                experienceId={itemData.item.experienceId}
                                insurance={itemData.item.insurance}
                                rating={itemData.item.rating}
                                ratingVotesAmount={
                                    itemData.item.ratingVotesAmount
                                }
                                recommendedByIds={
                                    itemData.item.recommendedByIds
                                }
                                profilePicture={itemData.item.profilePicture}
                                phoneNumber={itemData.item.phoneNumber}
                                distance={itemData.item.distance}
                            />
                        </View>
                    )}
                />
            )}
        </Container>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
