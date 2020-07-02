using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config,IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userDto)
        {
            //validate request
            userDto.Username = userDto.Username.ToLower();
            if (await _repo.UserExists(userDto.Username))
                return BadRequest("User Alredy Exist");

            var userToCreate = _mapper.Map<User>(userDto);

            var createdUser = await _repo.Register(userToCreate, userDto.Password);
            var userToReturn=_mapper.Map<UserForDetailsDto>(createdUser);

            return CreatedAtRoute("GetUser",new {controller="USers",id=createdUser.Id},userToReturn);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto loginDto)
        {
            var userFromRepo = await _repo.Login(loginDto.Userid.ToLower(), loginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.UserName)
            };

            var kay = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds=new SigningCredentials(kay,SecurityAlgorithms.HmacSha256Signature);
             
            var tokenDescriptor=new SecurityTokenDescriptor{
                Subject=new ClaimsIdentity(claims),
                Expires=DateTime.Now.AddDays(1),
                SigningCredentials=creds

            };

            var tokenHandler=new JwtSecurityTokenHandler();

            var token=tokenHandler.CreateToken(tokenDescriptor);

            var user =_mapper.Map<UserForListDto>(userFromRepo);
            return Ok(new {
                token=tokenHandler.WriteToken(token),
                //return user with photo url to set in navbar
                user
            });

        }

    }
}