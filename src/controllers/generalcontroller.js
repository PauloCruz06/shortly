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