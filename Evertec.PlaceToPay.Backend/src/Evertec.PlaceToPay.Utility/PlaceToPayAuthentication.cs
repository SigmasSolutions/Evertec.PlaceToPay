using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Evertec.PlaceToPay.Utility
{
    public class PlaceToPayAuthentication
    {
        String login;
        String tranKey;
        String seed;
        String nonce;
        private readonly IConfiguration _configuration;

        public PlaceToPayAuthentication(IConfiguration _configuration)
        {
            this.login = _configuration["LoginPlaceToPay"];
            this.tranKey = _configuration["TranKeyPlaceToPay"];
            Generate();
        }
        
        /**
         * Invoque this function each time that you use this class to generate a WS call
         * this will save the need to construct a new class every time
         */
        public PlaceToPayAuthentication Generate()
        {
            nonce = (new Random()).GetHashCode().ToString();
            seed = (DateTime.Now).ToString("yyyy-MM-ddTHH:mm:sszzz");
            return this;
        }

        public String getLogin()
        {
            return this.login;
        }

        public String getTranKey()
        {
            return Base64(ToSha1(nonce + seed + tranKey));
        }

        public String getSeed()
        {
            return this.seed;
        }

        public String getNonce()
        {
            return Base64(nonce);
        }

        public PlaceToPayAuthentication setNonce(String nonce)
        {
            this.nonce = nonce;
            return this;
        }

        public PlaceToPayAuthentication setSeed(String seed)
        {
            this.seed = seed;
            return this;
        }

        static public String Base64(byte[] input)
        {
            return System.Convert.ToBase64String(input);
        }

        static public String Base64(String input)
        {
            if (input != null)
            {
                return System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(input));
            }
            return "";
        }

        static public byte[] ToSha1(String text)
        {
            System.Security.Cryptography.SHA1 hashString = new System.Security.Cryptography.SHA1CryptoServiceProvider();
            return hashString.ComputeHash(ToStream(text));
        }

        static public Stream ToStream(String text)
        {
            MemoryStream stream = new MemoryStream();
            StreamWriter sw = new StreamWriter(stream);
            sw.Write(text);
            sw.Flush();
            stream.Position = 0;
            return stream;
        }

    }
}