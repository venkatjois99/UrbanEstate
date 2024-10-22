using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;
using PropertyService.Repository;

namespace PropertyService.Services
{
    public class ImageRepository : IImageRepo
    {
        private readonly Cloudinary cloudinary;

        public ImageRepository()
        {
            DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));
            cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
            cloudinary.Api.Secure = true;
        }

        public List<string> GenerateImageUrl(List<IFormFile> files)
        {
            List<string> imageUrl = new List<string>();
           foreach (var file in files)
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream()), // Use the uploaded file stream
                    Folder = "PropertyImage",
                    UseFilename = true,
                    UniqueFilename = false,
                    Overwrite = true
                };
                var uploadResult = cloudinary.Upload(uploadParams);
                Console.WriteLine(uploadResult.JsonObj);
                imageUrl.Add(uploadResult.Url.ToString());
            }
            return imageUrl;
        }
    }
}
