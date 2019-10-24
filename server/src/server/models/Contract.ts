import { Schema, model, Document } from 'mongoose'

export interface IContract extends Document {

};

const contractSchema = new Schema({
}, { strict: false });

export default model<IContract>('Contract', contractSchema);