using DatingApp_Api.Data;
using DatingApp_Api.Dtos;
using DatingApp_Api.Entities;
using DatingApp_Api.Extensions;
using DatingApp_Api.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Security.Cryptography;
using System.Text;

namespace DatingApp_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")] 
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if( await EmailExists(registerDto.Email)) return BadRequest("Email Taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                Passwordsalt = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password))
            };

            
            context.Users.Add(user);

            await context.SaveChangesAsync();

            return user.ToDto(tokenService);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.SingleOrDefaultAsync(x=>x.Email == loginDto.Email);
            if (user == null)
                return Unauthorized("Invalid email address");

            using var hmac = new HMACSHA512(user.Passwordsalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (var i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");
            }
            return user.ToDto(tokenService);
        }
        

        private async Task<bool> EmailExists(string email)
        {
            return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }

    }
}
