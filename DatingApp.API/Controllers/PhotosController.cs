using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.Threading.Tasks;
using DatingApp.API.Dtos;
using System.Security.Claims;
using DatingApp.API.Models;
using System.Linq;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userid}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
               );
            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}",Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id){
            var photoFormDb=await _repo.GetPhoto(id);
            var photo=_mapper.Map<PhotoForReturnDto>(photoFormDb);
            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhtoForUser(int userid,[FromForm]PhotoForCreationDto photoForCreationDto){
            //check authorize or not
            if(userid!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
              return Unauthorized();

            var userFromDb=await _repo.GetUser(userid);
            var file=photoForCreationDto.File;
            var uploadResult=new ImageUploadResult();
            if(file.Length>0){
                using(var stream=file.OpenReadStream()){
                    var uploadParams=new ImageUploadParams(){
                        File=new FileDescription(file.Name,stream),
                        Transformation=new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult=_cloudinary.Upload(uploadParams);
                }
            }
            photoForCreationDto.Url=uploadResult.Url.ToString();
            photoForCreationDto.PublicId=uploadResult.PublicId;
            var photo=_mapper.Map<Photo>(photoForCreationDto);
            if(!userFromDb.Photos.Any(u=>u.IsMain))
                photo.IsMain=true;
            
            userFromDb.Photos.Add(photo);

            if(await _repo.SaveAll()){
             var photoToReturn=_mapper.Map<PhotoForReturnDto>(photo);
             return CreatedAtRoute("GetPhoto",new {id=photo.Id},photoToReturn);
            }
            
            return BadRequest("Could not add Photo.");

        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId,int id){
            if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
              return Unauthorized();

            var user=await _repo.GetUser(userId);
            if(!user.Photos.Any(p=>p.Id==id))
              return Unauthorized();

            var photoFormDb=await _repo.GetPhoto(id);
            if(photoFormDb.IsMain)
               return BadRequest("This is Already Main Photo");

            var currentMainPhoto=await _repo.GetUserMainPhoto(userId);
            currentMainPhoto.IsMain=false;

            photoFormDb.IsMain=true;
            if(await _repo.SaveAll())
                return NoContent();
            return BadRequest("Could Not Set Photo to Main");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId,int id){
             if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
              return Unauthorized();

            var user=await _repo.GetUser(userId);
            if(!user.Photos.Any(p=>p.Id==id))
              return Unauthorized();

            var photoFormDb=await _repo.GetPhoto(id);
            if(photoFormDb.IsMain)
               return BadRequest("Cant Delete Your Main Photo");

           if(photoFormDb.PublicId!=null){
                var deleteParams=new DeletionParams(photoFormDb.PublicId);
            var result=_cloudinary.Destroy(deleteParams);
            if(result.Result=="ok"){
                 _repo.Delete(photoFormDb);
            }
           }
           //not store in cloud
           if(photoFormDb.PublicId==null){
                _repo.Delete(photoFormDb);
           }
            if(await _repo.SaveAll()){
                return Ok();
            }
            return BadRequest("Failed To Delete Photo");
        }   
        
     }
}