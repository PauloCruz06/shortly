import connection from "../dbstrategy/postgres.js";

export async function getUrl(req, res) {
    try {
        const { id } = req.params;

        if(!id) return res.sendStatus(422);

        const { rows: urlList } = await connection.query(`
            SELECT 
                id, "shortUrl", url
            FROM links WHERE
            id = $1
        `, [id]);

        if(urlList.length <= 0) return res.sendStatus(404);

        res.status(200).send(...urlList);
    } catch(e) {
        res.status(500).send(e);
    }
}

export async function openUrl(req, res) {
    try {
        const { shortUrl } = req.params;

        if(!shortUrl) return res.sendStatus(422);

        const { rows: urlList } = await connection.query(`
            SELECT 
                id, url, "views"
            FROM links WHERE
            "shortUrl" = $1
        `, [shortUrl]);

        if(urlList.length <= 0) return res.sendStatus(404);

        const views = Number(urlList[0].views) + 1;
        const id = urlList[0].id;

        await connection.query(`
            UPDATE links SET
            "views" = $1
            WHERE id = $2
        `, [views, id]);

        res.status(302).redirect(urlList[0].url);
    } catch (error) {
        res.status(500).send(e);   
    }
}

export async function getRanking(_, res) {
    try {
        const { rows: ranking } = await connection.query(`
            SELECT 
            users.id AS "id", 
            users.name as "name",
            COUNT(links.url) AS "linksCount",
            COALESCE(SUM(links.views), 0) AS "visitCount"
            FROM users
            LEFT JOIN links ON
            users.id = links."userId"
            GROUP BY users.id
            ORDER BY 
                "visitCount" DESC,
                "linksCount" DESC
            LIMIT 10;
        `);

        res.status(200).send(ranking);
    } catch(e) {
        res.status(500).send(e);
    }
}