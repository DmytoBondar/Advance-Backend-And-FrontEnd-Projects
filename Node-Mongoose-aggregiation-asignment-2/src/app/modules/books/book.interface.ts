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