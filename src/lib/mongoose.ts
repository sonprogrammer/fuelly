import mongoose from "mongoose";

const cached = global.mongoose ?? {
    conn: null,
    promise: null
}

if (!global.mongoose) {
    global.mongoose = cached
}

async function dbConnect() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const uri = process.env.MONGODB_URI
        if (!uri) {
            throw new Error('there is no mongodb uri')
        }
        cached.promise = mongoose.connect(uri).then((mongoose) => mongoose)
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect