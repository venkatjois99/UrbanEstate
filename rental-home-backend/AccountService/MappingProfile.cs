using AccountService.Models.ModelsDTO;
using AccountService.Models;
using AutoMapper;

namespace AccountService
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<UserModel , UserDTOModel>();
            CreateMap<UserDTOModel, UserModel>()
            .ForMember(dest => dest.UserId, opt => opt.Ignore()) // Ignore UserId if not in DTO
            .ForMember(dest => dest.UserRole, opt => opt.MapFrom(src => "tenant")); // Default value for isAdmin
           
            }
    }
}
