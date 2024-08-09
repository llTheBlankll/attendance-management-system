import {ExecutionStatus} from "../enums/ExecutionStatus";

export interface MessageDTO {
  message: string;
  status: ExecutionStatus;
}
