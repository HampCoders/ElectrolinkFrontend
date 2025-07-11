export class Subscription {
    constructor({
                    id = null,
                    userId = null,
                    planId = null,
                    status = 'ACTIVE',
                    activatedAt = null,
                    isPremium = false,
                    isCertified = false,
                    canUseBoost = false
                } = {}) {
        this.id = id;
        this.userId = userId;
        this.planId = planId;
        this.status = status;
        this.activatedAt = activatedAt;
        this.isPremium = isPremium;
        this.isCertified = isCertified;
        this.canUseBoost = canUseBoost;
    }
}
