"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = exports.Unauthorized = exports.Forbidden = exports.NotFound = exports.Conflict = exports.Unprocessable = void 0;
//@ts-nocheck
class WebError {
    constructor(status, error) {
        this.status = status;
        this.error = error;
    }
}
class Unprocessable extends WebError {
    constructor(error) {
        super(422, error);
    }
}
exports.Unprocessable = Unprocessable;
class Conflict extends WebError {
    constructor(error) {
        super(409, error);
    }
}
exports.Conflict = Conflict;
class NotFound extends WebError {
    constructor(error) {
        super(404, error);
    }
}
exports.NotFound = NotFound;
class Forbidden extends WebError {
    constructor(error) {
        super(403, error);
    }
}
exports.Forbidden = Forbidden;
class Unauthorized extends WebError {
    constructor(error) {
        super(401, error);
    }
}
exports.Unauthorized = Unauthorized;
class BadRequest extends WebError {
    constructor(error) {
        super(400, error);
    }
}
exports.BadRequest = BadRequest;
class ErrorUtils {
    static catchError(res, error) {
        console.log(error);
        return res.status(error.status || 500).json(error);
    }
}
exports.default = ErrorUtils;
