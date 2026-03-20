import { NextResponse } from "next/server";

import { IGenericErrorMessage } from "@/types/response";

export const sendErrorResponse = (
  statusCode: number,
  message: string,
  errorMessages?: IGenericErrorMessage[],
  success = false,
) => {
  return NextResponse.json(
    {
      statusCode,
      success,
      message,
      errorMessages: errorMessages || [],
    },
    { status: statusCode },
  );
};

export const sendSuccessResponse = <T>(
  statusCode: number,
  message: string,
  data?: T,
) => {
  return NextResponse.json(
    {
      statusCode,
      success: true,
      message,
      data,
    },
    { status: statusCode },
  );
};
