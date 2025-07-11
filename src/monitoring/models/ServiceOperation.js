export class ServiceOperation {
    constructor({
                    requestId,
                    currentStatus,
                    startedAt,
                    completedAt,
                    technicianId,
                    createdAt,
                    updatedAt
                }) {
        this.requestId = requestId;
        this.currentStatus = currentStatus;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.technicianId = technicianId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.reports = []; // se llenará luego
    }

    isCompleted() {
        return typeof this.currentStatus === 'string' &&
            this.currentStatus.toLowerCase() === 'completed';
    }
}
