import { Router } from "express";
import { getUrl } from "../controllers/generalcontroller.js";

const generalrouter = Router();

generalrouter.get('/urls/:id', getUrl);

export default generalrouter;