using Application.IServices.Files;
using Application.IServices.Files.Dtos;
using Data.EF_DbContext;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Files
{
    public class FileService : IFileService
    {
        private readonly DemoDbContext _context;
        public FileService(DemoDbContext context)
        {
            _context = context;
        }
        public async Task<FileView> CreateFile(FileView request)
        {
            var _file = new file();
            {
                _file.userId = request.userId;
                _file.fileName = request.fileName;
                _file.fileType = request.fileType;
                _file.data = request.data;
                _file.isUsed = request.isUsed;
            };
            await _context.Files.AddAsync(_file);
            await _context.SaveChangesAsync();
            request.id = _file.id;
            return request;
        }

        public async Task<List<FileView>> GetAllFile()
        {
            var _fileAll = await _context.Files.ToListAsync();
            List<FileView> result = new List<FileView>();
            foreach (var item in _fileAll)
            {
                var temp = new FileView();
                temp.id = item.id;
                temp.userId = item.userId;
                temp.fileName = item.fileName;
                temp.fileType = item.fileType;
                temp.data = item.data;
                temp.isUsed = item.isUsed;
                result.Add(temp);
            };
            return result;
        }

        public async Task<List<FileView>> GetFilesByUser(int request)
        {
            var _fileAll = await _context.Files.ToListAsync();
            var _fileUser = from _item in _fileAll
                            where _item.userId == request
                            select _item;
            List<FileView> result = new List<FileView>();
            foreach (var item in _fileUser)
            {
                var temp = new FileView();
                temp.id = item.id;
                temp.userId = item.userId;
                temp.fileName = item.fileName;
                temp.fileType = item.fileType;
                temp.data = item.data;
                temp.isUsed = item.isUsed;
                result.Add(temp);
            };
            return result;
        }
    }
}
