export class Work {
    constructor({
                    title = '',
                    description = '',
                    technicianId = 0
                }) {
        this.title = title;
        this.description = description;
        this.technicianId = technicianId;
    }
}