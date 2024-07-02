import * as tweetRepository from '../data/notices.js';

export async function getTweets(req){
    const username = req.query.username;
    const data = await (username ? tweetRepository.getAllByUserId(userid)
                                 : tweetRepository.getAll());
    return data
}


// 하나의 트윗을 가져오는 함수
// getTweet
export async function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
}


// 트윗을 생성하는 함수
export async function createTweet(req, res, next) {
    const { id } = req.body;
    const { content } = req.body;
    const { date } = req.body;
    const tweet = await tweetRepository.create(content, id, date);
    res.status(201).json(tweet);
}

// 트윗을 변경하는 함수
export async function updateTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);
    if(tweet){
        res.status(201).json(tweet);
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
}

// 트윗을 삭제하는 함수
export async function deleteTweet(req, res, next) {
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}



// export async function getTweets(req, res) {
//     try {
//         const notices = await noticeRepository.getAll();
//         res.status(200).json(notices);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to load notices', error });
//     }
// }

// export async function getTweet(req, res) {
//     const id = req.params.id;
//     try {
//         const notice = await noticeRepository.getById(id);
//         if (notice) {
//             res.status(200).json(notice);
//         } else {
//             res.status(404).json({ message: 'Notice not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to load notice', error });
//     }
// }

// export async function createTweet(req, res) {
//     const { content } = req.body;
//     try {
//         const notice = await noticeRepository.create(content);
//         res.status(201).json(notice);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create notice', error });
//     }
// }

// export async function deleteTweet(req, res) {
//     const id = req.params.id;
//     if (!ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid ObjectId' });
//     }

//     try {
//         const result = await noticeRepository.remove(id);
//         if (result) {
//             res.status(200).json({ message: 'Notice deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Notice not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete notice', error });
//     }
// }



// import * as tweetRepository from '../data/notices.js';
// import { MongoClient, ObjectId } from 'mongodb';

// const uri = 'mongodb+srv://qkrgudrjs1:0PT2f55grgVm7YCT@cluster0.ahfb4su.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const client = new MongoClient(uri);

// let db, noticesCollection;

// async function connectToDatabase() {
//     if (!db) {
//         await client.connect();
//         db = client.db('test'); // 데이터베이스 이름을 지정하세요
//         noticesCollection = db.collection('notices'); // 컬렉션 이름을 지정하세요
//     }
// }
// export async function getTweets(req, res) {
//     try {
//         await connectToDatabase();
//         const notices = await noticesCollection.findAll({}).toArray();
//         res.status(200).json(notices); // JSON 응답 반환
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to load notices', error });
//     }
// }

// export async function getTweet(req, res) {
//     const id = req.params.id;
//     try {
        

//         await connectToDatabase();
//         const notice = await noticesCollection.findOne({ _id: new ObjectId(id) });
//         if (notice) {
//             res.status(200).json(notice); // JSON 응답 반환
//         } else {
//             res.status(404).json({ message: 'Notice not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to load notice', error });
//     }
// }

// export async function createTweet(req, res) {
//     const notice = req.body;
//     console.log(req.body)
//     console.log(notice.content)
//     console.log('createTweet 진입')
//     try {
//         // 클라이언트로부터 받은 데이터의 형식을 검증
//         // if (typeof notice !== 'object' || notice === null) {
//         //     throw new Error('Invalid data format: Notice must be an object');
//         // }
//         // if (typeof notice.content !== 'string' || notice.content.trim() === '') {
//         //     throw new Error('Invalid data format: Content must be a non-empty string');
//         // }

//         // 데이터베이스에 연결
//         await connectToDatabase();

//         // 데이터베이스에 공지 추가
//         const result = await noticesCollection.insertOne(notice);
    
//         console.log('게시글 작성완료')
//         console.log(result)
//         // 성공적으로 공지를 추가한 경우
//         // res.status(201).json(result); // JSON 응답 반환
//         res.status(201).redirect('/notices/notice')
//     } catch (error) {
//         // 오류가 발생한 경우
//         console.log(error)
//         res.status(500).json({ message: 'Failed to create notice', error });
//     }
// }

// export async function deleteTweet(req, res) {
//     const id = req.params.id;
//     if (!ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid ObjectId' });
//     }

//     try {
//         await connectToDatabase();
//         const result = await noticesCollection.deleteOne({ _id: new ObjectId(id) });
//         if (result.deletedCount === 1) {
//             res.status(200).json({ message: 'Notice deleted successfully' }); // JSON 응답 반환
//         } else {
//             res.status(404).json({ message: 'Notice not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete notice', error });
//     }
// }











// 여러 트윗을 가져오는 함수
// getTweets
// export async function getTweets(req, res){
//     const username = req.query.username;
//     const data = await (username ? tweetRepository.getAllByUsername(username)
//                                  : tweetRepository.getAll());
//     res.status(200).json(data);
// }

// // 하나의 트윗을 가져오는 함수
// // getTweet
// export async function getTweet(req, res, next) {
//     const id = req.params.id;
//     const tweet = await tweetRepository.getById(id);
//     if(tweet){
//         res.status(200).json(tweet);
//     }else{
//         res.status(404).json({message: `${id}의 트윗이 없습니다`})
//     }
// }

// // 트윗을 생성하는 함수
// export async function createTweet(req, res, next) {
//     const { content } = req.body;
//     const { date } = req.body;
//     const tweet = await tweetRepository.create(content, date);
//     res.status(201).json(tweet);
// }

// // 트윗을 변경하는 함수
// export async function updateTweet(req, res, next) {
//     const id = req.params.id;
//     const text = req.body.text;
//     const tweet = await tweetRepository.update(id, text);
//     if(tweet){
//         res.status(201).json(tweet);
//     }else{
//         res.status(404).json({message: `${id}의 트윗이 없습니다`})
//     }
// }

// // 트윗을 삭제하는 함수
// export async function deleteTweet(req, res, next) {
//     const id = req.params.id;
//     await tweetRepository.remove(id);
//     res.sendStatus(204);
// }
