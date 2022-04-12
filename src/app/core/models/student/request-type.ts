import { Status } from "../enum/status";

export class RequestType {
    id: number = 0;
    name: string = "";
    description: string = "";
    status: Status = Status.Active;
    note: string = "";
    sortOrder: number = 0;
    createDate: string | null = "";
    modifyDate: string | null = "";
}