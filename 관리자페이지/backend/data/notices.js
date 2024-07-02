import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as authRepository from './auth.js';


// Notice Schema
const noticeSchema = new Mongoose.Schema({
    content: { type: String, required: true },
}, {timestamps: true});

useVirtualId(noticeSchema);

// 생성 
const Notice = Mongoose.model('Notice', noticeSchema);

// 모든 트윗을 리턴
export async function getAll() {
    return Notice.find().sort({createAt: -1});
}

// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return Notice.find({username}).sort({createAt: -1});
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return Notice.findById(id);
}

// 트윗을 작성
export async function create(content, username, date){
    return authRepository.findByUsername(username).then((user) => new Notice({ content, username, date}).save());
}

// 트윗을 변경
export async function update(id, text){
    return Notice.findByIdAndUpdate(id, {text}, {returnDocument: "after"});
}

// 트윗을 삭제
export async function remove(id){
    return Notice.findByIdAndDelete(id);
}

function mapTweets(tweets){
    return Notice.map(mapOptionalTweet);
}

function mapOptionalTweet(tweet){
    return Notice ? { ...tweet, id: tweet.insertedId } : tweet;
}