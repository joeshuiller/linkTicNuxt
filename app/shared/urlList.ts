export const API_URLS = {
    BASE: 'https://api.escuelajs.co',
    PREFIX: 'api',
    VERSION: 'v1',
    PRODUCTS: 'products',
    USERS: 'users',
    AUTH: 'auth',
    LOGIN: 'login',
    PROFILE: 'profile',
    getAuthProfile: function () {
        return `${this.BASE}/${this.PREFIX}/${this.VERSION}/${this.AUTH}/${this.PROFILE}`;
    },
    // Retorna la URL completa de productos
    getProducts: function () {
        return `${this.BASE}/${this.PREFIX}/${this.VERSION}/${this.PRODUCTS}`;
    },
    getUsers: function () {
        return `${this.BASE}/${this.PREFIX}/${this.VERSION}/${this.USERS}`;
    },
    getAuthLogin: function () {
        return `${this.BASE}/${this.PREFIX}/${this.VERSION}/${this.AUTH}/${this.LOGIN}`;
    }
};
