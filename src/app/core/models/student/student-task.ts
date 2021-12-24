import { RequestStatus } from "../enum/statusTask";

interface Task {
    requestId: number;
    studentId: number;
    receiverId: number | null;
    status: RequestStatus;
    note: string;
    finishDate: string | null;
    createDate: string | null;
    assignDate: string | null;

}

export class StudentTask implements Task {
    requestId: number = 0;
    studentId: number = 0;
    receiverId: number | null = null;
    status: RequestStatus = RequestStatus.Received;
    note: string = "";
    finishDate: string | null = "";
    createDate: string | null = "";
    assignDate: string | null = "";

}