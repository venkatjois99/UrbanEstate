namespace AccountService.Exceptions
{
    // Base class for custom exceptions
    public class AccountServiceException : Exception
    {
        public int StatusCode { get; set; }
        public string ErrorCode { get; set; }

        public AccountServiceException(string message, int statusCode = 500, string errorCode = "UNKNOWN_ERROR")
            : base(message)
        {
            StatusCode = statusCode;
            ErrorCode = errorCode;
        }
    }

    // Custom exception for user not found
    public class UserNotFoundException : AccountServiceException
    {
        public UserNotFoundException(string message)
            : base(message, 404, "USER_NOT_FOUND")
        {
        }
    }

    // Custom exception for invalid credentials
    public class InvalidCredentialsException : AccountServiceException
    {
        public InvalidCredentialsException(string message)
            : base(message, 401, "INVALID_CREDENTIALS")
        {
        }
    }

    // Custom exception for already existing email
    public class EmailAlreadyExistsException : AccountServiceException
    {
        public EmailAlreadyExistsException(string message)
            : base(message, 400, "EMAIL_ALREADY_EXISTS")
        {
        }
    }

    // Custom exception for any unexpected internal error
    public class InternalServerErrorException : AccountServiceException
    {
        public InternalServerErrorException(string message)
            : base(message, 500, "INTERNAL_SERVER_ERROR")
        {
        }
    }
}
