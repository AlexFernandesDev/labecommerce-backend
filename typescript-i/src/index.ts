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

  