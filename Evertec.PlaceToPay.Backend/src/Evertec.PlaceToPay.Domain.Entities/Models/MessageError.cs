using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Models
{
    public class MessageError
    {
        public static string UserInsert = "Error al guardar el usuario";
        public static string UserUpdate = "Error al guardar el usuario";
        public static string EmailExists = "El correo electrónico ya existe";
        public static string InvalidCredentials = "La credenciales son inválidas";
        public static string UserNotExist = "El usuario no existe o no está activo";
        public static string UserOrPasswordIncorrect = "El usuario y/o la contraseña incorrectos";
        public static string UserNotSaved = "Usuario no creado";
        public static string PaymentError = "Ocurrió un error en el proceso de pago.";
        public static string PaymentDone = "La orden ya fue pagada exitosamente.";
    }
}
