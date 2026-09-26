import mongoose from "mongoose";

declare global {
  var mongoose: {
    Types: any;
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}