import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  Mongo_API_URL = 'http://localhost:5000/api'
  // Mongo_API_URL = 'https://cp-dashboard-backend.onrender.com/api'
  User_API = 'https://cpd-user-api.onrender.com/api';
  constructor() { }
}