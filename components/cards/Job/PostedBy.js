import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Color from '../../../constants/Color';
import RelativeTime from '../../common/RelativeTime';
import SmallContent from '../../text/SmallContent';
import SuperSmallContent from '../../text/SuperSmallContent';

const PostedBy = props => {
    const postedByCurrentUser1 = useSelector(
        state => state.job.userPendingJobs
    ).find(job => job.userId === props.userId);
    const postedByCurrentUser2 = useSelector(
        state => state.job.userCompletedJobs
    ).find(job => job.userId === props.userId);

    const name =
        props.userType === 'tradesperson'
            ? props.userId &&
              useSelector(state => state.customers.all).find(
                  customer => customer.userId === props.userId
              )?.name
            : postedByCurrentUser1 || postedByCurrentUser2
            ? 'me'
            : props.userId &&
              useSelector(state => state.tradespeople.all).find(
                  tp => tp.userId === props.userId
              )?.name;
    console.log(props.date, name);
    return (
        <View style={{ paddingBottom: 2, flexDirection: 'row' }}>
            {props.size === 'medium' ? (
                <SmallContent
                    style={{
                        color: props.textColor
                            ? props.textColor
                            : Color.secondaryColor,
                    }}
                >
                    Posted by {name} •{' '}
                </SmallContent>
            ) : (
                <SuperSmallContent
                    style={{
                        color: props.textColor
                            ? props.textColor
                            : Color.secondaryColor,
                    }}
                >
                    Posted by {name} •{' '}
                </SuperSmallContent>
            )}
            <RelativeTime
                size={props.size}
                date={new Date(props.date)}
                textColor={props.textColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default PostedBy;
