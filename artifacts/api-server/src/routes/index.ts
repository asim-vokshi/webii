import { Router, type IRouter } from "express";
import healthRouter from "./health";
import newsRouter from "./news";
import eventsRouter from "./events";

const router: IRouter = Router();

router.use(healthRouter);
router.use(newsRouter);
router.use(eventsRouter);

export default router;
