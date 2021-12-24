import { Status } from "../enum/status";

export interface RequestType{
    id: number;
    name: string;
    description: string;
    status: Status;
    sortOrder: number;
    createDate: string | null;
    modifyDate: string | null;
}