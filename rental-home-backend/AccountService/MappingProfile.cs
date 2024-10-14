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
            .ForMember(dest => dest.isAdmin, opt => opt.MapFrom(src => false)) // Default value for isAdmin
            .ForMember(dest => dest.isOwner, opt => opt.MapFrom(src => false)) // Default value for isOwner
            .ForMember(dest => dest.isTenant, opt => opt.MapFrom(src => true)); // Default value for isTenant
        }
    }
}
