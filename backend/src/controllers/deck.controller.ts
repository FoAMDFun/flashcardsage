import logger from "../config/logger";
import * as createError from "http-errors";
import DeckService from "../services/deck.service";
import { Request, Response, NextFunction } from "express";

const noDataErrorMessage = "No data in request";

export const getDecks = async (req: Request, res: Response, next: NextFunction) => {
  const deckService = new DeckService();
  deckService
    .getDecks()
    .then((decks) => {
      logger.debug(`Decks get ${decks.length} item(s)`);
      return res.status(200).json(decks);
    })
    .catch((err) => {
      logger.error(`Decks get error: ${err.message}`);
      return next(new createError.InternalServerError(err.message));
    });
};

export const createDeck = async (req: Request, res: Response, next: NextFunction) => {
  // Check request body
  if (req.body === undefined || req.body.title === undefined) {
    logger.error(`Decks post error: ${noDataErrorMessage}`);
    return next(new createError.BadRequest(noDataErrorMessage));
  }
  const deckService = new DeckService();
  return deckService
    .createDeck(req.body)
    .then((deck) => {
      logger.debug(`Decks post result: ${deck}}`);
      return res.status(201).json(deck);
    })
    .catch((err) => {
      logger.error(`Decks post error: ${err.message}`);
      return next(new createError.InternalServerError(err.message));
    });
};
