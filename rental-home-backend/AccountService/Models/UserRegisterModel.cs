namespace AccountService.Models
{
    public class UserRegisterModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }

        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
       
        public bool isAdmin {  get; set; }
        public bool isOwner { get; set; }

        public bool isTenant{ get; set; }

    }
}
