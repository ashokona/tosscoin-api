import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastGuess: {
        status: {
            type: String,
            enum: ['RESOLVED', 'INPROGRESS', 'FAILED']
        },
        date: {type: Date},
        goup: {type: Boolean},
        rate: {type: Number}
    },
    success: {type: Number},
    failed: {type: Number}
}, { timestamps: true });

export default mongoose.model("User", userSchema);