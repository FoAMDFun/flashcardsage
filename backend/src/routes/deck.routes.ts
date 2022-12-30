import { Router, Request, Response, NextFunction } from "express";
import * as DeckController from "../controllers/deck.controller";

export const deckRoutes = Router();
deckRoutes.post("/", (req: Request, res: Response, next: NextFunction) =>
  DeckController.createDeck(req, res, next)
);
deckRoutes.get("/", (req, res, next) => DeckController.getDecks(req, res, next));
deckRoutes.delete("/:_id", (req: Request, res: Response, next: NextFunction) =>
  DeckController.deleteDeck(req, res, next)
);
