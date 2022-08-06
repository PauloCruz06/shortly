import { Router } from "express";
import { getUrl, openUrl, getRanking } from "../controllers/generalcontroller.js";

const generalrouter = Router();

generalrouter.get('/urls/:id', getUrl);
generalrouter.get('/urls/open/:shortUrl', openUrl);
generalrouter.get('/ranking', getRanking);

export default generalrouter;