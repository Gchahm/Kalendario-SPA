export class ApiError {
  status: number;
  detail: any;
}


export class ValidationError extends ApiError {
  status: number;
  detail: { [key: string]: any };

  static fromJS(data: any): ValidationError {
    const error = new ValidationError();
    error.status = data.status;
    error.detail = data.detail;
    return error;
  }
}
