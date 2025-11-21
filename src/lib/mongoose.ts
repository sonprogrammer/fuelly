import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error('there is no mongodb uri')
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

async function dbConnect() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = mongoose
            .connect(MONGODB_URI!) 
            //느낌표로 절대 언디 파인드가 아니라는걸 알려주기
            .then((mongoose) => mongoose)
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect