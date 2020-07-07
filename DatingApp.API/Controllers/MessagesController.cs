using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController:ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public MessagesController(IDatingRepository repo,IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
            
        }
        [HttpGet("{id}",Name="GetMessage")]
        public async Task<IActionResult> GetMessage(int userId,int id){
             if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
               return Unauthorized();
            
            var messageFromDb=await _repo.GetMassage(id);
            if(messageFromDb==null)
              return NotFound();
            return Ok(messageFromDb);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId,[FromQuery]MessageParams msgParams){
             if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
               return Unauthorized();
            msgParams.UserId=userId;
            var messageFromDb=await _repo.GetMessagesForUser(msgParams);
            var messages=_mapper.Map<IEnumerable<MessageToReturnDto>>(messageFromDb);
            Response.AddPagination(messageFromDb.CurrentPage,messageFromDb.PageSize,
                messageFromDb.TotalCount,messageFromDb.TotalPages);
            return Ok(messages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessagesThread(int userId,int recipientId){
             if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
               return Unauthorized();
            var messageFromDb=await _repo.GetMessageThred(userId,recipientId);
            var messageThread=_mapper.Map<IEnumerable<MessageToReturnDto>>(messageFromDb);
            return Ok(messageThread);
        }


        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId,MessageForCreationDto msgCreationDto){
            var sender=await _repo.GetUser(userId);
            if(sender.Id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
               return Unauthorized();
            msgCreationDto.SenderId=userId;
            var recipient=await _repo.GetUser(msgCreationDto.RecipientId);
            if(recipient==null)
                return BadRequest("User Not Found");
            var message=_mapper.Map<Message>(msgCreationDto);

            _repo.Add(message);

            if(await _repo.SaveAll())
            {
                var msgToReturn=_mapper.Map<MessageToReturnDto>(message);
                return CreatedAtRoute("GetMessage",new {id=message.Id},msgToReturn);
            }
            throw new Exception("Message Failed");
            
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int id,int userId){
            if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
               return Unauthorized();
            var messageFromDb=await _repo.GetMassage(id);
            if(messageFromDb.SenderId==userId)
                messageFromDb.SenderDeleted=true;
            if(messageFromDb.RecipientId==userId)
                messageFromDb.RecipientDeleted=true;
            if( messageFromDb.SenderDeleted && messageFromDb.RecipientDeleted)
                _repo.Delete(messageFromDb);
            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception("Error : Failed To Delete Message");
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId,int id){
            if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
               return Unauthorized();
            var messageFromDb=await _repo.GetMassage(id);
            if(messageFromDb.RecipientId!=userId)
               return Unauthorized();
            messageFromDb.IsRead=true;
            messageFromDb.DateRead=DateTime.Now;
            await _repo.SaveAll();
            return NoContent();
        }
        
    }
}