import React from 'react';
import { FlatList } from 'react-native';

import JobCard from './JobCard';
import Touchable from '../../common/Touchable';
import Layout from '../../../constants/Layout';
import LineDescription from '../../common/LineDescription';
import { View } from 'react-native';
import EndOfPageSpace from '../../layout/EndOfPageSpace';

const JobList = props => {
    const renderItem = ({ item, index }) => {
        return (
            <View>
                {props.showSecondTitleAtElementWithIndex === index && (
                    <LineDescription text="Closed jobs" />
                )}
                <Touchable
                    isCard={true}
                    style={{ flex: 0 }}
                    onPress={() => props.onCardPress(item.id)}
                >
                    <JobCard
                        userId={item.userId}
                        date={item.date}
                        occupationId={item.occupationId}
                        workTypeId={item.workTypeId}
                        jobDescription={item.jobDescription}
                        customerType={item.customerType}
                        propertyType={item.propertyType}
                        jobAddress={item.jobAddress}
                        startTimeId={item.startTimeId}
                    />
                </Touchable>
            </View>
        );
    };

    return (
        <FlatList
            keyExtractor={(item, i) => `key-${i}`}
            data={props.list}
            renderItem={renderItem}
            style={{ flex: 1 }}
            contentContainerStyle={{
                paddingHorizontal: Layout.screenHorizontalPadding,
            }}
            ListHeaderComponent={() => (
                <LineDescription
                    text={props.title ? props.title : 'Opened jobs'}
                />
            )}
            ListFooterComponent={() => <EndOfPageSpace />}
        />
    );
};
export default JobList;
