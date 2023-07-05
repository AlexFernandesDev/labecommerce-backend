import express, { Request, Response} from 'express'; 
import cors from 'cors';
import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";
import { db } from './database/knex';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', async (req: Request, res: Response) => { 
    try {
      res.status(200).send({ message:'Pong!' })
    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
          res.status(500)
      }

      if (error instanceof Error) {
          res.send(error.message)
      } else {
          res.send("Erro inesperado")
      }
    }
});

// Endpoint que busca todos os usuários
app.get('/users', async (req: Request, res: Response)=>{
  try {
    const result = await db.raw(`
      SELECT * FROM users;
    `)
    res.status(200).send({users: result})
  } catch (error) {
    console.log(error)  
    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    } 
  }
})

// Endpoint que busca todos os produtos
app.get('/products', async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string

    if (q) {
      if (q.length < 1){
        res.status(400)
        throw new Error("O nome deve ter ao menos 1 letra") 
      }

      const result = await db.raw(`
        SELECT * FROM products
        WHERE name LIKE '%${q}%';    
      `)
      res.status(200).send({products: result});
    } else {
      const result = await db.raw(`
        SELECT * FROM products;    
      `)
      res.status(200).send({products: result})
    }  
  } catch (error) {
    if(error instanceof Error){ 
        res.send(error.message)
    }else{
        res.status(500).send("Erro desconhecido")
    }    
  }   
});

//Endpoint para cadastrar novo usuário  
app.post('/users', async (req: Request, res: Response) => {

    try {
      const { id, name, email, password } = req.body
      // Verificar se todos os campos estão presentes
      if (!id || !name || !email || !password) {
        res.status(400)
        throw new Error('Todos os campos devem ser preenchidos');
      }
      // Verificar se já existe uma conta com a mesma ID
      const existingUserWithId = await db.raw(`
        SELECT id FROM users WHERE id = '${id}';
      `);
      if (existingUserWithId.length > 0) {
        res.status(409)
        throw new Error('Já existe uma conta com a mesma ID');
      }
      // Verificar se já existe uma conta com o mesmo e-mail
      
      const existingUserWithEmail = await db.raw(`
        SELECT email FROM users WHERE email = '${email}';
      `);

      if (existingUserWithEmail.length > 0) {
        res.status(409)
        throw new Error ('Já existe uma conta com o mesmo e-mail');
      }

      await db.raw(`
        INSERT INTO users (id, name, email, password) 
        VALUES ("${id}", "${name}", "${email}", "${password}");
      `)

        res.status(200).send(`Cadastro realizado com sucesso`)

    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      } 
    }  
});

//Endpoint para cadastrar novo produto
app.post('/products', async (req: Request, res: Response)=> {
  try {
    const { id, name, price, description, imageUrl } = req.body;
    if (!id || !name || !price || !description || !imageUrl) {
      res.status(400)
      throw new Error('Todos os campos devem ser preenchidos');
    }
    // Verificar se já existe um produto com a mesma ID
    const existingProductWithId = await db.raw(`
        SELECT id FROM products WHERE id = '${id}';
    `);
    if (existingProductWithId.length > 0) {
      res.status(409)
      throw new Error('Já existe um produto com o mesmo ID');
    }

    await db.raw(`
      INSERT INTO products (id, name, price, description, imageUrl) 
      VALUES ("${id}", "${name}", "${price}", "${description}", "${imageUrl}");
    `)
    res.status(201).send('Produto cadastrado com sucesso')
  } catch (error) {
    console.log(error)
    
    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    } 
  } 
})

//Endpoint que busca produto pelo id
app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const result = await db.raw(`
      SELECT * FROM products
      WHERE id = '${id}';        
    `)
      res.status(200).send({product: result});
  } catch (error) {
    if(error instanceof Error){ 
        res.send(error.message)
    }else{
        res.status(500).send("Erro desconhecido")
    }    
  }   
});

