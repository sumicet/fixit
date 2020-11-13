class Job {
    constructor(
        id,
        userId,
        date,
        occupationId,
        workTypeId,
        jobDescription,
        customerType,
        propertyType,
        jobAddress,
        startTimeId
    ) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.occupationId = occupationId;
        this.workTypeId = workTypeId;
        this.jobDescription = jobDescription;
        this.customerType = customerType;
        this.propertyType = propertyType;
        this.jobAddress = jobAddress;
        this.startTimeId = startTimeId;
    }
}

export default Job;
