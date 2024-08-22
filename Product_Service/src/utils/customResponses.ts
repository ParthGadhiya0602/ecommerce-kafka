import moment from "moment";
import { DATE_FORMAT, TIME_FORMAT } from "./constants";
import { responseMsgs, errorMsgs } from "./messages";
import { CommonObject, Scalar } from "./types";

const formatDate = (date: Date): Scalar => {
  if (date) {
    return moment(date).format(DATE_FORMAT);
  }
  return moment().format(TIME_FORMAT);
};

const customResponses: CommonObject = {
  // Product updated successfully
  "PRODUCT-200": {
    timestamp: formatDate(new Date()),
    message: responseMsgs.PRODUCT_UPDATED_SUCCESS,
    code: "PRODUCT-200",
    statusCode: 200,
  },
  // Product created successfully
  "PRODUCT-201": {
    timestamp: formatDate(new Date()),
    message: responseMsgs.PRODUCT_CREATED_SUCCESS,
    code: "PRODUCT-201",
    statusCode: 201,
  },
  // Product created successfully
  "PRODUCT-204": {
    timestamp: formatDate(new Date()),
    message: responseMsgs.NO_PRODUCT_FOUND,
    code: "PRODUCT-204",
    statusCode: 204,
  },
  // Product create body validation fail
  "PRODUCT-400": {
    timestamp: formatDate(new Date()),
    message: errorMsgs.VALIDATION_FAILED,
    code: "PRODUCT-400",
    statusCode: 400,
  },
  "PRODUCT-404": {
    timestamp: formatDate(new Date()),
    message: errorMsgs.PRODUCT_NOT_FOUND,
    code: "PRODUCT-404",
    statusCode: 404,
  },
  //Product empty request body
  "PRODUCT-422": {
    timestamp: formatDate(new Date()),
    message: errorMsgs.UNPROCESSABLE_ENTITY,
    code: "PRODUCT-422",
    statusCode: 422,
  },
  //Product internal server error
  "PRODUCT-500": {
    timestamp: formatDate(new Date()),
    message: errorMsgs.INTERNAL_SERVER_ERROR,
    code: "PRODUCT-500",
    statusCode: 500,
  },
};
export default customResponses;
