import express, { Request, Response} from 'express'; 
import cors from 'cors';
import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from "./database";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

app.get('/users', (req: Request, res: Response)=>{
  try {

    if(!users){
      res.status(404)
      throw new Error ('Usuários não encontrados')  
    }
    res.status(200).send(users)
  } catch (error) {
    if(error instanceof Error){ 
      res.send(error.message)
    }else{
      res.status(500).send("Erro desconhecido")
    }     
  }
})

app.get('/products', (req: Request, res: Response) => {
  try {
    const q = req.query.q as string
    let response

    if (q) {
      if (q.length < 1){
        res.status(400)
        throw new Error("O nome deve ter ao menos 1 letra") 
      }
      response = searchProductsByName(q)
     
    } else {
      response = products;
    }
    res.status(200).send(response)
  } catch (error) {
    if(error instanceof Error){ 
      res.send(error.message)
  }else{
      res.status(500).send("Erro desconhecido")
  }    
  }
   
});
  
app.post('/users', (req: Request, res: Response) => {
    /* const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string */

    try {
      const { id, name, email, password } = req.body
      // Verificar se todos os campos estão presentes
      if (!id || !name || !email || !password) {
        res.status(400)
        throw new Error('Todos os campos devem ser preenchidos');
      }
      // Verificar se já existe uma conta com a mesma ID
      const existingUserWithId = users.find((user) => user.id === id)
      if (existingUserWithId) {
        res.status(409)
        throw new Error('Já existe uma conta com a mesma ID');
      }
      // Verificar se já existe uma conta com o mesmo e-mail
      const existingUserWithEmail = users.find((user) => user.email === email)
      if (existingUserWithEmail) {
        res.status(409)
        throw new Error ('Já existe uma conta com o mesmo e-mail');
      }
      createUser(id, name, email,password)
      res.status(201).send('Cadastro realizado com sucesso');

    } catch (error) {
      if(error instanceof Error){ 
        res.send(error.message)
      }else{
        res.status(500).send("Erro desconhecido")
      } 
    }  
});

app.post('/products', (req: Request, res: Response)=> {
  try {
    const { id, name, price, description, imageUrl } = req.body;
    if (!id || !name || !price || !description || !imageUrl) {
      res.status(400)
      throw new Error('Todos os campos devem ser preenchidos');
    }
    // Verificar se já existe um produto com a mesma ID
    const existingProductWithId = products.find((product) => product.id === id)
    if (existingProductWithId) {
      res.status(409)
      throw new Error('Já existe uma conta com a mesma ID');
    }
    createProduct(id, name, price, description, imageUrl)
    res.status(201).send('Produto cadastrado com sucesso')
  } catch (error) {
    if(error instanceof Error){ 
      res.send(error.message)
    }else{
      res.status(500).send("Erro desconhecido")
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