import { Schema, model, Document } from 'mongoose'

export interface IHourRegistry extends Document {

};

const hourRegistrySchema = new Schema({
}, { strict: false });

export default model<IHourRegistry>('HourRegistry', hourRegistrySchema);