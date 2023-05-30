
import { TProducts, TUsers } from "./types";

export const users: TUsers[] = [
    {
        id: 'u001',
        name: 'Alex',
        email: 'alex@gmail.com',
        password: '1234',
        createdAt: new Date().toISOString()
    },
    {
        id: 'u002',
        name: 'Pedro',
        email: 'pedro@gmail.com',
        password: '9876',
        createdAt: new Date().toISOString()
    },
]

export const products: TProducts[] = [
    {
        id: 'prod001',
        name: 'Mouse gamer',
        price: 250,
        description: 'Melhor mouse do mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400'
    },
    {
        id: 'prod002',
        name: 'Monitor',
        price: 900,
        description: 'Monitor LED Full HD 24 polegadas!',
        imageUrl: 'https://picsum.photos/seed/Monitor/400'
    },
]

export function createUser(id: string, name: string, email: string, password: string){
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    }
    users.push(newUser)
    return 'Usuário cadastrado com sucesso'
}

export function getAllUsers(users: TUsers[]){
    return users
}

export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string){
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    }
    products.push(newProduct)
    return "Produto criado com sucesso"
}


export function getAllProducts(products: TProducts[]){
    return products
}

export function searchProductsByName( product: string){
    return products.filter(prod => prod.name.toLowerCase().includes(product.toLowerCase()))
}





