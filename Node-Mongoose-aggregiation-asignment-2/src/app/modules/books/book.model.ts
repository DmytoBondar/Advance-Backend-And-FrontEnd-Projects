import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: String,
    genre: {
        type: String,
        required: true,
    },
    publicationYear: Number,
    publisher: {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        }
    },
    reviews: [{
        name: {
            type: String,
            required: true,
        },
        location: {

        }
    }],
    rating: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const Book = model("Book", bookSchema);

export default Book;
