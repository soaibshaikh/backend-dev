class ApiResponse  {
    constructor(statusCode, data, message="Success") {
        this.statusCode = statusCode < 400
        this.success = statusCode
        this.message = message
        this.data = data

        
    }
}