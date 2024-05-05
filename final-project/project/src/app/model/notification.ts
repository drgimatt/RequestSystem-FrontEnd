import { Request } from "./request";
import { Employee } from "./employee";
import { Student } from "./student";

export class Notification {
    id: number = 0;
    title: string = '';
    message: string = '';
    eventType: string = '';
    hasSeenNotif: number = 0;
    date: Date = new Date();
    notifyPersons: Employee[] | Student[] | null = null;
    eventUser: Employee | Student | null = null;
    request: Request | null = null;
}
