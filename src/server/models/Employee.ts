import { Schema, model, Document } from 'mongoose'

export interface IEmployee extends Document {
    name: string;
    position: string,
    office: string,
    salary: string
};

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default model<IEmployee>('Employee', employeeSchema);