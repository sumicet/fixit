import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
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
    const occupationId = 1;
    const workTypeId = 2;
    const jobDescription = 'I need to install an AC.';

    return (
        <Touchable
            style={{
                flex: 0,
                borderRadius: Layout.borderRadius,
                backgroundColor: Color.textField,
            }}
            onPress={() => {}} //customer => go to tp profile ~~~ tp => go to job
        >
            <View
                style={{
                    padding: Layout.screenHorizontalPadding,
                    borderRadius: Layout.borderRadius,
                    backgroundColor: '#2e2b6b',
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ paddingBottom: 10 }}>
                            <HeaderWithEllipsis
                                style={{
                                    color:
                                        Color.importantTextOnTertiaryColorBackground,
                                }}
                            >
                                John McCornmacker
                            </HeaderWithEllipsis>
                        </View>
                        <View>
                            <SmallContent
                                style={{
                                    color: Color.textOnTertiaryColorBackground,
                                }}
                            >
                                Hi there! The total cost will be 300$ as
                                mentioned above. The reparations bla bla bla.
                                Please give me a call if you're interested!
                            </SmallContent>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingLeft: Layout.screenHorizontalPadding,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: Layout.borderRadius,
                        }}
                    >
                        <Header
                            style={{
                                textAlign: 'left',
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                            }}
                        >
                            300$
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

                <View>
                    <SmallContentWithEllipsis
                        style={{ color: Color.textOnTertiaryColorBackground }}
                    >
                        {jobDescription}
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
