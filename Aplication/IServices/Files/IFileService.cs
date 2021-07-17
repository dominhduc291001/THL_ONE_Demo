using Application.IServices.Files.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices.Files
{
    public interface IFileService
    {
        Task<FileView> CreateFile(FileView request);
        Task<List<FileView>> GetFilesByUser(int request);
        Task<List<FileView>> GetAllFile();
    }
}
