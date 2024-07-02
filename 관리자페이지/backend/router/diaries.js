// tweets.js

import express from "express";
import * as tweetController from '../controller/diary.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import path, {dirname} from 'path'
import { fileURLToPath } from "url"

const router = express.Router();


const validateTweet = [
    body('text').trim().isLength({min: 3}).withMessage('최소 3자 이상 입력'), validate
]


// 해당 아이디에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
// http://localhost:8080/tweets?username=banana
// router.get('/', isAuth, tweetController.getTweets);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, "../../frontend/index.html"))
});

router.get('/add', tweetController.getTweets);

// 글번호에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets/:id
// http://localhost:8080/tweets/1
// router.get('/:id', isAuth, tweetController.getTweet);
router.get('/:id',  tweetController.getTweet);

// 트윗하기
// POST
// http://localhost:8080/tweets
// name, username, text
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
// {
//     "id":55,
//     "text":"트윗을 추가했어요555",
//     "name":"김사과",
//     "username":"apple"
// }
// router.post('/', validateTweet, isAuth, tweetController.createTweet);
// router.post('/', validateTweet, tweetController.createTweet);
router.post('/', tweetController.createTweet);

// 트윗 수정하기
// PUT
// http://localhost:8080/tweets/:id
// http://localhost:8080/tweets/1
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
// {
//     "text":"트윗을 변경했어요!"
// }
// router.put('/:id', validateTweet, isAuth, tweetController.createTweet);
router.put('/:id', validateTweet, tweetController.createTweet);

// 트윗 삭제하기
// DELETE
// http://localhost:8080/tweets/:id:
// router.delete('/:id', isAuth, tweetController.deleteTweet);
router.delete('/:id', tweetController.deleteTweet);

export default router; 