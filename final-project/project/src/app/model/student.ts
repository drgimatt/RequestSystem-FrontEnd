import { Department } from "./department";

export class Student {
    myId: number = 0;
    studentID: string = '';
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    program: string = '';
    department: Department;
    yearLevel: number = 0;
    email: string = '';
    gender: string = '';    
    dateAdded: Date = new Date();
}
