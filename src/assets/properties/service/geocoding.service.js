import axios from 'axios';

const geocodingClient = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org'
});

export const geocodingService = {
    async search(address) {
        if (!address || address.trim() === '') {
            return [];
        }
        try {
            const response = await geocodingClient.get('/search', {
                params: {
                    q: address,
                    format: 'json',
                    countrycodes: 'pe',
                    limit: 5,
                    addressdetails: 1
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error en el servicio de Geocodificación:', error);
            return [];
        }
    }
};