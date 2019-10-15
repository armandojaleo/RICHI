import express from 'express';
import morgan from 'morgan';
import AuthController from './routes/auth'
import path from 'path';

class Applicaction {

    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 4000);
        this.app.set('views', path.join(__dirname, 'views'));
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/auth', AuthController);
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('>>> Server is running at', this.app.get('port'));
        });
    }
}

export default Applicaction;