// "title": "Book 1",
//       "author": ["Author 1", "Author 2"],
//       "genre": "Mystery",
//       "publicationYear": 2020,
//       "publisher": { "name": "Publisher A", "location": "City A" },
//       "reviews": [
//          { "user": "User 1", "comment": "Great book!" },
//          { "user": "User 2", "comment": "Interesting plot" }
//       ],
//       "rating": 4.5,

import { Model } from "mongoose";

//       "price": "90"
type IPublisher = {
    name: string;
    location: string;
}

export interface IBook {
    id: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    publisher: IPublisher;
    reviews: [
        {
            user: string;
            comment: string;
        }
    ],
    rating: number;
    price: number;
}

export interface IBookMethods{
    fullName(): string;
}
// export interface BookModel extends Model<IBook, {}, IBookMethods>{

// }