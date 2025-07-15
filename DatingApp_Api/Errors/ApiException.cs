namespace DatingApp_Api.Errors
{
    public class ApiException(int stastusCode, string message, string? details)
    {
        public int StastusCode { get; set; } = stastusCode;
        public string Message { get; set; } = message;
        public string? Details { get; set; }= details;
    }
}
