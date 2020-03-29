using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CouponApi.Models;

namespace CouponApi.Controllers
{
    #region CouponController
    [Route("api/[controller]")]
    [ApiController]
    public class CouponItemsController : ControllerBase
    {
        private readonly CouponContext _context;

        public CouponItemsController(CouponContext context)
        {
            _context = context;
        }
        #endregion

        // GET: api/CouponItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CouponItem>>> GetCouponItems()
        {
            foreach (var item in _context.CouponItems)
            {
                if (item.Code.Length > 2)
                item.Code = item.Code.Remove(item.Code.Length - 2) + "xx";
            }

            return await _context.CouponItems.ToListAsync();
        }

        #region snippet_GetByID
        // GET: api/CouponItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CouponItem>> GetCouponItem(long id)
        {
            var CouponItem = await _context.CouponItems.FindAsync(id);

            if (CouponItem == null)
            {
                return NotFound();
            }

            return CouponItem;
        }
        #endregion

        #region snippet_Update
        // PUT: api/CouponItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCouponItem(long id, CouponItem CouponItem)
        {
            if (id != CouponItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(CouponItem).State = EntityState.Modified;

            try
            {
                SetWinningCoupon(CouponItem);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponItemExists(id))
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
        #endregion

        #region snippet_Create
        // POST: api/CouponItems
        [HttpPost]
        public async Task<ActionResult<CouponItem>> PostCouponItem(CouponItem CouponItem)
        {
            if (string.IsNullOrEmpty(CouponItem.Name) || string.IsNullOrEmpty(CouponItem.Code))
                return null;

            SetWinningCoupon(CouponItem);

            _context.CouponItems.Add(CouponItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCouponItem), new { id = CouponItem.Id }, CouponItem);
        }
        #endregion

        #region snippet_Delete
        // DELETE: api/CouponItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CouponItem>> DeleteCouponItem(long id)
        {
            var CouponItem = await _context.CouponItems.FindAsync(id);
            if (CouponItem == null)
            {
                return NotFound();
            }

            _context.CouponItems.Remove(CouponItem);
            await _context.SaveChangesAsync();

            return CouponItem;
        }
        #endregion

        private bool CouponItemExists(long id)
        {
            return _context.CouponItems.Any(e => e.Id == id);
        }

        private static void SetWinningCoupon(CouponItem CouponItem)
        {
            switch (CouponItem.Code)
            {
                case "1087":
                case "2007":
                case "3151":
                case "4847":
                case "7295":
                    CouponItem.Win = true;
                    break;
            }
        }
    }
}
