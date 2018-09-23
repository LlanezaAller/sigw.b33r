using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using Newtonsoft.Json;

namespace B33rService.App_Start.Helper
{
    public static class HttpClientHelper
    {
        public static TResponse Get<TResponse>(string uri)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                string res = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<TResponse>(res);
                //return reader.ReadToEnd();
            }
        }
    }
}