export class Schedule {
    constructor({
                    scheduleId = null,
                    technicianId = '',
                    day = '',
                    startTime = '',
                    endTime = ''
                } = {}) {
        this.scheduleId = scheduleId;
        this.technicianId = technicianId;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
