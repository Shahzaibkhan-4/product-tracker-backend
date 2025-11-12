export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string; 
  createdAt: Date;
}

export interface LoginResponse {
  user: Omit<User, 'password'>; // User without password
  token: string;
}