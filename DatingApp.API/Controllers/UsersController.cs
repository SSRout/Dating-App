using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{

    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper 
        _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromDb=await _repo.GetUser(currentUserId);
            userParams.UserId=currentUserId;
            if(string.IsNullOrEmpty(userParams.Gender)){
                userParams.Gender=userFromDb.Gender=="male"?"female":"male";
            }
            var users=await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage,users.PageSize,users.TotalCount,users.TotalPages);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}",Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = _mapper.Map<UserForDetailsDto>(await _repo.GetUser(id));
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id,UserForUpdateDto updateUserDto){

            //Check Authenticated user or Not
            if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
             return Unauthorized();

            var userFromDb=await _repo.GetUser(id);
            _mapper.Map(updateUserDto,userFromDb);

            if(await _repo.SaveAll()){
                return NoContent();
            }

            throw new Exception($"Upadting Failed for User : {id}");
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id,int recipientId){
            if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
             return Unauthorized();
            var like=await _repo.GetLike(id,recipientId);
            if(like!=null){
                return BadRequest("Already Liked This User");
            }
            if(await _repo.GetUser(recipientId)==null){
                return NotFound();
            }

            like=new Models.Like{
                LikeeId=recipientId,
                LikerId=id
            };
            _repo.Add<Models.Like>(like);
            if(await _repo.SaveAll())
                return Ok();
            return BadRequest("Like Failed");

        }

    }
}