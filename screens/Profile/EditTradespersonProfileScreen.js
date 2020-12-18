import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PhoneInput from '../../components/phoneNumberInput/index';
import MediumButton from '../../components/buttons/MediumButtom';
import CustomRadioButton from '../../components/common/CustomRadioButton';
import Line from '../../components/common/Line';
import LineDescription from '../../components/common/LineDescription';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import Grid from '../../components/layout/Grid';
import JobAddress from '../../components/quiz/JobAddress';
import SmallContent from '../../components/text/SmallContent';
import TextField from '../../components/text/TextField';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { PROPERTY_TYPES } from '../../data/Jobs/PropertyTypes';
import { EXPERIENCE } from '../../data/Tradesperson/Experience';
import Touchable from '../../components/common/Touchable';
import { useDispatch } from 'react-redux';
import { setTradespersonInfo } from '../../store/actions/tradesperson';

const EditTradespersonProfile = props => {
    const [occupations, setOccupations] = useState([]);
    const [jobAddressInput, setJobAddressInput] = useState({
        line1: null,
        place_id: null,
    });

    const action = props.route.params && props.route.params.action;

    const handleStreetAddressChange = (streetAddress, place_id) => {
        setJobAddressInput({
            line1: streetAddress,
            place_id: place_id, // TODO add place_id
        });
    };

    const [propertyTypesChecked, setPropertyTypesChecked] = useState([
        false,
        false,
        false,
    ]);

    const initialChecked = (data, value) => {
        const initialChecked = [];
        var i;
        for (i = 0; i < data.length; i++) {
            if (i === value) {
                initialChecked.push(true);
            }
            initialChecked.push(false);
        }
        return initialChecked;
    };

    const handleToggleCheck = (index, checked, setChecked) => {
        const updatedChecked = [...checked];
        var i;
        for (i = 0; i < updatedChecked.length; i++) {
            if (i !== index) {
                updatedChecked[i] = false;
            } else {
                updatedChecked[i] = true;
            }
        }
        setChecked(updatedChecked);
    };

    const [experienceChecked, setExperienceChecked] = useState(
        initialChecked(EXPERIENCE, 0)
    );

    const handleMultipleOptionsToggleCheck = (index, checked, setChecked) => {
        const updatedChecked = [...checked];
        updatedChecked[index] = !updatedChecked[index];
        setChecked(updatedChecked);
    };

    const [name, setName] = useState(null);

    const onChangeName = input => {
        setName(input);
    };

    const [schedule, setSchedule] = useState(null);

    const onChangeSchedule = input => {
        setSchedule(input);
    };

    const [insuranceChecked, setInsuranceChecked] = useState(false);

    const [profilePicture, setprofilePicture] = useState(
        'https://pbs.twimg.com/profile_images/740272510420258817/sd2e6kJy_400x400.jpg'
    );

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert(
                        'Sorry, we need camera roll permissions to make this work!'
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setprofilePicture(result.base64);
        }
    };

    const dispatch = useDispatch();

    const handleFinishPress = () => {
        const occupationsIds = occupations.map(id => id + 1);
        const experienceId =
            experienceChecked.findIndex(elem => elem === true) + 1;
        const propertyTypesIds = propertyTypesChecked
            .map((elem, index) => {
                if (elem) return index + 1;
            })
            .filter(elem => typeof elem !== 'undefined');
        const streetAddress = {
            line1: jobAddressInput.line1,
            place_id: jobAddressInput.place_id,
        };
        const insurance = insuranceChecked;

        dispatch(
            setTradespersonInfo(
                name,
                occupationsIds,
                streetAddress,
                experienceId,
                insurance,
                propertyTypesIds,
                profilePicture,
                phoneNumber
            )
        );

        // if (action === 'signup') {
        //     props.navigation.navigate('Home');
        // } else {
        //     props.navigation.navigate('TradespersonProfile');
        // }
    };

    const phoneInput = useRef();

    const [phoneNumber, setPhoneNumber] = useState();

    return (
        <ScrollableContainer
            //title={title}
            backgroundColor={Color.primaryColor}
        >
            <LineDescription text="What is your name?">
                <SmallContent>
                    This information will be displayed on your profile.
                </SmallContent>
            </LineDescription>
            <Line style={{ flex: 0 }}>
                <TextField
                    value={name}
                    onChangeText={input => {
                        onChangeName(input);
                    }}
                    placeholder="John McCormack"
                    autoCapitalize="words"
                    multiline={false}
                    textAlignVertical="center"
                />
            </Line>
            <LineDescription text="Add a profile picture. (optional)">
                <SmallContent>
                    Profile pictures have a positive impact on customers' first
                    impression of trustworthiness. It is not recommended to skip
                    this field.
                </SmallContent>
            </LineDescription>
            <Line style={{ flex: 0 }}>
                <Touchable
                    onPress={pickImage}
                    style={{ flex: 0, borderRadius: 100, overflow: 'hidden' }}
                >
                    <Image
                        source={{
                            uri: `data:image/gif;base64,${profilePicture}`,
                        }}
                        style={{ width: 80, height: 80 }}
                        resizeMethod="scale"
                    />
                </Touchable>
            </Line>
            <LineDescription text="Phone number.">
                <SmallContent>
                    This information will be displayed on your profile.
                </SmallContent>
            </LineDescription>
            <Line style={{ flex: 0 }}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="RO"
                    layout="first"
                    onChangeText={text => {
                        setPhoneNumber(text);
                    }}
                    containerStyle={{
                        borderRadius: Layout.borderRadius,
                        backgroundColor: Color.textField,
                        overflow: 'hidden',
                        width: '100%',
                    }}
                    textContainerStyle={{
                        backgroundColor: Color.textField,
                        paddingHorizontal: Layout.generalPadding,
                        paddingVertical: Layout.generalPadding,
                    }}
                    textInputStyle={{
                        color: Color.textColor,
                        fontFamily: 'Asap-Regular',
                    }}
                    renderDropdownImage={
                        <Icon
                            name="arrow-drop-down"
                            color={Color.textColor}
                            size={Layout.menuIconSize}
                        />
                    }
                    codeTextStyle={{
                        color: Color.textColor,
                        fontFamily: 'Asap-Regular',
                        marginRight: Layout.generalPadding,
                    }}
                    flagButtonStyle={{
                        backgroundColor: Color.textField,
                    }}
                    countryPickerButtonStyle={{
                        backgroundColor: Color.textField,
                    }}
                    placeholder="999-999-9999"
                    placeholderColor={Color.placeholderTextColor}
                    withDarkTheme
                />
            </Line>
            <LineDescription text="What is your occupation?">
                <SmallContent>You can select multiple options.</SmallContent>
            </LineDescription>
            <Line style={{ flex: 0 }}>
                <Grid
                    data={OCCUPATIONS}
                    onPress={index => {
                        if (occupations.includes(index)) {
                            const updatedOccupations = occupations.filter(
                                elem => elem !== index
                            );
                            setOccupations(updatedOccupations);
                        } else {
                            const updatedOccupations = occupations;
                            updatedOccupations.push(index);
                            setOccupations(updatedOccupations);
                        }
                    }}
                    //initialSelectedIndex={0}
                    multipleOptions={true}
                />
            </Line>
            <LineDescription text="Schedule.">
                <SmallContent>
                    Let your customers know when you are available. Keep it
                    short.
                </SmallContent>
            </LineDescription>
            <Line style={{ flex: 0 }}>
                <TextField
                    value={schedule}
                    onChangeText={input => {
                        onChangeSchedule(input);
                    }}
                    placeholder="Mo - Fr: 9am - 5pm, national holidays off"
                    autoCapitalize="sentences"
                    multiline={false}
                    textAlignVertical="center"
                />
            </Line>
            <LineDescription text="How much experience do you have in the selected field of work?">
                <SmallContent>
                    Example: 3y+ means you have between 3 and 5 years of
                    experience.
                </SmallContent>
            </LineDescription>
            <Line style={{ flex: 0, alignItems: 'flex-start' }}>
                <Grid
                    data={EXPERIENCE}
                    checked={experienceChecked}
                    onToggleCheck={index =>
                        handleToggleCheck(
                            index,
                            experienceChecked,
                            setExperienceChecked
                        )
                    }
                    initialSelectedIndex={0}
                    RenderItemComponent={CustomRadioButton}
                />
            </Line>
            <LineDescription text="What type of properties do you work with?">
                <SmallContent>You can select multiple options.</SmallContent>
            </LineDescription>
            <Line
                style={{
                    flex: 0,
                    alignItems: 'flex-start',
                }}
            >
                <Grid
                    data={PROPERTY_TYPES}
                    checked={propertyTypesChecked}
                    onToggleCheck={index =>
                        handleMultipleOptionsToggleCheck(
                            index,
                            propertyTypesChecked,
                            setPropertyTypesChecked
                        )
                    }
                    RenderItemComponent={CustomRadioButton}
                />
            </Line>
            <LineDescription text="Street address.">
                <SmallContent>
                    This information will NOT be displayed on your profile. It
                    is used to calculate the distance between you and customers.
                </SmallContent>
            </LineDescription>
            <Line style={{ flex: 0 }}>
                <JobAddress
                    input={jobAddressInput}
                    onStreetAddressChange={handleStreetAddressChange}
                    hideLine2={true}
                    streetAddress={jobAddressInput.line1}
                    initial_place_id={null}
                />
            </Line>
            <LineDescription text="Do you have security liability insurance?">
                <SmallContent>
                    Liability insurance is a part of the general insurance
                    system of risk financing to protect the purchaser (the
                    "insured") from the risks of liabilities imposed by lawsuits
                    and similar claims and protects the insured if the purchaser
                    is sued for claims that come within the coverage of the
                    insurance policy. Source: wikipedia.org.
                </SmallContent>
            </LineDescription>
            <Line
                style={{
                    flex: 0,
                    alignItems: 'flex-start',
                }}
            >
                <Grid
                    data={[{ id: 1, name: 'Yes, I am insured.' }]}
                    checked={[insuranceChecked]}
                    onToggleCheck={index =>
                        setInsuranceChecked(!insuranceChecked)
                    }
                    RenderItemComponent={CustomRadioButton}
                    initialSelectedIndex={0}
                />
            </Line>
            <Line
                style={{
                    flex: 0,
                    paddingTop: Layout.screenHorizontalPadding,
                    paddingBottom: Layout.endOfPageSpace,
                }}
            >
                <MediumButton text="Finish" onPress={handleFinishPress} />
            </Line>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default EditTradespersonProfile;