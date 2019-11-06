import express from 'express';
import morgan from 'morgan';
import AuthRoutes from './routes/auth'
import UserRoutes from './routes/user'
import ContractRoutes from './routes/contract'
import EmployeeRoutes from './routes/employee'
import HourRegistryRoutes from './routes/hourregistry'
import HolidayRoutes from './routes/holiday'
import path from 'path';
import cors from 'cors';

class Application {

    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 4000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/auth', AuthRoutes);
        this.app.use('/api/users', UserRoutes);
        this.app.use('/api/contracts', ContractRoutes);
        this.app.use('/api/employees', EmployeeRoutes);
        this.app.use('/api/hourregistries', HourRegistryRoutes);
        this.app.use('/api/holidays', HolidayRoutes);
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is running at', this.app.get('port'));
        });
    }
}

export default Application;