using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForDetailsDto>().ForMember(
                des=>des.PhotoUrl,ops=>
                ops.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(des=>des.Age,opt=>
                opt.MapFrom(src=>src.Dob.CalCulateAge()));
            CreateMap<User,UserForListDto>().ForMember(
                des=>des.PhotoUrl,ops=>
                ops.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(des=>des.Age,opt=>
                opt.MapFrom(src=>src.Dob.CalCulateAge()));
            CreateMap<Photo,PhtosForDetailsDto>();
        }
    }
}