//Endpoint para buscar pedidos pelo id do user
app.get('/users/:id/purchases', async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const result = await db.raw(`
      SELECT * FROM purchases
      WHERE buyer = '${id}';        
    `)
      res.status(200).send({purchase: result});
  } catch (error) {
    if(error instanceof Error){ 
        res.send(error.message)
    }else{
        res.status(500).send("Erro desconhecido")
    }    
  }   
});

//Endpoint para criar novos pedidos
//id TEXT PRIMARY KEY UNIQUE NOT NULL,
//buyer TEXT NOT NULL,
//total_price REAL NOT NULL,
//created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//paid BOOLEAN
app.post('/purchases', async (req: Request, res: Response)=> {
  try {
    const { id, buyer, total_price, paid } = req.body;
    if (!id || !buyer || !total_price || !paid) {
      res.status(400)
      throw new Error('Todos os campos devem ser preenchidos');
    }
    // Verificar se já existe um produto com a mesma ID
    const existingPurchaseWithId = await db.raw(`
        SELECT id FROM purchases WHERE id = '${id}';
    `);
    if (existingPurchaseWithId.length > 0) {
      res.status(409)
      throw new Error('Já existe um pedido com o mesmo ID');
    }

    await db.raw(`
      INSERT INTO purchases (id, buyer, total_price, paid) 
      VALUES ("${id}", "${buyer}", "${total_price}", "${paid}");
    `)
    res.status(201).send('Pedido cadastrado com sucesso')
  } catch (error) {
    console.log(error)
    
    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    } 
  }
    
}) 


app.delete('/users/:id', (req: Request, res: Response)=>{
  try {
    const { id } = req.params

    // Validação do parâmetro de ID
    if (!id) {
      res.status(400)
      throw new Error('Informe um ID');
    }
    //Verificando se o ID existe
    const indexUserToDelete = users.findIndex(user => user.id === id)
    if(indexUserToDelete < 0){
      res.status(404)
      throw new Error('Usuário não encontrado')
    }

    users.splice(indexUserToDelete, 1)
    res.status(200).send('Usuário deletado com sucesso')
   
  } catch (error) {
    if(error instanceof Error){ 
      res.send(error.message)
    }else{
        res.status(500).send("Erro desconhecido")
    }
  } 
})

app.delete('/products/:id', (req: Request, res: Response)=>{
  try {
    const { id } = req.params

  // Validação do parâmetro de ID
  if (!id) {
    res.status(400)
    throw new Error ('ID inválido');
  }

  //Verificando se ID existe
  const indexProductToDelete = products.findIndex(product => product.id === id)
  if(indexProductToDelete < 0){
    res.status(404)
    throw new Error ('Produto não encontrado')
  }

  products.splice(indexProductToDelete, 1)
  res.status(200).send('Produto deletado com sucesso')
  } catch (error) {
    if(error instanceof Error){
      res.send(error.message)
    }else{
      res.status(500).send('Erro desconhecido')
    }
  }
  
})


app.put('/products/:id', (req: Request, res: Response)=>{
  try {
    const { id } = req.params 

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string 
    const newPrice = req.body.price 
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const productToUpdate = products.find((product) =>product.id === id)
    if(!productToUpdate){
      res.status(400) 
      throw new Error("ID inválido");      
    }
   
    if(newName?.length < 2){
      res.status(400)
      throw new Error("O nome deve ter no mínimo duas letras")
    }

    if(newPrice !== undefined){
      if(typeof(newPrice) !== "number"){
        res.status(422)
        throw new Error("O campo 'price' deve ser um número!")
      }
      if(newPrice < 0){
        res.status(400)
        throw new Error("O campo 'price' deve ser maior ou igual a zero!")   
      }
    }

    if(productToUpdate){
      productToUpdate.id = newId || productToUpdate.id
      productToUpdate.name = newName || productToUpdate.name
      productToUpdate.price = newPrice || productToUpdate.price
      productToUpdate.description = newDescription || productToUpdate.description
      productToUpdate.imageUrl = newImageUrl || productToUpdate.imageUrl
    }

    res.status(200).send("Produto atuzalido com sucesso")
  } catch (error) {
    if(error instanceof Error){
      res.send(error.message)
    }else{
      res.status(500).send('Erro desconhecido')
    }
  }
  

})