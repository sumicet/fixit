export const FETCH_TRADESPEOPLE = 'FETCH_TRADESPEOPLE';

import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';
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

        await Firebase.storage
            .ref()
            .child('/profilePictures/')
            .listAll()
            .then(res => {
                res.items.forEach(async itemRef => {
                    const profilePicture = await itemRef.getDownloadURL();
                    profilePictureList.push({
                        userId: itemRef.name,
                        profilePicture,
                    });
                    console.log(profilePictureList, 'hey')
                });
                
            })
        

        dispatch({
            type: FETCH_TRADESPEOPLE,
            tradespeopleData,
            profilePictureList,
        });
    };
};