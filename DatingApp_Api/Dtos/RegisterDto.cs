﻿using System.ComponentModel.DataAnnotations;

namespace DatingApp_Api.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; } = "";

        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        [MinLength(4)]
        public string Password { get; set; } = "";
    }
}
