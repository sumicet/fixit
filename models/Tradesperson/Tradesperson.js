class Tradesperson {
    constructor(
        id,
        name,
        occupationsIds,
        streetAddress,
        experience,
        insurance,
        rating,
        ratingVotesAmount,
        propertyTypesIds,
        profilePicture,
        contactsIds,
        phoneNumber,
        recommendedByIds,
    ) {
        this.id = id;
        this.name = name;
        this.occupationsIds = occupationsIds;
        this.streetAddress = streetAddress;
        this.experience = experience;
        this.insurance = insurance;
        this.rating = rating;
        this.ratingVotesAmount = ratingVotesAmount;
        this.propertyTypesIds = propertyTypesIds;
        this.profilePicture = profilePicture;
        this.contactsIds = contactsIds;
        this.phoneNumber = phoneNumber;
        this.recommendedByIds = recommendedByIds;
    }
}

export default Tradesperson;
