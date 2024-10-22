namespace PropertyService.Repository
{
    public interface IImageRepo
    {
        List<string> GenerateImageUrl(List<IFormFile> file);
    }
}
