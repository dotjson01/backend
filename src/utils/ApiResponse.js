class ApiResponse {
    constructor(statusCode, data = null, message = "Success", errors = []) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 // client error
        this.errors = errors
    }

    send(res) {
        return res.status(this.statusCode).json(this)
    }
}

export {ApiResponse}