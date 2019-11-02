import { Schema, model, Document } from 'mongoose'

export interface IHoliday extends Document {

};

const holidaySchema = new Schema({
}, { strict: false });

export default model<IHoliday>('Holiday', holidaySchema);