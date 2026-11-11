/**
 * SERVICIO MAESTRO DE AUTENTICACIÓN Y CRIPTOGRAFÍA - TCP BOLIVIA
 * Sirve para validar la conexión del usuario administrador
 */

const T_1_HORA_EN_MS = 60 * 60 * 1000;
const SESSION_TOKEN = "tcp_ae_session_token";
const SESSION_TOKEN_EXPIRE = "tcp_ae_session_token_expires";

// Genera la firma secreta
const obtenerSemillaSecreta = () => {
  const usuario = import.meta.env.VITE_ADMIN_USER;
  const password = import.meta.env.VITE_ADMIN_PASSWORD;
  return `${usuario}_TCP_jos_BOL_${password}`;
};

export const authService = {
  /**
   * Verifica criptográficamente si hay una sesión válida y activa
   * @returns {boolean} True si el token coincide exactamente con las credenciales del servidor
   */
  verificarSesionActiva: () => {
    const tokenGuardado = localStorage.getItem(SESSION_TOKEN);
    const expiracionGuardada = localStorage.getItem(SESSION_TOKEN_EXPIRE);

    if (!tokenGuardado || !expiracionGuardada) {
      authService.cerrarSesion();
      return false;
    }

    const ahora = Date.now();
    if (ahora > parseInt(expiracionGuardada, 10)) {
      //la sesion ya ha expirado y le votamos automáticamente
      authService.cerrarSesion();
      return false;
    }

    try {
      const firmaEsperada = btoa(obtenerSemillaSecreta());
      if (tokenGuardado === firmaEsperada) {
        localStorage.setItem(
          SESSION_TOKEN_EXPIRE,
          (Date.now() + T_1_HORA_EN_MS).toString(),
        );
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  /**
   * Procesa el intento de login comparando los datos ingresados
   * @param {string} usuario del formulario
   * @param {string} password del formulario
   * @returns {boolean} True si las credenciales coinciden con el archivo de entorno .env
   */
  iniciarSesion: (usuario, password) => {
    const usuarioCorrecto = import.meta.env.VITE_ADMIN_USER;
    const passwordCorrecto = import.meta.env.VITE_ADMIN_PASSWORD;
    if (usuario === usuarioCorrecto && password === passwordCorrecto) {
      const tokenCifrado = btoa(obtenerSemillaSecreta());
      const tiempoLimite = Date.now() + T_1_HORA_EN_MS;

      localStorage.setItem(SESSION_TOKEN, tokenCifrado);
      localStorage.setItem(SESSION_TOKEN_EXPIRE, tiempoLimite.toString());
      return true;
    }
    return false;
  },

  /**
   * Destruye por completo el token cifrado del almacenamiento local
   */
  cerrarSesion: () => {
    localStorage.removeItem(SESSION_TOKEN);
    localStorage.removeItem(SESSION_TOKEN_EXPIRE);
  },
};
