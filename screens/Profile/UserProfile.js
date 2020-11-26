import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import SubscriptionCard from '../../components/subscription/SubscriptionCard';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../../components/text/SmallContent';
import SmallBoldContent from '../../components/text/SmallBoldContent';
import Header from '../../components/text/Header';
import Touchable from '../../components/common/Touchable';

const UserProfile = props => {
    class ProfileData {
        constructor(id, value, description, onChange, onPress) {
            this.id = id;
            this.value = value;
            this.description = description;
        }
    }

    var profileDataArray = [];
    profileDataArray.push(
        new ProfileData(0, 'johnmccormack@gmail.com', 'Email:')
    );
    profileDataArray.push(new ProfileData(1, '*******', 'Password:'));
    profileDataArray.push(new ProfileData(2, 'John McCormack', 'Full name:'));
    profileDataArray.push(new ProfileData(3, '0757570851', 'Phone number:'));
    profileDataArray.push(new ProfileData(4, 'Plumber', 'Occupation:'));
    profileDataArray.push(new ProfileData(5, 'Residential', 'Work type:'));
    profileDataArray.push(new ProfileData(6, '10y', 'Experience:'));
    profileDataArray.push(
        new ProfileData(7, 'Roady Road 666', 'Street address:')
    );

    const ProfileField = props => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: Layout.generalMargin,
                }}
            >
                <View style={{ width: 110, marginRight: Layout.generalMargin }}>
                    <SmallBoldContent>{props.description}</SmallBoldContent>
                </View>
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <SmallContent>{props.value}</SmallContent>
                </View>
            </View>
        );
    };

    const ProfileFieldSeparatorTitle = props => {
        return (
            <View
                style={{
                    marginBottom: Layout.generalMargin,
                    width: '100%',
                    flexDirection: 'row',
                }}
            >
                <Header style={{ textAlign: 'left' }}>{props.text}</Header>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Touchable style={{ flex: 0 }}>
                        <Icon
                            name="pencil"
                            color={Color.textColor}
                            size={Layout.menuIconSize}
                        />
                    </Touchable>
                </View>
            </View>
        );
    };

    return (
        <ScrollableContainer>
            <View
                style={{
                    height: '100%',
                    //backgroundColor: Color.textField,
                    borderRadius: Layout.borderRadius,
                }}
            >
                <SubscriptionCard />
                <View
                    style={{
                        marginTop: Layout.generalMargin,
                        paddingHorizontal: Layout.generalPadding,
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ marginBottom: Layout.generalMargin }}>
                            <ProfilePicture isLarge={true} />
                        </View>
                        <ProfileFieldSeparatorTitle text="Account information" />
                        {profileDataArray.map(elem =>
                            elem.id <= 1 ? (
                                <ProfileField
                                    id={elem.id}
                                    description={elem.description}
                                    value={elem.value}
                                />
                            ) : null
                        )}
                        <ProfileFieldSeparatorTitle text="Work information" />
                        {profileDataArray.map(elem =>
                            elem.id > 1 ? (
                                <ProfileField
                                    id={elem.id}
                                    description={elem.description}
                                    value={elem.value}
                                />
                            ) : null
                        )}
                    </View>
                </View>
            </View>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default UserProfile;
