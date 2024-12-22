import {CodeStatus} from "../enums/CodeStatus";

export interface MessageDTO {
  message: string;
  status: CodeStatus;
}
