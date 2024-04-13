import { AdvisingType } from "./advisingtype";
import { Employee } from "./employee";
import { Priority } from "./priority";
import { Status } from "./status";
import { Student } from "./student";
import { Subjects } from "./subjects";

export class Request {
    requestId: number = 0;
    student: Student;
    employees: Employee[] = [];
    title: String = "";
    dateCreated: Date = new Date();
    dateModified: Date = new Date();
    dateResolved: Date = new Date();
    advisingType: AdvisingType = new AdvisingType();
    subject: Subjects = new Subjects();
    description: String;
    actionTaken: String;
    priority: Priority = new Priority();
    status: Status = new Status();
}
