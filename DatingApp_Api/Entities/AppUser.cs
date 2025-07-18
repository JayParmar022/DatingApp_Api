﻿namespace DatingApp_Api.Entities
{
    public class AppUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string DisplayName { get; set; }
        public required string Email { get; set; }
        public string? ImageUrl { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] Passwordsalt { get; set; }

        //Nav Prop
        public Member Member { get; set; } = null!;
    }
}
