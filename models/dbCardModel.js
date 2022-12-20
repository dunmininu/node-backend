import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('cards', cardSchema);