import express from "express";
import * as tweetController from '../controller/notices.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import path, {dirname} from 'path'
import { fileURLToPath } from "url"

const router = express.Router();


const validateTweet = [
    body('text').trim().isLength({min: 3}).withMessage('최소 3자 이상 입력'), validate
]



// GET

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//관리자
router.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, "../../notices.html"))
});
router.get('/notice', (req, res, next)=>{
    const filePath = path.join(__dirname, "../../공지사항.html");
    res.status(200).sendFile(filePath)
});

//유저
router.get('/user', (req, res, next)=>{
    const filePath = path.join(__dirname, "../../5_공지사항.html");
    res.status(200).sendFile(filePath)
});

router.get('/notice123', async (req, res, next)=>{
    console.log(req.headers)
    const data = await tweetController.getTweets(req);
    console.log(data)
    res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({data})
})





router.get('/add', tweetController.getTweets);


// GET

router.get('/:id',  tweetController.getTweet);


// POST
router.post('/', tweetController.createTweet);


router.put('/:id', validateTweet, tweetController.createTweet);


// DELETE

router.delete('/notice/:id', tweetController.deleteTweet);

export default router; 