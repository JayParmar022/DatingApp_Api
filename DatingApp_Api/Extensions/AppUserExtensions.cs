﻿using DatingApp_Api.Dtos;
using DatingApp_Api.Entities;
using DatingApp_Api.Interfaces;

namespace DatingApp_Api.Extensions
{
    public static class AppUserExtensions
    {
        public static UserDto ToDto(this AppUser user , ITokenService tokenService)
        {
            return new UserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = tokenService.CreateToken(user)
            };
        }
    }
}
