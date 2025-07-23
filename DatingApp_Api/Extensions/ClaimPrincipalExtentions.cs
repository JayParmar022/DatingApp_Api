using System.Security.Claims;

namespace DatingApp_Api.Extensions
{
    public static class ClaimPrincipalExtentions
    {
        public static string GetMemberId(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new Exception("Cannot get memberId from token");
        }
    }
}
