using DatingApp_Api.Entities;
using DatingApp_Api.Helpers;

namespace DatingApp_Api.Interfaces
{
    public interface IMemberRepository
    {
        void Update(Member member);
        Task<bool> SaveAllAsync();
        Task<PaginatedResult<Member>> GetMembersAsync(PagingParams pagingParams);
        Task<Member?> GetMemberByIdAsync(string id);
        Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberId);
        Task<Member?> GetMemberForUpdate(string id);

    }
}
