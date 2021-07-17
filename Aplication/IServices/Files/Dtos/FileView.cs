using System;
using System.Collections.Generic;
using System.Text;

namespace Application.IServices.Files.Dtos
{
    public class FileView
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string fileName { get; set; }
        public string fileType { get; set; }
        public Byte[] data { get; set; }
        public bool? isUsed { get; set; }
    }
}
