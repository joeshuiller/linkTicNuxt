import { describe, test, expect } from 'vitest';
// Asegúrate de que esta ruta apunte correctamente a tu archivo
import { API_URLS } from '../../../../app/shared/urlList';

describe('API_URLS', () => {

    test('debe retornar la URL correcta para obtener los productos', () => {
        const expectedUrl = 'https://api.escuelajs.co/api/v1/products';
        const result = API_URLS.getProducts();

        expect(result).toBe(expectedUrl);
    });

    test('debe retornar la URL correcta para obtener los usuarios', () => {
        const expectedUrl = 'https://api.escuelajs.co/api/v1/users';
        const result = API_URLS.getUsers();

        expect(result).toBe(expectedUrl);
    });

    test('debe retornar la URL correcta para hacer login', () => {
        const expectedUrl = 'https://api.escuelajs.co/api/v1/auth/login';
        const result = API_URLS.getAuthLogin();

        expect(result).toBe(expectedUrl);
    });

    test('debe retornar la URL correcta para obtener el perfil del usuario', () => {
        const expectedUrl = 'https://api.escuelajs.co/api/v1/auth/profile';
        const result = API_URLS.getAuthProfile();

        expect(result).toBe(expectedUrl);
    });

    // TEST EXTRA: Verificamos el comportamiento dinámico del "this"
    test('debe construir dinámicamente las rutas si cambia la versión de la API', () => {
        // Hacemos una copia profunda para no alterar los demás tests
        const modifiedUrls = { ...API_URLS, VERSION: 'v2' };

        const expectedUrl = 'https://api.escuelajs.co/api/v2/products';

        // Llamamos al método usando el contexto modificado
        expect(modifiedUrls.getProducts.call(modifiedUrls)).toBe(expectedUrl);
    });
});