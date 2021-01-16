import React, { useState } from 'react';
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
    const user_place_id = useSelector(state => state.tradesperson.streetAddress)
        .place_id;
    const [distance, setDistance] = useState();

    useEffect(() => {
        streetAddress
            ? getText(user_place_id, props.streetAddress.place_id).then(
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
                <PostedBy date={props.date} />
                <View style={{ paddingBottom: 5, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Occupations
                            occupationId={props.occupationId}
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
                                    work.id === props.workTypeId &&
                                    work.occupationId === props.occupationId
                            ).name
                        }
                    </SmallContentWithEllipsis>
                </View>

                <View style={{ paddingBottom: 5 }}>
                    <SmallContentWithEllipsis>
                        {props.jobDescription}
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
                        <StartTime startTimeId={props.startTimeId} />
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
