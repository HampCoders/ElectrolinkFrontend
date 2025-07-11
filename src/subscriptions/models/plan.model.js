export class Plan {
    constructor({
                    id = null,
                    name = '',
                    description = '',
                    price = 0,
                    currency = 'USD',
                    monetizationType = 'RECURRING',
                    isDefault = false
                } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.monetizationType = monetizationType;
        this.isDefault = isDefault;
    }
}
