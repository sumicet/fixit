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
import SmallBubble from '../../common/SmallBubble';
import { OCCUPATIONS } from '../../../data/Jobs/Occupations';
import SmallBoldContent from '../../text/SmallBoldContent';
import Header from '../../text/Header';
import { ClipPath } from 'react-native-svg';
import SmallContent from '../../text/SmallContent';
import Quotes from './Quotes';
import Bubble from '../../common/Bubble';

const JobCard = props => {
    const street = useSelector(state => state.auth.streetAddress);
    const user_place_id = street && street.place_id;
    const [distance, setDistance] = useState();
    const userType = useSelector(state => state.auth.userType);
    const currentUserId = useSelector(state => state.auth.userId);

    const {
        userId,
        occupationId,
        workTypeId,
        jobDescription,
        jobAddress,
        startTimeId,
    } = props;
    const date = new Date(props.date);

    useEffect(() => {
        user_place_id && jobAddress
            ? getText(user_place_id, jobAddress.place_id).then(result => {
                  //TODO make sure u get props.stree.. from the other comp
                  setDistance(result);
              })
            : setDistance('N/A');
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <View style={{ paddingBottom: 10 }}>
                    <PostedBy userId={userId} date={date} userType={userType} />
                </View>
                <View
                    style={{ paddingBottom: 10, flex: 0, flexDirection: 'row' }}
                >
                    <Bubble
                        text={
                            OCCUPATIONS.find(oc => oc.id === occupationId)?.name
                        }
                    />
                    <Bubble
                        text={
                            WORK_TYPES.find(
                                work =>
                                    work.id === workTypeId &&
                                    work.occupationId === occupationId
                            )?.name
                        }
                        style={{
                            backgroundColor: Color.secondaryBrandColor,
                            marginLeft: 10,
                        }}
                    />
                </View>

                <View style={{ paddingBottom: 10 }}>
                    <SmallContentWithEllipsis
                        style={{ color: Color.textOnTertiaryColorBackground }}
                    >
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
                    {userType === 'customer' ? (
                        <Quotes quotes={5} />
                    ) : (
                        <Location distance={distance} />
                    )}
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
        marginBottom: Layout.screenHorizontalPadding,
        backgroundColor: Color.textField,
        padding: Layout.screenHorizontalPadding,
    },
});

export default JobCard;
