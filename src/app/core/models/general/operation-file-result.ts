export class fileResponse {
    fileOriginalName: string = "";
    fileFullPath: string = "";
    fileLocalName: string = "";
    fileType: string = "";
    isImage: boolean = false;
    fileName: string = "";
    fileExtension: string = "";
    path: string = "";
    position: number = 0;
}


export class OperationFileResult {
    caption: string = "";
    message: string = "";
    success: Boolean = true;
    fileResponse: fileResponse =new fileResponse();
    fileResponses: fileResponse[] = []
}