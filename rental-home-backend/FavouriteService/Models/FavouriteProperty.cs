using System.ComponentModel.DataAnnotations;

namespace FavouriteService.Models
{
    public class FavouriteProperty
    {
        [Key] 
        public string UserId {  get; set; }
        public List<int> PropertyIds { get; set; }
    }
}
