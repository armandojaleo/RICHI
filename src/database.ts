import mongoose from 'mongoose'

export async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/rrhh', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('>>> Database connected');
    }
    catch {
        console.log('Error');
    }
}