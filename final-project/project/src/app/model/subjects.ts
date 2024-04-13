import { Department } from "./department";
import { Employee } from "./employee";

export class Subjects {
    myId: number = 0;
    courseCode: String = "";
    name: String = "";
    department: Department;
    employees: Employee[] = [];
}
