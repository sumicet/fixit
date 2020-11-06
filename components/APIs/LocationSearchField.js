import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const LocationSearchField = props => {
    return (
        <GooglePlacesAutocomplete
            {...props}
            fetchDetails
            styles={fieldStyle}
            query={{
                key: 'AIzaSyBM6YK35TEtbw_k76cKUnwOMsEjiFmBRm0',
                language: 'en',
            }}
            textInputProps={{
             placeholderTextColor: Color.placeholderTextColor
           }}
        />
    );
};

const fieldStyle = {
    container: {
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
        flex: 0,
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: Color.textField,
    },
    textInput: {
        color: Color.textColor,
        fontSize: Layout.contentSize,
        borderRadius: Layout.borderRadius,
        backgroundColor: Color.textField,
        paddingVertical: Layout.generalPadding,
        paddingHorizontal: Layout.generalPadding,
        flex: 1,
        marginLeft: 0,
        marginBottom: 0,
        marginRight: 0,
        marginTop: 0,
        backgroundColor: Color.textField,
        height: 'auto',
    },
    textInputContainer: {
        height: 'auto',
        flex: 0,
        backgroundColor: Color.primaryColor
    },
    separator: {
        height: 0.5,
        backgroundColor: '#c8c7cc',
    },
    row: {
        backgroundColor: '#FFFFFF',
        padding: 13,
        height: 44,
        flexDirection: 'row',
        borderRadius: 0,
    },
};

export default LocationSearchField;
