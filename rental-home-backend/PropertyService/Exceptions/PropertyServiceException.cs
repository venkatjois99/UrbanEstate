namespace PropertyService.Exceptions
{
    public class PropertyServiceException : Exception
    {
        public int StatusCode { get; }
        public string ErrorMessage { get; }

        // Constructor for general error
        public PropertyServiceException(string message, int statusCode = 500)
            : base(message)
        {
            StatusCode = statusCode;
            ErrorMessage = message;
        }

        // Constructor with inner exception
        public PropertyServiceException(string message, Exception innerException, int statusCode = 500)
            : base(message, innerException)
        {
            StatusCode = statusCode;
            ErrorMessage = message;
        }
    }
}