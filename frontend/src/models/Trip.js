export class Trip {
  constructor(id, startDate, endDate, destination, comment, userId) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.destination = destination;
    this.comment = comment;
    this.userId = userId;
  }
}