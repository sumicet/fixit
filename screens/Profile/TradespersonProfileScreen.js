import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';

import ScrollableContainer from '../../components/containers/ScrollableContainer';
import SubscriptionCard from '../../components/subscription/SubscriptionCard';
import TextField from '../../components/text/TextField';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import BoldContent from '../../components/text/BoldContent';
import Content from '../../components/text/Content';

const ProfileScreen = props => {

    class ProfileData {
        constructor(id, value, description, onChange, onPress) {
            this.id = id;
            this.value = value;
            this.description = description;
        }
    }

    var profileDataArray = [];
    profileDataArray.push(
        new ProfileData(
            0,
            'John McCormack',
            'Full name:',
        )
    );
    profileDataArray.push(
        new ProfileData(
            1,
            'johnmccormack@gmail.com',
            'Email:',
        )
    );
    profileDataArray.push(
        new ProfileData(
            2,
            '*******',
            'Password:',
        )
    );
    profileDataArray.push(
        new ProfileData(
            3,
            '0757570851',
            'Phone number:',
        )
    );
    profileDataArray.push(
        new ProfileData(
            4,
            'Plumber',
            'Occupation:',
        )
    );
    profileDataArray.push(
        new ProfileData(
            5,
            'Residential',
            'Work type:',
        )
    );
    profileDataArray.push(
        new ProfileData(
            6,
            '10y',
            'Experience:',
        )
    );
    profileDataArray.push(
        new ProfileData(
            7,
            'Roady Road 666',
            'Street address:',
        )
    );
    
    

    return (
        <ScrollableContainer>
            <View
                style={{
                    height: '100%',
                    backgroundColor: Color.textField,
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
                        {profileDataArray.map(elem => {
                            return (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingBottom: Layout.generalMargin
                                    }}
                                >
                                    <View style={{width: 110, marginRight: Layout.generalMargin}}>
                                    <BoldContent>
                                        {elem.description}
                                    </BoldContent>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <Content>{elem.value}</Content>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
