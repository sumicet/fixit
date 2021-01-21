import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Trash from 'react-native-vector-icons/Foundation';

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

const QuoteCard = props => {
    const userType = props.userType;

    const quote = props.quote;

    const job = useSelector(state => state.job.allJobs).find(
        job => job.id === quote.jobId
    );

    const name = useSelector(state => state.auth.name);

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
                        paddingBottom: 10,
                        alignItems: 'center',
                        paddingTop: Layout.screenHorizontalPadding,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: Layout.screenHorizontalPadding,
                            
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
                                {name}
                            </HeaderWithEllipsis>
                        </View>
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
                        alignItems: 'center',
                        borderRadius: Layout.borderRadius,
                        flexDirection: 'row',
                        paddingHorizontal: Layout.screenHorizontalPadding,
                        paddingBottom: Layout.screenHorizontalPadding,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <SmallContent
                            style={{
                                color: Color.textOnTertiaryColorBackground,
                            }}
                        >
                            {quote.message}
                        </SmallContent>
                    </View>
                    <View
                        style={{
                            flex: 0,
                            alignItems: 'center',
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
