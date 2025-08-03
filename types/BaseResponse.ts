// app/interfaces/ApiResponse.ts
export interface BaseResponse<T> {
    statusCode: any;
    message: string;
    data?: T;
}
