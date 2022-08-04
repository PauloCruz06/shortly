import connection from "../dbstrategy/postgres.js";
import bcrypt from "bcrypt";
import { signupValidation } from "../schemaValidations/validations.js";
import { v4 as uuid } from "uuid";

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