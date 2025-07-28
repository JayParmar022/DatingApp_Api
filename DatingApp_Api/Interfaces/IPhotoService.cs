using CloudinaryDotNet.Actions;

namespace DatingApp_Api.Interfaces
{
    public interface IPhotoService
    {
         Task<DeletionResult> DeletePhotoAsync(string publicId);
         Task<ImageUploadResult> UploadPhotoAsync(IFormFile file);
    }
}
