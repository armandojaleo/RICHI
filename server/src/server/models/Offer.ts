import { Schema, model, Document } from 'mongoose'

export interface IOffer extends Document {

};

const offerSchema = new Schema({
    
}, { strict: false });

export default model<IOffer>('Offer', offerSchema);