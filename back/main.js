import mysql from "mysql2/promise";
import { ProductModel } from "./product.model.js";
import { UserModel } from "./user.model.js";
import express from "express";
import cors from "cors";

const host = "localhost";
const PORT = "8090"

async function main() {
    console.log("Démarrage du serveur sur " + host);
    const client = await mysql.createConnection({
        host : host,
        user : "root",
        password : "root",
        database: "shop"
    }).catch(console.error);

    const productModel = new ProductModel(client);
    const userModel = new UserModel(client);

    const server = express();
    
    // Configuration CORS plus détaillée
    server.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
    }));
    
    // Middleware pour parser le JSON
    server.use(express.json());
    
    // Middleware de logging
    server.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();
    });

    server.get("/",(req,res)=>{
        res.end("Bienvenue dans l'api")
    })


    // -----  products  -------- //

    server.get("/products",async(req,res)=>{
        const products = await productModel.getAllProducts();
        res.json(products)
        console.log(products)
    })

    server.get("/product/:id",async(req,res)=>{
        const productId = req.params.id;
        const product = await productModel.getProductById(productId);
        res.json(product);
        console.log("Show product : "+productId);
        console.log(product);
    })
    server.post("/add-product/:name/:price/:img",async(req,res)=>{
        const productName = req.params.name;
        const productPrice = req.params.price;
        const productImg = req.params.img;
        const products = await productModel.addProduct(productName,productPrice,productImg);
        res.json(products)
        console.log("New product add name: "+productName+" price: "+productPrice+"€")
    })

    server.delete("/delete-product/:id",async(req,res)=>{
        const productId = req.params.id;
        const product = await productModel.deleteProduct(productId);
        // res.json(product);
        res.end("product id: "+productId+" are supp");
        console.log("product id: "+productId+" are supp")
    })

    server.delete("/delete-all-product",async(req,res)=>{
        const product = await productModel.deleteAllProducts();
        res.end("All product are delete");
        console.log("All product are delete");
    })


    // -------  User  ---------- //

    server.get("/users",async(req,res)=>{
        const users = await userModel.getAllUser();
        res.json(users)
        console.log(users)
    })

    server.post("/login", async(req, res) => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ 
                    error: "Email et mot de passe requis" 
                });
            }

            const user = await userModel.loginUser(email, password);
            if (!user) {
                return res.status(401).json({ 
                    error: "Email ou mot de passe incorrect" 
                });
            }

            res.json({
                message: "Connexion réussie",
                user: {
                    id: user.id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email
                }
            });
            console.log("Utilisateur connecté:", email);
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            res.status(500).json({ 
                error: "Erreur lors de la connexion" 
            });
        }
    });

    server.post("/register", async(req, res) => {
        console.log("Tentative d'inscription avec les données:", req.body);
        try {
            const { name, lastname, email, password } = req.body;
            
            if (!name || !lastname || !email || !password) {
                console.log("Données manquantes:", { name, lastname, email, password: !!password });
                return res.status(400).json({ 
                    error: "Tous les champs sont requis" 
                });
            }

            // Vérifier si l'email existe déjà
            const existingUser = await userModel.getUserByEmail(email);
            if (existingUser) {
                console.log("Email déjà utilisé:", email);
                return res.status(400).json({ 
                    error: "Cet email est déjà utilisé" 
                });
            }

            const user = await userModel.addUser(name, lastname, email, password);
            console.log("Nouvel utilisateur créé:", { id: user.id, email: user.email });
            res.status(201).json({
                message: "Utilisateur créé avec succès",
                user: {
                    id: user.id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email
                }
            });
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            res.status(500).json({ 
                error: error.message || "Erreur lors de l'inscription de l'utilisateur" 
            });
        }
    });

    server.post("/add-user/:name/:lastname/:email/:password",async(req,res)=>{
        const userName = req.params.name;
        const userLastname = req.params.lastname;
        const userEmail = req.params.email;
        const userPassword = req.params.password;
        const user = await userModel.addUser(userName,userLastname,userEmail,userPassword);
        res.json(user)
        console.log("New user add name: "+userName+" lastname: "+userLastname+" email : "+userEmail+" password : "+userPassword)
    })

    server.delete("/delete-user/:id",async(req,res)=>{
        const userId = req.params.id;
        const users = await userModel.deleteUser(userId);
        // res.json(product);
        res.end("product id: "+userId+" are supp");
        console.log("product id: "+userId+" are supp")
    })




    // --------  Server listen  --------- //
    server.listen(PORT, () => {
        console.log(`Serveur démarré sur http://${host}:${PORT}`);
        console.log("Endpoints disponibles:");
        console.log("- POST /register");
        console.log("- POST /login");
        console.log("- GET /users");
    });
}

main().catch(console.error);

