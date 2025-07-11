export class Rating {
    constructor({
                    ratingId,
                    requestId,
                    score,
                    comment,
                    raterId,
                    technicianId
                }) {
        this.ratingId = ratingId;
        this.requestId = requestId;
        this.score = score;
        this.comment = comment;
        this.raterId = raterId;
        this.technicianId = technicianId;
    }
}
