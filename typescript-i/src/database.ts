/* 
export const frota: TCarro[] = [
  {
    marca: 'Chevrolet',
    modelo: 'Onix',
    ano: 2019
  }, {

    name: string,
    email: string,
    password: string,
    createdAt: string
*/

import { TProducts, TUsers } from "./types";

export const user: TUsers[] = [
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

export const product: TProducts[] = [
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