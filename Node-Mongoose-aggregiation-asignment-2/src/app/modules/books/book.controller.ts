import { NextFunction, Request, Response } from "express";
import { convertPriceIntoInteger, filterByCategoriesFromDB, getGenreAndPublisherFromDb, getGenreFromDb } from "./book.service";

export const getGenre = async(req: Request, res:Response, next:NextFunction) => {
    const book = await getGenreFromDb(req.body.genre);
    res.status(200).json({
        status: "success",
        data: book,
    })
}

export const getGenreandPublisher = async(req: Request, res:Response, next:NextFunction) => {
    const book = await getGenreAndPublisherFromDb(req.body);
    res.status(200).json({
        status: "success",
        data: book,
    })
}
export const getDataByFilterCategories = async(req: Request, res:Response, next:NextFunction) => {
    const book = await filterByCategoriesFromDB();
    res.status(200).json({
        status: "success",
        data: book,
    })
}

export const convertallPriceIntoInteger = async(req: Request, res:Response, next:NextFunction) => {
    const book = await convertPriceIntoInteger();
    res.status(200).json({
        status: "success",
        data: book,
    })
}
