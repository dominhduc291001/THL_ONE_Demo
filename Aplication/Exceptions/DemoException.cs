using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Application.Exceptions
{
    public class DemoException : Exception
    {
        public DemoException()
        {
        }

        public DemoException(string message) : base(message)
        {
        }

        public DemoException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected DemoException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
