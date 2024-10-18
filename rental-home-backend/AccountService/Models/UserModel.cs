using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AccountService.Models
{
    public class UserModel
    {
        public UserModel()
        {
            isAdmin = false;
            isOwner = false;
            isTenant = true;
        }

        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }

        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        [DefaultValue(false)]
        public bool isAdmin { get; set; }

        [DefaultValue(false)]
        public bool isOwner { get; set; }

        [DefaultValue(true)]
        public bool isTenant { get; set; }

    }
}
