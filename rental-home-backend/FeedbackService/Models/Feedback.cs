using System;
using System.ComponentModel.DataAnnotations;

namespace FeedbackServices.Models
{
    public class Feedback
    {
        [Key]
        public string Id { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(200)]
        public string FeedbackText { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
