import { RequestStatus } from "../enum/statusTask";
import { RequestType } from "./request-type";
import { StudentViewModel, UserToken } from "./student";

interface Task {
    requestId: number;
    studentId: number;
    receiverId: number | null;
    status: RequestStatus;
    note: string;
    finishDate: string | null;
    filePath: string | null;
    fileName: string | null;
    createDate: string | null;
    assignDate: string | null;
    student: UserToken | null;
    quantity: number;
    id: number;
}

export class StudentTask implements Task {
    filePath: string | null = null;
    fileName: string | null = null;
    id: number = 0;
    quantity: number = 1;
    requestType: RequestType | null = null;
    student: UserToken | null = null;
    requestId: number = 0;
    studentId: number = 0;
    receiverId: number | null = null;
    status: RequestStatus = RequestStatus.Received;
    note: string = "";
    finishDate: string | null = "";
    createDate: string | null = "";
    assignDate: string | null = "";

}


