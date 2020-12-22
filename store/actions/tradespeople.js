export const FETCH_TRADESPEOPLE = 'FETCH_TRADESPEOPLE';

import * as Firebase from '../../config/Firebase';

export const fetchAll = () => {
    return async dispatch => {
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/tradesperson.json`
        );

        const responseData = await response.json();

        const profilePictureList = [];
        const tradespeopleData = [];

        for (const key in responseData) {
            tradespeopleData.push(responseData[key]);
        }

        try {
            const res = await Firebase.storage
            .ref()
            .child('/profilePictures/')
            .listAll();

        const items = res.items;
        var i;
        if (items)
            for (i = 0; i < items.length; i++) {
                const profilePicture = await items[i].getDownloadURL();
                profilePictureList.push({
                    userId: items[i].name,
                    profilePicture,
                });
            }
        } catch (error) {
            console.log('no pics')
        }

        dispatch({
            type: FETCH_TRADESPEOPLE,
            tradespeopleData,
            profilePictureList,
        });
    };
};
