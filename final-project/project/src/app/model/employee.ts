import { Department } from "./department";
import { Subjects } from "./subjects";


export class Employee {
    myId: number = 0;
    employeeID: string = '';
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    position: string = '';
    department: Department;
    email: string = '';
    gender: string = '';    
    subjects: Subjects[] = [];
    dateAdded: Date = new Date();
    status: string = '';
}
