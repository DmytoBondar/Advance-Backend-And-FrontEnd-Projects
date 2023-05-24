import express from 'express';
import { convertallPriceIntoInteger, getDataByFilterCategories, getGenre, getGenreandPublisher } from './book.controller';

const router = express.Router();

router.post('/genre', getGenre);
router.post('/genre-publisher', getGenreandPublisher);
router.get('/featured', getDataByFilterCategories);
router.get('/price-int', convertallPriceIntoInteger);
export default router;