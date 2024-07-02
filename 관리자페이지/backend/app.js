// app.js

import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/notices.js';
import authRouter from './router/auth.js';
import { config } from "./config.js";
import { connectDB } from "./db/database.js";
import bodyParser from 'body-parser'
import cors from 'cors';



const app = express();

app.use(bodyParser.urlencoded({ extended:true}))

app.use(express.json());  // json로 연결
app.use(morgan("dev"));
app.use(cors())


app.use("/css", express.static("../css"))
app.use("/js", express.static("../js"))
app.use("/images", express.static("../images"))
app.use("/vendor", express.static("../vendor"))

// app.use("/css", express.static("../css"))
app.use("/project_img", express.static("../project_img"))


// 미들웨어 등록
app.use('/notices', tweetsRouter);  


app.use((req, res, next) => {
    res.sendStatus(404);
});

import {MongoClient} from 'mongodb'

// MongoDB Atlas 연결 문자열
const uri = 'mongodb+srv://mnbv7952:QaXnRBBZN83IE5F2@cluster0.oisrfab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function main() {
    const client = new MongoClient(uri);

    try {
        // MongoDB에 연결
        await client.connect();

        // 연결된 클라이언트로부터 데이터베이스 및 컬렉션 가져오기
        const database = client.db('test');
        const collection = database.collection('notices');

        // 데이터베이스에서 문서 가져오기
        const documents = await collection.find({}).toArray();

        // 가져온 문서 출력
        console.log('Documents from the collection:');
        console.log(documents);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        // 클라이언트 종료
        await client.close();
    }
}

main().catch(console.error);








// DB 연결 테스트!
connectDB().then(() => {
    console.log('몽구스를 사용하여 몽고디비에 접속 성공!')
    app.listen(config.host.port);
}).catch(console.error);