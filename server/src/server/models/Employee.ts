import { Schema, model, Document } from 'mongoose'

export interface IEmployee extends Document {

};

const employeeSchema = new Schema({
}, { strict: false });

export default model<IEmployee>('Employee', employeeSchema);