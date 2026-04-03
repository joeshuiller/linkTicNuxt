import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiUserRepository } from '../../../../../app/infrastructure/repositories/ApiUserRepository';
import { $fetch } from 'ofetch';
import { API_URLS } from '../../../../../app/shared/urlList';
import type { CreateUserDTO } from '../../../../../app/infrastructure/Dtos/CreateUserDTO';

// 1. Mockeamos $fetch para interceptar la llamada de red
vi.mock('ofetch', () => ({
    $fetch: vi.fn(),
}));

// 2. Mockeamos la lista de URLs
vi.mock('../../shared/urlList', () => ({
    API_URLS: {
        getUsers: vi.fn(() => 'https://api.fake.com/users'),
    }
}));

describe('ApiUserRepository', () => {
    let repository: ApiUserRepository;

    // DTO simulado (Lo que envía el usuario en el formulario)
    const mockDto: CreateUserDTO = {
        name: 'Juan Pérez',
        email: 'juan@correo.com',
        password: 'password123',
        avatar: 'https://ejemplo.com/avatar.jpg'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new ApiUserRepository();

        // Silenciamos la consola para no ensuciar la terminal con los errores controlados
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1: El Camino Feliz (Registro exitoso)
    it('debe registrar un usuario, enviar el DTO correcto y devolver la entidad mapeada', async () => {
        // Arrange 1: 🚨 Definimos los datos que el usuario enviaría desde el formulario
        const mockDto = {
            name: 'Juan Pérez',
            email: 'juan@correo.com',
            password: 'password123',
            avatar: 'https://ejemplo.com/avatar.jpg'
        };

        // Arrange 2: Simulamos lo que devuelve la API al crear un usuario 
        const mockApiResponse = {
            id: 99,
            name: 'Juan Pérez',
            email: 'juan@correo.com',
            avatar: 'https://ejemplo.com/avatar.jpg',
            role: 'customer'
        };

        vi.mocked($fetch).mockResolvedValue(mockApiResponse);

        // Act: Ejecutamos el método
        const result = await repository.create(mockDto);

        // Assert: Verificamos que se hizo un POST a la URL correcta y se le pasó el body (DTO)
        expect($fetch).toHaveBeenCalledTimes(1);
        expect($fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/users', {
            method: 'POST',
            body: mockDto
        });

        // Assert: Verificamos que el mapeo funcionó y nos devolvió la entidad User
        expect(result.id).toBe(mockApiResponse.id);
        expect(result.role).toBe('customer');
    });

    // TEST 2: Error Específico de la API (Ej: Email duplicado)
    it('debe lanzar el mensaje específico de la API si devuelve un error con data.message', async () => {
        // Arrange: Simulamos el error típico de 'ofetch' cuando hay un 400 Bad Request
        const apiErrorMessage = 'El correo electrónico ya está registrado.';

        // Creamos un error falso y le inyectamos la propiedad 'data' simulando la respuesta de la API
        const fetchError = new Error('Bad Request') as any;
        fetchError.data = {
            message: apiErrorMessage
        };

        vi.mocked($fetch).mockRejectedValue(fetchError);

        // Act & Assert: Verificamos que el repositorio extrajo y lanzó el mensaje exacto
        await expect(repository.create(mockDto)).rejects.toThrow(apiErrorMessage);

        expect(console.error).toHaveBeenCalled();
    });

    // TEST 3: Error Genérico (Falla de red o error sin mensaje)
    it('debe lanzar el mensaje por defecto si la API falla sin proporcionar detalles', async () => {
        // Arrange: Simulamos una caída de red o un Error 500 que no devuelve JSON
        const networkError = new Error('Network timeout');
        // Nota: este error no tiene la propiedad 'data.message'

        vi.mocked($fetch).mockRejectedValue(networkError);

        // Act & Assert: Verificamos que se usó el mensaje por defecto que pusiste en el código
        await expect(repository.create(mockDto)).rejects.toThrow('Hubo un problema al registrar el usuario.');

        expect(console.error).toHaveBeenCalled();
    });
});