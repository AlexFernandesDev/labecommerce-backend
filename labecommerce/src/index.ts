import express, { Request, Response} from 'express'; 
import cors from 'cors';
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
    const result = await db("users")
    res.status(200).send(result)
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

// Endpoint que busca todos os produtos ou produtos especificos pelo nome
app.get('/products', async (req: Request, res: Response) => {
  try { 
    const nameToFind = req.query.q
    let result;  
    if (nameToFind) {
      result = await db("products").where("name", "like", `%${nameToFind}%`);
    }else{
      result = await db("products");  
    }
    
    res.status(200).send(result)
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
      const existingUserWithId = await db("users").where({id: id});
      if (existingUserWithId.length > 0) {
        res.status(409)
        throw new Error('Já existe uma conta com a mesma ID');
      }
      // Verificar se já existe uma conta com o mesmo e-mail
      
      const existingUserWithEmail = await db("users").where({email: email});

      if (existingUserWithEmail.length > 0) {
        res.status(409)
        throw new Error ('Já existe uma conta com o mesmo e-mail');
      }
      const newUser = {
        id: id,
        name: name,
        email: email,
        password: password
      }

      await db("users").insert(newUser)

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
    const { id, name, price, description, image_url } = req.body;
    if (!id || !name || !price || !description || !image_url) {
      res.status(400)
      throw new Error('Todos os campos devem ser preenchidos');
    }
    // Verificar se já existe um produto com a mesma ID
    const existingProductWithId = await db("products").where({id: id})

    if (existingProductWithId.length > 0) {
      res.status(409)
      throw new Error('Já existe um produto com o mesmo ID');
    }
    const newProduct = {
      id,
      name,
      price,
      description,
      image_url
    }
    await db("products").insert(newProduct)

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

    const result = await db("purchases").where({buyer: id})

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
app.post('/purchases', async (req: Request, res: Response)=> {
  try {
    const { id, buyer, total_price, paid } = req.body;

    if (!id || !buyer || !total_price || !paid) {
      res.status(400)
      throw new Error('Todos os campos devem ser preenchidos');
    }
    // Verificar se já existe um produto com a mesma ID
    const existingPurchaseWithId = await db("purchases").where({ id: id })
    if (existingPurchaseWithId.length > 0) {
      res.status(409)
      throw new Error('Já existe um pedido com o mesmo ID');
    }

    const newPurchase = {
      id,
      buyer,
      total_price,
      paid
    }
    await db("purchases").insert(newPurchase)
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

//Endpoint para deletar um usuário pelo id
app.delete('/users/:id', async (req: Request, res: Response)=>{
  try {
    const idToDelete = req.params.id
    const [ user ] = await db("users").where({ id: idToDelete })

    if(user){
      await db("users").del().where({id: idToDelete})
    }else{
      res.status(404)
      throw new Error("'id' não encontrada, banda não existe no banco de dados");
    }

    res.status(200).send('Usuário deletado com sucesso')
   
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

//Endpoint para deletar um produto pelo id
app.delete('/products/:id', async (req: Request, res: Response)=>{
  try {
    const idToDelete = req.params.id

    // Validação do parâmetro de ID
    const [ product ] = await db("products").where({id: idToDelete})

    if(product){
      await db("products").del().where({id: idToDelete})
    }else{
      res.status(404)
      throw new Error("'id' não encontrada, produto não existe no banco de dados");
    }
    res.status(200).send("Produto apagado com sucesso!")

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

//Endpoint para deletar um pedido pelo id
app.delete('/purchases/:id', async (req: Request, res: Response)=>{
  try {
    const idToDelete = req.params.id

    // Validação do parâmetro de ID
    const [ purchase ] = await db("purchases").where({id: idToDelete})

    if(purchase){
      await db("purchases").del().where({id: idToDelete})
    }else{
      res.status(404)
      throw new Error("'id' não encontrada, produto não existe no banco de dados");
    }
    res.status(200).send("Pedido apagado com sucesso!")

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

//Endpoint para editar um produto pelo id
app.put('/products/:id', async (req: Request, res: Response)=>{
  try {
    const idToEdit = req.params.id 

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string 
    const newPrice = req.body.price 
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.image_url as string | undefined

    const [ product ] = await db("products").where({id: idToEdit})
    
    if (product) {
      const updateProduct = {
          id: newId || product.id,
          name: newName || product.name, 
          price: newPrice || product.price,
          description: newDescription || product.description,
          image_url: newImageUrl || product.image_url
      }
      await db("products").update(updateProduct).where({id: idToEdit})
        
    } else {
        res.status(404)
        throw new Error("'id' não encontrada")
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" })
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

// Endpoint para buscar os pedidos por id, relacionando os produtos do pedido
app.get('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const idToFind = req.params.id;
   
    const purchase = await db("purchases")
      .select(
        "purchases.id as purchaseId",
        "purchases.total_price as totalPrice",
        "purchases.created_at as createdAt",
        "purchases.paid",
        "users.id as buyerId",
        "users.email",
        "users.name"
      )
      .where({ "purchases.id": idToFind })
      .innerJoin("users", "users.id", "purchases.buyer")
      .first();

    if (!purchase) {
      res.status(404).send("Compra não encontrada");
      return;
    }

    const productsList = await db("purchases_products")
      .select(
        "products.id",
        "products.name",
        "products.price",
        "products.description",
        "products.image_url",
        "purchases_products.quantity"
      )
      .where({ "purchases_products.purchase_id": idToFind })
      .innerJoin("products", "products.id", "purchases_products.product_id");

    const result = {
      purchaseId: purchase.purchaseId,
      totalPrice: purchase.totalPrice,
      createdAt: purchase.createdAt,
      isPaid: purchase.paid,
      buyerId: purchase.buyerId,
      email: purchase.email,
      name: purchase.name,
      productsList
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

