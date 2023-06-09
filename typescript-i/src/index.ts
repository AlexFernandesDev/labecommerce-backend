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
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    const q = req.query.q as string
    let response
    if (q) {
      response = searchProductsByName(q)
     
    } else {
      response = products;
    }
    res.status(200).send(response)
  });
  
  app.post('/users', (req: Request, res: Response) => {
    /* const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string */
    const { id, name, email, password } = req.body

    createUser(id, name, email,password)
    res.status(201).send('Cadastro realizado com sucesso');
 });

app.post('/products', (req: Request, res: Response)=> {

    const { id, name, price, description, imageUrl } = req.body;

    createProduct(id, name, price, description, imageUrl)
    res.status(201).send('Produto cadastrado com sucesso')
}) 

app.delete('/users/:id', (req: Request, res: Response)=>{
  const { id } = req.params

  // Validação do parâmetro de ID
  if (!id) {
    res.status(400).send('ID inválido');
    return;
  }

  const indexUserToDelete = users.findIndex(user => user.id === id)

  if(indexUserToDelete < 0){
    res.status(404).send('Usuário não encontrado')
    return
  }

  users.splice(indexUserToDelete, 1)
  res.status(200).send('Usuário deletado com sucesso')
})

app.delete('/products/:id', (req: Request, res: Response)=>{
  const { id } = req.params

  // Validação do parâmetro de ID
  if (!id) {
    res.status(400).send('ID inválido');
    return;
  }

  const indexProductToDelete = products.findIndex(product => product.id === id)

  if(indexProductToDelete < 0){
    res.status(404).send('Produto não encontrado')
    return
  }

  products.splice(indexProductToDelete, 1)
  res.status(200).send('Produto deletado com sucesso')
})


app.put('/products/:id', (req: Request, res: Response)=>{
  const { id } = req.params 

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newDescription = req.body.description as string | undefined
  const newImageUrl = req.body.imageUrl as string | undefined

  const productToUpdate = products.find((product) =>product.id === id)

  if(productToUpdate){
    productToUpdate.id = newId || productToUpdate.id
    productToUpdate.name = newName || productToUpdate.name
    productToUpdate.price = newPrice || productToUpdate.price
    productToUpdate.description = newDescription || productToUpdate.description
    productToUpdate.imageUrl = newImageUrl || productToUpdate.imageUrl
  }

  res.status(200).send("Produto atuzalido com sucesso")

})