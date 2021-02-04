import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Layout from '../../../constants/Layout';
import Color from '../../../constants/Color';
import SmallContentWithEllipsis from '../../text/SmallContentWithEllipsis';
import Location from '../Tradesperson/Location';
import StartTime from './StartTime';
import PostedBy from './PostedBy';
import { WORK_TYPES } from '../../../data/Jobs/WorkTypes';
import { useSelector } from 'react-redux';
import { OCCUPATIONS } from '../../../data/Jobs/Occupations';
import SmallContent from '../../text/SmallContent';
import Quotes from './Quotes';
import Bubble from '../../common/Bubble';
import RelativeTime from '../../common/RelativeTime';
import { getText } from '../../../actions/distance';

const JobCard = props => {
    const street = useSelector(state => state.auth.streetAddress);
    const user_place_id = street && street.place_id;
    //const [distance, setDistance] = useState();
    const userType = useSelector(state => state.auth.userType);
    const currentUserId = useSelector(state => state.auth.userId);

    const {
        id,
        userId,
        occupationId,
        workTypeId,
        jobDescription,
        jobAddress,
        startTimeId,
        quotes,
        distance,
    } = props;

    const date = new Date(props.date);

    const request =
        props.showRequestInfo &&
        userType === 'tradesperson' &&
        useSelector(state => state.tradesperson.requests).find(
            req => req.jobId === id
        );

    const dist = getText(distance);

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
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {userType === 'customer' ? (
                            <Quotes quotes={quotes ? quotes.length + 1 : 0} />
                        ) : (
                            <Location distance={dist} />
                        )}
                        <View style={{ paddingLeft: Layout.generalPadding }}>
                            <StartTime startTimeId={startTimeId} date={date} />
                        </View>
                    </View>
                    {request && (
                        <View style={{ flex: 0, flexDirection: 'row' }}>
                            <SmallContent
                                style={{ color: Color.secondaryColor }}
                            >
                                Received{' '}
                            </SmallContent>
                            <RelativeTime
                                date={new Date(request.date)}
                                size="medium"
                                textColor={Color.secondaryColor}
                            />
                        </View>
                    )}
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
