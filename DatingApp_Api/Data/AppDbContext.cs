﻿using DatingApp_Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DatingApp_Api.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options )
    {
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}
