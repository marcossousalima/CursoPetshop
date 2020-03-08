import { User } from '../models/user.model';

export class Security {
    public static set(user: User, token: string) {
        //user vem no formato json, passar para o formato string
        const data = JSON.stringify(user);

        localStorage.setItem('petshopuser', btoa(data));
        localStorage.setItem('petshpotoken', token);
    }

    public static setUser(user: User) {
        const data = JSON.stringify(user);
        localStorage.setItem('petshopuser', btoa(data));
    }

    public static setToken(token: string) {
        localStorage.setItem('petshpotoken', token);
    }

    public static getUser(): User {
        const data = localStorage.getItem('petshopuser');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }

    public static getToken(): string {
        const data = localStorage.getItem('petshpotoken');
        if (data) {
            return data;
        } else {
            return null;
        }
    }

    public static hasToken(): boolean {
        if (this.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    public static clear() {
        localStorage.removeItem('petshpotoken');
        localStorage.removeItem('petshopuser');
    }
}
