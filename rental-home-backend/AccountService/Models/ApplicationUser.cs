using Microsoft.AspNetCore.Identity;

namespace AccountService.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string AppUserName {  get; set; }
    }
}
