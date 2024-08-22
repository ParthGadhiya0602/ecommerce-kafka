import { SimpleObject } from "./types";

export const errorMsgs: SimpleObject = {
  BAD_REQUEST_ERROR: "Bad Request. Please provide valid request.",
  INTERNAL_SERVER_ERROR: "Something went wrong. Kindly contact administrator.",
  PRODUCT_NOT_FOUND: "Not Found. Please try something else.",
  EXCEEDS_LIMIT_ERROR: "Field exceeds allowed character limit",
  RESOURCE_UNAVAILABLE_ERROR:
    "Resource is unavailable. Kindly contact administrator.",
  PRODUCT_ALREADY_EXISTS: "Product already Exists.",
  VALIDATION_FAILED: "Field validation failed.",
  UNPROCESSABLE_ENTITY: "Unable to process the contained instruction",
};

export const responseMsgs: SimpleObject = {
  OK: "Success",
  PRODUCT_CREATED_SUCCESS: "Product created successfully.",
  NO_PRODUCT_FOUND: "No product found",
  PRODUCT_UPDATED_SUCCESS: "Product updated successfully.",
  PRODUCT_FETCH_SUCCESS: "Product details fetched successfully",
};
