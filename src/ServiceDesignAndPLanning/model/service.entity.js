export class Service {
    constructor({
                    serviceId = null,
                    name = '',
                    description = '',
                    basePrice = 0,
                    estimatedTime = '',
                    category = '',
                    isVisible = true,
                    createdBy = '',
                    policy = {
                        cancellationPolicy: '',
                        termsAndConditions: ''
                    },
                    restriction = {
                        unavailableDistricts: [],
                        forbiddenDays: [],
                        requiresSpecialCertification: false
                    },
                    tags = [],
                    components = [],
                    createdAt = null
                } = {}) {
        this.serviceId = serviceId;
        this.name = name;
        this.description = description;
        this.basePrice = basePrice;
        this.estimatedTime = estimatedTime;
        this.category = category;
        this.isVisible = isVisible;
        this.createdBy = createdBy;

        this.policy = {
            cancellationPolicy: policy.cancellationPolicy || '',
            termsAndConditions: policy.termsAndConditions || ''
        };

        this.restriction = {
            unavailableDistricts: restriction.unavailableDistricts || [],
            forbiddenDays: restriction.forbiddenDays || [],
            requiresSpecialCertification: restriction.requiresSpecialCertification || false
        };

        this.tags = tags.map(tag => ({ name: tag.name }));
        this.components = components.map(comp => ({
            componentId: comp.componentId,
            quantity: comp.quantity
        }));

        this.createdAt = createdAt;
    }
}
