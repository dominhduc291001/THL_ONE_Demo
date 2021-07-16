using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class file
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string fileName { get; set; }
        public string fileType { get; set; }
        public Byte[] data { get; set; }

        /// <summary>
        /// Có được sử dụng ?
        /// </summary>
        public bool isUsed { get; set; }
        public virtual user Users { get; set; }
    }
}
