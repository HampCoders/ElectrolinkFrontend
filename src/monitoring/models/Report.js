export class Report {
    constructor({
                    reportId,
                    requestId,
                    description,
                    date
                }) {
        this.reportId = reportId;
        this.requestId = requestId;
        this.description = description;
        this.date = date;
    }
}
