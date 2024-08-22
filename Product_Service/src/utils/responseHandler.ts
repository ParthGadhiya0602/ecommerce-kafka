import { isEmpty } from "lodash";
import customResponses from "./customResponses";
import { CommonObject, SimpleObject } from "./types";

export class ResponseHandler {
  responseBody: CommonObject = {};
  statusCode: number;

  constructor(code: string) {
    this.responseBody.meta = customResponses[code];
    this.statusCode = Number(this.responseBody.meta.statusCode);
  }

  addData(responseData: SimpleObject | SimpleObject[]): void {
    if (!isEmpty(responseData)) {
      this.responseBody.data = JSON.parse(JSON.stringify(responseData));
    }
  }

  getResponse(): CommonObject {
    return this.responseBody;
  }
}
