// db/database.js

import { config } from '../config.js';
import Mongoose from 'mongoose';

export async function connectDB(){
    return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema){
    schema.virtual('id').get(function(){
        return this._id.toString();
    });
    schema.set('toJSN', {virtusls:true});
    schema.set('toObject', {virtusls:true}); 
}

let db;

export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('tweets');
}

// 공지
export function getNotices(){
    return db.collection('notices');
}