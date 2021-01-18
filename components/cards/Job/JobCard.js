import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Layout from '../../../constants/Layout';
import Color from '../../../constants/Color';
import SmallContentWithEllipsis from '../../text/SmallContentWithEllipsis';
import Occupations from '../Tradesperson/Occupations';
import Location from '../Tradesperson/Location';
import StartTime from './StartTime';
import PostedBy from './PostedBy';
import { WORK_TYPES } from '../../../data/Jobs/WorkTypes';
import { getText } from '../../../actions/distance';
import { useSelector } from 'react-redux';

const JobCard = props => {
    const user_place_id = useSelector(state => state.auth.streetAddress)
        .place_id;
    const [distance, setDistance] = useState();

    const {
        userId,
        occupationId,
        workTypeId,
        jobDescription,
        customerType,
        propertyType,
        jobAddress,
        startTimeId,
    } = props;
    const date = new Date(props.date);

    useEffect(() => {
        user_place_id && jobAddress
            ? getText(user_place_id, jobAddress.place_id).then(
                  result => {
                      //TODO make sure u get props.stree.. from the other comp
                      setDistance(result);
                  }
              )
            : setDistance('N/A');
    }, []);

    

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <PostedBy date={date} />
                <View style={{ paddingBottom: 5, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Occupations
                            occupationsIds={[occupationId]}
                            isTitle={true}
                        />
                    </View>
                </View>
                <View style={{ paddingBottom: 5 }}>
                    <SmallContentWithEllipsis
                        style={{ fontFamily: 'Asap-SemiBold' }}
                    >
                        {
                            WORK_TYPES.find(
                                work =>
                                    work.id === workTypeId &&
                                    work.occupationId === occupationId
                            )?.name
                        }
                    </SmallContentWithEllipsis>
                </View>

                <View style={{ paddingBottom: 5 }}>
                    <SmallContentWithEllipsis>
                        {jobDescription}
                    </SmallContentWithEllipsis>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Location distance={distance} />
                    <View style={{ paddingLeft: Layout.generalPadding }}>
                        <StartTime startTimeId={startTimeId} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        borderRadius: Layout.borderRadius,
        marginVertical: Layout.cardMargin,
        backgroundColor: Color.textField,
        padding: Layout.generalPadding,
    },
});

export default JobCard;
