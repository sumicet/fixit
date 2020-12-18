class Tradesperson {
    constructor(
        id,
        name,
        occupationsIds,
        streetAddress,
        experienceId,
        insurance,
        propertyTypesIds,
        profilePicture,
        phoneNumber,
        recommendedByIds,
        rating,
        ratingVotesAmount,
        contactsIds,
    ) {
        this.id = id;
        this.name = name;
        this.occupationsIds = occupationsIds;
        this.streetAddress = streetAddress;
        this.experienceId = experienceId;
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
