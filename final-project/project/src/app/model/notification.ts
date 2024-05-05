import { Request } from "./request";
import { Employee } from "./employee";
import { Student } from "./student";

export class Notification {
    id: number = 0;
    title: string = '';
    message: string = '';
    eventType: string = '';
    seenNotif: number = 0;
    date: Date = new Date();
    person: Employee | Student | null = null;
    request: Request | null = null;
}
