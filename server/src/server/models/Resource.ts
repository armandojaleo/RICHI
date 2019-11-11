import { Schema, model, Document } from 'mongoose'

export interface IResource extends Document {

};

const resourceSchema = new Schema({
}, { strict: false });

export default model<IResource>('Resource', resourceSchema);