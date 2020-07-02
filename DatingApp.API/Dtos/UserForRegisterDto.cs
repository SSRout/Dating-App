using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        public UserForRegisterDto()
        {
            this.Created=DateTime.Now;
            this.LastActive=DateTime.Now;
        }
        [Required]
        public string   Username { get; set; }
        [Required]
        [StringLength(8,MinimumLength=3,ErrorMessage="Passord must be in between 3 and 8")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime Dob { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    }
}