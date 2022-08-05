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