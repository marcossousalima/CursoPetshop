import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Security } from '../utils/security.utils';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    public url = 'http://localhost:3000/v1'
    constructor(private httpClient: HttpClient) { }

    public composeHeaders() {
        const token = Security.getToken();
        const header = new HttpHeaders().set('Authorization', `bearer ${token}`);
        return header;
    }

    getProducts() {
        return this.httpClient.get<Product[]>(`${this.url}/products`);
    }

    authentication(data) {
        return this.httpClient.post(`${this.url}/accounts/authenticate`, data);
    }

    refreshToken() {
        return this.httpClient.post(`${this.url}/accounts/refresh-token`, null, { headers: this.composeHeaders() });
    }

    create(data: any) {
        return this.httpClient.post(`${this.url}/accounts`, data);
    }

    resetPassword(data: any) {
        return this.httpClient.post(`${this.url}/accounts/reset-password`, data);
    }

    getProfile() {
        return this.httpClient.get(`${this.url}/accounts`, { headers: this.composeHeaders() });
    }

    updateProfile(data: any) {
        return this.httpClient.put(`${this.url}/accounts`, data, { headers: this.composeHeaders() });
    }
}


