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
            CreateMap<UserForUpdateDto,User>();
            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto,Photo>();
            CreateMap<UserForRegisterDto,User>();
            CreateMap<MessageForCreationDto,Message>().ReverseMap();
            CreateMap<Message,MessageToReturnDto>().ForMember(m=>m.SenderPhotoUrl,opt=>opt.MapFrom(u=>u.Sender.Photos.
                 FirstOrDefault(p=>p.IsMain).Url)).ForMember(m=>m.RecipientPhotoUrl,opt=>opt.MapFrom(u=>u.Recipient.Photos.
                 FirstOrDefault(p=>p.IsMain).Url));
        }
    }
}