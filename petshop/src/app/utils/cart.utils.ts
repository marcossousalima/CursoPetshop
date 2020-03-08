import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart.item.model';

export class CartUtil {
    public static get(): Cart {
        //recupera dados do local storage;
        const data = localStorage.getItem('petshopcart');

        //caso não haja dados, retorna um novo carrinho;
        if (!data) {
            return new Cart();
        }
        //casa não haja dados, retorna o carrinho;
        return JSON.parse(data);
    }

    public static add(id: string, product: string, quantity: number, price: number, image: string) {
        //obtem dados do carrinho
        let cart = this.get();

        //gera um novo carinho
        const item = new CartItem(id, product, quantity, price, image);

        //Adiciona ao carrinho
        cart.items.push(item);

        //salva no local storage
        localStorage.setItem('petshopcart', JSON.stringify(cart));
    }

    public static update(cart: Cart) {
        localStorage.setItem('petshopcart', JSON.stringify(cart));
    }

    public static clear() {
        localStorage.removeItem('petshopcart');
    }
}