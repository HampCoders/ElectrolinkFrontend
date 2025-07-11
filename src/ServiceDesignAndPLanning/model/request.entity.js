export class Request {
    constructor({
                    requestId = null,   // 🔁 CAMBIAR de 'id' a 'requestId'
                    clientId = null,
                    technicianId = null,
                    propertyId = null,
                    serviceId = null,
                    problemDescription = '',
                    scheduledDate = '',
                    status = '',
                    bill = {},
                    photos = [],
                    createdAt = null
                } = {}) {
        this.requestId = requestId;  // 🔁 CAMBIAR de 'id' a 'requestId'
        this.clientId = clientId;
        this.technicianId = technicianId;
        this.propertyId = propertyId;
        this.serviceId = serviceId;
        this.problemDescription = problemDescription;
        this.scheduledDate = scheduledDate;
        this.status = status;
        this.bill = bill;
        this.photos = photos;
        this.createdAt = createdAt;
    }
}
