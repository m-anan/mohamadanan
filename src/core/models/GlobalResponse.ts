// The expected response structure for ALL of our API calls.
export default interface GlobalResponse<T> extends Partial<Response> {
  data: T;
  message: string;
  isError: boolean;
  errorMessage: string;
  statusCode: number;
}
