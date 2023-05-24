import { NextFunction, Request, Response } from "express";
import Book from "./book.model";
import { IBook } from "./book.interface";

export const getGenreFromDb = async (payload: any): Promise<IBook[]> => {
    const data = await Book.aggregate([
        { $match: { genre: payload } }
    ])
    return data;
}

export const getGenreAndPublisherFromDb = async (payload: any): Promise<IBook[]> => {
    const { genre, publisher } = payload;
    const data =
        await Book.aggregate(
            [
                { $match: { genre: genre, "publisher.name": publisher } }
            ]
        )
    return data;
}

export const filterByCategoriesFromDB = async (): Promise<IBook[]> => {
    const data =
        await Book.aggregate(
            [
                { $match: { rating: { $gte: 4 } } },

                {
                    $addFields: {
                        featured: {
                            $cond: {
                                if: { $gte: ["$rating", 4.5] },
                                then: "BestSeller",
                                else: "Popular"
                            }
                        }
                    }
                }
            ]
        )
    return data;
}


export const convertPriceIntoInteger = async (): Promise<any> => {
    const data = await Book.updateMany(
        { "publicationYear": { $gt: 2020 }, "tax rate": { $type: "string" } },
        { $set: { price: "$price" } });
    return data;
};  