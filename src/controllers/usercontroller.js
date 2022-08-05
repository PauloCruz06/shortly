import connection from "../dbstrategy/postgres.js";
import { urlValidation } from "../schemaValidations/validations.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
    try {
        const { userId } = res.locals;
        const body = req.body;
        const value = await urlValidation(body);
        
        if(value.error) return res.status(422).send(value.error.details);
        
        const shortUrl = nanoid(10);

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

export async function deleteUrl(req, res) {
    try {
        const { userId } = res.locals;
        const { id } = req.params;

        if(!id) return res.sendStatus(422);

        const { rows: linkList } = await connection.query(`
            SELECT id, "userId" FROM links
            WHERE id = $1
        `, [id]);

        if(linkList <= 0) return res.sendStatus(404);
        
        if(linkList.some(link =>
            link.userId !== userId
        )) return res.sendStatus(401);

        await connection.query(`
            DELETE FROM links
            WHERE id = $1
        `, [id]);

        res.sendStatus(204);
    } catch(e) {
        res.status(500).send(e);
    }
}

export async function getUserLinks(_, res) {
    try {
        const { userId } = res.locals;
        console.log(userId);
        const { rows: userList } = await connection.query(`
            SELECT
                users.id AS "id",
                users.name AS "name",
                SUM(links.views) AS "visitCount",
                json_agg(
                    json_build_object(
                        'id', links.id,
                        'shortUrl', links."shortUrl",
                        'url', links.url,
                        'visitCount', links.views
                    )
                ) as "shortenedUrls"
            FROM users 
            JOIN links ON
            users.id = links."userId"
            WHERE users.id = $1
            GROUP BY users.id
        `, [userId]);

        if(userList <= 0) return res.sendStatus(404);

        res.status(200).send(...userList);
    } catch(e) {
        res.status(500).send(e);
    }
}