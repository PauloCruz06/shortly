import connection from "../dbstrategy/postgres.js";
import { urlValidation } from "../schemaValidations/validations.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
    try {
        const { userId } = res.locals;
        const body = req.body;
        const value = await urlValidation(body);
        
        if(value.error) return res.status(422).send(value.error.details);
        
        const shortUrl = nanoid()

        await connection.query(`
            INSERT INTO links (
                "userId",
                url,
                "shortUrl"
            ) values (
                $1, $2, $3
            )
        `, [userId, body.url, shortUrl]);

        res.status(201).send(shortUrl);
    } catch(e) {
        res.status(500).send(e);
    }
}