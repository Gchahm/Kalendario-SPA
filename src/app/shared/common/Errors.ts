export class ValidationError {

  status: number;
  detail: {[key: string]: any};

  static fromJS(data: any): ValidationError {
    const error = new ValidationError();
    error.init(data);
    return error;
  }

  init(data) {
    this.status = data.status;
    this.detail = data.detail;
  }
}
