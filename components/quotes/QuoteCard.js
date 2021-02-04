import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Trash from 'react-native-vector-icons/Foundation';
import Pending from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { WORK_TYPES } from '../../data/Jobs/WorkTypes';
import Bubble from '../common/Bubble';
import Touchable from '../common/Touchable';
import Header from '../text/Header';
import HeaderWithEllipsis from '../text/HeaderWithEllipsis';
import SmallContent from '../text/SmallContent';
import SmallContentWithEllipsis from '../text/SmallContentWithEllipsis';
import RequestPending from '../../assets/icons/Card/RequestPending';
import Rating from '../cards/Tradesperson/Rating';
import RelativeTime from '../common/RelativeTime';

const QuoteCard = props => {
    const userType = props.userType;

    const { quote, isRequest } = props;

    const job =
        userType === 'tradesperson'
            ? useSelector(state => state.job.allJobs).find(
                  job => job.id === quote.jobId
              )
            : useSelector(state => state.job.userPendingJobs).find(
                  job => job.id === quote.jobId
              );

    const tradesperson =
        userType === 'customer' &&
        useSelector(state => state.tradespeople.all).find(
            tp => tp.userId === quote.tradespersonId
        );

    const customerId = useSelector(state => state.job.allJobs).find(
        job => job.id === quote.jobId
    ).userId;

    const name =
        userType === 'tradesperson'
            ? useSelector(state => state.customers.all).find(
                  customer => customer.userId === customerId
              ).name
            : tradesperson?.name;

    return (
        <Touchable
            style={{
                flex: 0,
                borderRadius: Layout.borderRadius,
                backgroundColor: Color.textField,
            }}
            onPress={() => {
                props.onQuotePress(quote);
            }} //customer => go to tp profile ~~~ tp => go to job
        >
            <View
                style={{
                    //padding: Layout.screenHorizontalPadding,
                    borderRadius: Layout.borderRadius,
                    backgroundColor: '#2e2b6b',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: Layout.screenHorizontalPadding,
                        paddingBottom: isRequest //HERE
                            ? Layout.screenHorizontalPadding
                            : 10,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: Layout.screenHorizontalPadding,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                paddingRight: Layout.screenHorizontalPadding,
                            }}
                        >
                            <HeaderWithEllipsis
                                style={{
                                    color:
                                        Color.importantTextOnTertiaryColorBackground,
                                }}
                            >
                                {userType === 'tradesperson' && 'To: '}
                                {name}
                            </HeaderWithEllipsis>
                        </View>
                        {userType === 'customer' && (
                            <View style={{ flex: 0 }}>
                                <RelativeTime
                                    date={new Date(quote.date)}
                                    size="medium"
                                    textColor={
                                        Color.textOnTertiaryColorBackground
                                    }
                                />
                            </View>
                        )}
                    </View>
                    {userType === 'tradesperson' && (
                        <View
                            style={{
                                flex: 0,
                                flexDirection: 'row',
                            }}
                        >
                            <Touchable
                                style={{
                                    flex: 0,
                                    paddingRight:
                                        Layout.screenHorizontalPadding / 2,
                                    paddingLeft: Layout.screenHorizontalPadding,
                                }}
                                onPress={() => {
                                    props.onQuoteEdit(quote);
                                }}
                            >
                                <View style={styles.iconContainer}>
                                    <Icon
                                        name="edit"
                                        color={
                                            Color.importantTextOnTertiaryColorBackground
                                        }
                                        size={Layout.menuIconSize}
                                    />
                                </View>
                            </Touchable>
                            <Touchable
                                style={{
                                    flex: 0,
                                    paddingLeft:
                                        Layout.screenHorizontalPadding / 2,
                                    paddingRight:
                                        Layout.screenHorizontalPadding,
                                }}
                                onPress={() => {
                                    props.onQuoteDelete(quote);
                                }}
                            >
                                <View style={styles.iconContainer}>
                                    <Trash
                                        name="trash"
                                        color={
                                            Color.importantTextOnTertiaryColorBackground
                                        }
                                        size={Layout.menuIconSize}
                                    />
                                </View>
                            </Touchable>
                        </View>
                    )}
                </View>

                <View
                    style={{
                        borderRadius: Layout.borderRadius,
                        paddingHorizontal: Layout.screenHorizontalPadding,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingBottom: 10, //HERE
                            alignItems: 'center',
                        }}
                    >
                        {userType === 'customer' ? (
                            <Rating
                                rating={tradesperson.rating}
                                ratingVotesAmount={
                                    tradesperson.ratingVotesAmount
                                }
                                readOnly={true}
                                color={Color.textOnTertiaryColorBackground}
                            />
                        ) : (
                            <View style={{ flex: 0, flexDirection: 'row' }}>
                                <SmallContent
                                    style={{
                                        color:
                                            Color.textOnTertiaryColorBackground,
                                    }}
                                >
                                    Sent{' '}
                                </SmallContent>
                                <RelativeTime
                                    date={new Date(quote.date)}
                                    size="medium"
                                    textColor={
                                        Color.textOnTertiaryColorBackground
                                    }
                                />
                            </View>
                        )}

                        {!isRequest ? (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    paddingLeft: Layout.screenHorizontalPadding,
                                }}
                            >
                                <Header
                                    style={{
                                        textAlign: 'left',
                                        color:
                                            Color.importantTextOnTertiaryColorBackground,
                                    }}
                                >
                                    {quote.price.value}
                                    {quote.price.currency}
                                </Header>
                            </View>
                        ) : (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <View
                                    style={{
                                        paddingRight: Layout.generalPadding,
                                        color:
                                            Color.textOnTertiaryColorBackground,
                                    }}
                                >
                                    <SmallContent>Pending</SmallContent>
                                </View>
                                <RequestPending />
                            </View>
                        )}
                    </View>
                    {!isRequest && (
                        <View
                            style={{
                                flex: 1,
                                paddingBottom: Layout.screenHorizontalPadding,
                            }}
                        >
                            <SmallContent
                                style={{
                                    color: Color.textOnTertiaryColorBackground,
                                }}
                            >
                                {quote.message}
                            </SmallContent>
                        </View>
                    )}
                </View>
            </View>

            <View
                style={{
                    padding: Layout.screenHorizontalPadding,
                    borderBottomLeftRadius: Layout.borderRadius,
                    borderBottomRightRadius: Layout.borderRadius,
                }}
            >
                <View
                    style={{ paddingBottom: 10, flex: 0, flexDirection: 'row' }}
                >
                    <Bubble
                        text={
                            OCCUPATIONS.find(oc => oc.id === job.occupationId)
                                ?.name
                        }
                    />
                    <Bubble
                        text={
                            WORK_TYPES.find(
                                work =>
                                    work.id === job.workTypeId &&
                                    work.occupationId === job.occupationId
                            )?.name
                        }
                        style={{
                            backgroundColor: Color.secondaryBrandColor,
                            marginLeft: 10,
                        }}
                    />
                </View>

                <View>
                    <SmallContentWithEllipsis
                        style={{ color: Color.textOnTertiaryColorBackground }}
                    >
                        {job.jobDescription}
                    </SmallContentWithEllipsis>
                </View>
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Layout.screenHorizontalPadding,
    },
});

export default QuoteCard;
