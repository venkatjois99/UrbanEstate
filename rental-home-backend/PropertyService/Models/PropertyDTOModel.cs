namespace PropertyService.Models
{
    public class PropertyDTOModel
    {

        public int UserId { get; set; }
        public string Title { get; set; }
        public string PropertyType { get; set; }
        public string Location { get; set; }
        public string Address { get; set; }
        public decimal Rent { get; set; }
        public string Description { get; set; }
        public List<IFormFile>? Images { get; set; }
        public string? BHKType { get; set; }
        public string? Furnishing { get; set; }
        public string? PgSharingType { get; set; }
        public string? PgLivingType { get; set; }
        public int? AvailableRooms { get; set; }
 
        public int? SharedBedrooms { get; set; }
        public string? PreferredFlatmate { get; set; }
        public DateTime PostingDate { get; set; } = DateTime.UtcNow;
    }
}
