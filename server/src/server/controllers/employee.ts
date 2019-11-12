import express, { Request, Response } from 'express'
import Employee, { IEmployee } from '../models/Employee'


class EmployeeController {

    app: express.Application;

    constructor() {
        this.app = express(); 
    }

    // Get all employees
    public getEmployees = async (req: Request, res: Response) => {
        if (req.userRole !== 'Admin') return res.status(403).json('Forbidden Access');
        const employees = await Employee.find();
        if (!employees) {
            return res.status(404).json('No Employees found');
        }
        res.json(employees);
    };

    // New employee
    public createEmployee = async (req: Request, res: Response) => {
        if (req.userRole !== 'Admin') return res.status(403).json('Forbidden Access');
        try {
            const newEmployee: IEmployee = new Employee(req.body);
            await newEmployee.save();
            return res.json(newEmployee);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    // Get one
    public getEmployee = async (req: Request, res: Response) => {
        if (req.userRole !== 'Admin') return res.status(403).json('Forbidden Access');
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json('No Employee found');
        }
        res.json(employee);
    };

    // Edit employee
    public editEmployee = async (req: Request, res: Response) => {
        if (req.userRole !== 'Admin') return res.status(403).json('Forbidden Access');
        const { id } = req.params;
        const employee = req.body;
        await Employee.findByIdAndUpdate(id, { $set: employee }, { new: true });
        res.json(employee);
    };

    // Delete employee
    public deleteEmployee = async (req: Request, res: Response) => {
        if (req.userRole !== 'Admin') return res.status(403).json('Forbidden Access');
        await Employee.findByIdAndRemove(req.params.id);
        res.json({ status: 'Employee Deleted' });
    };
}

export default EmployeeController;