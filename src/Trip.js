class Trip {
  constructor(
    date,
    destinationID,
    duration,
    id,
    status,
    suggestedActivities,
    travelers,
    userID
  ) {
    this.id = id;
    this.destinationID = destinationID;
    this.userID = userID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = status;
    this.suggestedActivities = suggestedActivities;
  }
}

export default Trip;
