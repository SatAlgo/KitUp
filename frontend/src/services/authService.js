import apiClient from './apiClient';

export const authService = {
  async register(data) {
    const payload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      phoneNumber: data.mobile
    };
    const response = await apiClient.post('/api/auth/register', payload);
    return response.data;
  },

  async verifyEmail(token) {
    const response = await apiClient.post('/api/auth/verify-email', { token });
    return response.data;
  },

  async login(credentials) {
    const payload = credentials.identifier.includes('@') 
      ? { email: credentials.identifier, password: credentials.password }
      : { phoneNumber: credentials.identifier, password: credentials.password };
    
    const response = await apiClient.post('/api/auth/login', payload);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  async forgotPassword(email) {
    const response = await apiClient.post('/api/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token, password) {
    const response = await apiClient.post('/api/auth/reset-password', { token, password });
    return response.data;
  },

  async getMe() {
    const response = await apiClient.get('/api/users/me');
    return response.data;
  },

  async updateMe(data) {
    const response = await apiClient.put('/api/users/me', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};