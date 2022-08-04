import connection from "../dbstrategy/postgres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
    signupValidation, signinValidation
} from "../schemaValidations/validations.js";

dotenv.config();

export async function signup(req, res) {
    try {
        const body = req.body;
        const value = await signupValidation(body);

        if(value.error) return res.status(422).send(value.error.details);

        const { rows: emailList } = await connection.query(`
            SELECT email FROM users;
        `);

        if(emailList.some(email =>
           email.email === body.email 
        )) return res.sendStatus(409);

        const passwordHash = bcrypt.hashSync(body.password, 10);

        await connection.query(`
            INSERT INTO users (
                email,
                name,
                password
            ) VALUES (
                $1, $2, $3
            )
        `,[
            body.email,
            body.name,
            passwordHash
        ]);

        res.sendStatus(201);
    } catch(e) {
        res.status(500).send(e);
    }
}

export async function signin(req, res) {
    try {
        const body = req.body;
        const value = await signinValidation(body);

        if(value.error) return res.status(422).send(value.error.details);

        const { rows: userList } = await connection.query(`
            SELECT * FROM users
            WHERE email = $1
        `, [body.email]);

        if(!userList.some(user =>
            bcrypt.compareSync(body.password, user.password)
        )) return res.sendStatus(401);

        const id = userList[0].id;
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 1800
        });

        res.status(200).send(token);
    } catch(e) {
        res.status(500).send(e);
    }
}