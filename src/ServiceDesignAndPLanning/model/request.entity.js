export class Request {
    constructor({
                    requestId = null,   // 🔁 CAMBIAR de 'id' a 'requestId'
                    clientId = null,
                    technicianId = null,
                    propertyId = null,
                    serviceId = null,
                    description = '',
                    scheduledDate = '',
                    electricBill = '',
                    photos = [],
                    createdAt = null
                } = {}) {
        this.requestId = requestId;  // 🔁 CAMBIAR de 'id' a 'requestId'
        this.clientId = clientId;
        this.technicianId = technicianId;
        this.propertyId = propertyId;
        this.serviceId = serviceId;
        this.description = description;
        this.scheduledDate = scheduledDate;
        this.electricBill = electricBill;
        this.photos = photos;
        this.createdAt = createdAt;
    }
}
