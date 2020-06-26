using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string   Username { get; set; }
        [Required]
        [StringLength(8,MinimumLength=3,ErrorMessage="Passord must be in between 3 and 8")]
        public string Password { get; set; }
    }
}