export class RequestError extends Error {
  constructor(msg: string, public response: Response) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
