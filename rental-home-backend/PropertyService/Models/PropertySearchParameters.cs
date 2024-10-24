namespace PropertyService.Models
{
   
        public class PropertySearchParameters
        {
            public string? Location { get; set; }
            public string? PropertyType { get; set; } // e.g., apartment, pg, flatmate
            public string? BhkType { get; set; }
            public string? PgSharingType { get; set; }
            public string? PgLivingType { get; set; }
            public string? PreferredFlatmate { get; set; }
        public decimal? MinRent { get; set; }
        public decimal? MaxRent { get; set; }
        public string? Address { get; set; }
    }

    }

