import { register, login, logout, getCurrentUser } from '../auth.service'; // путь к вашему сервису
import axios from 'axios';

// Мокаем весь модуль axios
jest.mock('axios');

beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear();
});

describe('auth.service.ts', () => {
    // Тест на регистрацию
    it('should register a user', async () => {
        const mockResponse = { message: 'User registered successfully' };
        // Мокаем ответ для axios.post
        (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

        const response = await register('username', 'user@example.com', 'password123');
        expect(response.data).toEqual(mockResponse);
    });

    // Тест на авторизацию
    it('should log in a user and save token to localStorage', async () => {
        const mockResponse = {
            data: {
                accessToken: 'someAccessToken',
                username: 'username',
                email: 'user@example.com',
            }
        };

        (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

        const response = await login('username', 'password123');


        expect(response.data).toBeDefined();
        expect(response.data.accessToken).toBe('someAccessToken');
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        const user = JSON.parse(localStorage.getItem('user')!);
        expect(user).toEqual(mockResponse.data);
    });

    // Тест на логаут
    it('should log out a user and remove user data from localStorage', () => {
        localStorage.setItem('user', JSON.stringify({ username: 'username', accessToken: 'someAccessToken' }));

        logout();

        const user = localStorage.getItem('user');
        expect(user).toBeNull();
    });

    // Тест на получение текущего пользователя
    it('should return current user from localStorage', () => {
        const mockUser = { username: 'username', email: 'user@example.com' };

        localStorage.setItem('user', JSON.stringify(mockUser));

        const user = getCurrentUser();

        expect(user).toEqual(mockUser);
    });

    it('should return null if no user is found in localStorage', () => {
        localStorage.removeItem('user');

        const user = getCurrentUser();
        expect(user).toBeNull();
    });
});