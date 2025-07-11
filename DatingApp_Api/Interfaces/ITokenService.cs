using DatingApp_Api.Entities;

namespace DatingApp_Api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken (AppUser user);

    }
}
