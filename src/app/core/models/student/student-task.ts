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
    createDate: string | null;
    assignDate: string | null;
    student:UserToken |null;
    quantity:number;
}

export class StudentTask implements Task {
    quantity: number =0;
    requestType:RequestType|null = null;
    student: UserToken  |null=null;
    requestId: number = 0;
    studentId: number = 0;
    receiverId: number | null = null;
    status: RequestStatus = RequestStatus.Received;
    note: string = "";
    finishDate: string | null = "";
    createDate: string | null = "";
    assignDate: string | null = "";

}


