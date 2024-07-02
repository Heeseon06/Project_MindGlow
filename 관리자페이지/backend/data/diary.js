import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as authRepository from './auth.js';

const diarySchema = new Mongoose.Schema({
    userid: {type: String, require: true},
    username: {type: String, require: true},
    title: {type: String, require: true},
    text: {type: String, require: true}
    // date: {type: Date, default: Date.now }
}, {timestamps: true})

useVirtualId(diarySchema);

// 생성 
const Diary = Mongoose.model('Diary', diarySchema);

// 모든 트윗을 리턴
export async function getAll() {
    return Diary.find().sort({createAt: -1});
}

// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return Diary.find({username}).sort({createAt: -1});
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return Diary.findById(id);
}

// 트윗을 작성
export async function create(text, username, title){
    return authRepository.findByUsername(username).then((user) => new Diary({ text, username, title}).save());
}

// 트윗을 변경
export async function update(id, text){
    return Diary.findByIdAndUpdate(id, {text}, {returnDocument: "after"});
}

// 트윗을 삭제
export async function remove(id){
    return Diary.findByIdAndDelete(id);
}

function mapTweets(tweets){
    return Diary.map(mapOptionalTweet);
}

function mapOptionalTweet(tweet){
    return Diary ? { ...tweet, id: tweet.insertedId } : tweet;
}