using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PropertyService.Models
{
    public class PropertyModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId {  get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string PropertyType { get; set; } // 'apartment', 'pg', 'flatmate'

        [Required]
        public string Location { get; set; }

        [Required]
        [StringLength(200)]
        public string Address { get; set; }
        public string? LatLng { get; set; } // Nullable PG type



        [Required]
      
        public decimal Rent { get; set; }

        [Required]
       
        public string Description { get; set; }

        public List<string>? Images { get; set; } // Store image URLs or paths

        // Allow nulls for these properties
        public string? BHKType { get; set; } // Nullable BHK type
        public string? Furnishing { get; set; } // Nullable furnishing type
        public string? PgSharingType { get; set; } // Nullable PG type
        public string? PgLivingType { get; set; } // Nullable PG type


        [Range(0, int.MaxValue, ErrorMessage = "Available rooms must be a non-negative number.")]
        public int? AvailableRooms { get; set; } // Nullable for optional entry


        public int? SharedBedrooms { get; set; } // Nullable for optional entry
        public string? PreferredFlatmate { get; set; } // Nullable preferred flatmate
        public DateTime PostingDate { get; set; } = DateTime.UtcNow;
    }
}
