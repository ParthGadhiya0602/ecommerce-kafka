import { isArray } from "lodash";
import { Product } from "../models/product.model";
import { ResponseHandler } from "./responseHandler";
import { CommonObject, SimpleArray, SimpleObject } from "./types";

export const createSuccessResponse = (
  code: string,
  body: SimpleObject | SimpleObject[]
) => {
  const responseHandler = new ResponseHandler(code);
  responseHandler.addData(body);
  return JSON.parse(JSON.stringify(responseHandler.getResponse()));
};

export const createErrorResponse = (code: string, body: SimpleObject = {}) => {
  const responseHandler = new ResponseHandler(code);
  responseHandler.addData(body);
  return JSON.parse(JSON.stringify(responseHandler.getResponse()));
};

export function transformProductToSimpleObject(
  product: Product | Product[]
): SimpleObject | SimpleObject[] {
  if (isArray(product)) {
    return JSON.parse(JSON.stringify(product));
  }
  return { ...product };
}
