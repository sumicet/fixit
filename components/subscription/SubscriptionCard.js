import React from 'react';
import { StyleSheet } from 'react-native';
import Header from '../../components/text/Header';
import SmallContent from '../../components/text/SmallContent';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Touchable from '../../components/common/Touchable';
import { LinearGradient } from 'expo-linear-gradient';

const SubscriptionCard = props => {
    return (
        <Touchable onPress={() => {}} style={{ flex: 0 }} isCard={true}>
            <LinearGradient
                colors={['#8E2DE2', '#4A00E0']}
                start={[0, 0]}
                end={[1, 1]}
                style={{
                    flex: 0,
                    borderRadius: Layout.borderRadius,
                    padding: Layout.generalPadding,
                }}
            >
                <Header style={{ color: Color.primaryColor, fontSize: 25 }}>
                    Become a member!
                </Header>
                <SmallContent
                    style={{
                        color: Color.primaryColor,
                        textAlign: 'center',
                    }}
                >
                    Join now to unlock unlimited daily quotes, recommendations
                    and much more.
                </SmallContent>
            </LinearGradient>
        </Touchable>
    );
};

export default SubscriptionCard;
