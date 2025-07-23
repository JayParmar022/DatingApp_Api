using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DatingApp_Api.Data;
using DatingApp_Api.Entities;
using Microsoft.AspNetCore.Authorization;
using DatingApp_Api.Interfaces;
using Microsoft.VisualBasic;
using System.Security.Claims;
using DatingApp_Api.Dtos;
using DatingApp_Api.Extensions;

namespace DatingApp_Api.Controllers
{
    [Authorize]
    public class MembersController : BaseApiController
    {
        private readonly AppDbContext _context;
        private readonly IMemberRepository _memberRepository;

        public MembersController(AppDbContext context,IMemberRepository memberRepository )
        {
            _context = context;
            _memberRepository = memberRepository;
        }

        
        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            return Ok(await _memberRepository.GetMembersAsync());
        }

       
        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await _memberRepository.GetMemberByIdAsync(id);

            if (member == null)
            {
                return NotFound();
            }
            return member;
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            return Ok(await _memberRepository.GetPhotosForMemberAsync(id));
        }


        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDto memberUpdateDto)
        {
            var memberId = User.GetMemberId();

            if (memberId == null) return BadRequest("Oops - no id found  in token");

            var member = await _memberRepository.GetMemberForUpdate (memberId);
            
            if (member == null) return BadRequest("Cloude not get member");

            member.DisplayName = memberUpdateDto.DisplayName ?? member.DisplayName;
            member.Description = memberUpdateDto.Description ?? member.Description;
            member.City = memberUpdateDto.City ?? member.City;
            member.Country = memberUpdateDto.Country ?? member.Country;

            member.User.DisplayName = memberUpdateDto.DisplayName ?? member.DisplayName;

            _memberRepository.Update(member);

            if(await _memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to Update Member");
                    
        }

        // PUT: api/Members/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppUser(string id, AppUser appUser)
        {
            if (id != appUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(appUser).State = EntityState.Modified;

            try
            {   
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Members
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AppUser>> PostAppUser(AppUser appUser)
        {
            _context.Users.Add(appUser);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AppUserExists(appUser.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAppUser", new { id = appUser.Id }, appUser);
        }

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUser(string id)
        {
            var appUser = await _context.Users.FindAsync(id);
            if (appUser == null)
            {
                return NotFound();
            }

            _context.Users.Remove(appUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool AppUserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
