import { authService } from "../../authService";

const TOKEN = "tcp_ae_session_token";
const EXPIRATION = "tcp_ae_session_token_expires";

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("crea una sesión con credenciales válidas", () => {
    expect(authService.iniciarSesion("admin_test", "clave_test")).toBe(true);
    expect(localStorage.getItem(TOKEN)).toBeTruthy();
    expect(Number(localStorage.getItem(EXPIRATION))).toBeGreaterThan(Date.now());
    expect(authService.verificarSesionActiva()).toBe(true);
  });

  test("rechaza credenciales incorrectas y no crea sesión", () => {
    expect(authService.iniciarSesion("admin_test", "incorrecta")).toBe(false);
    expect(localStorage.getItem(TOKEN)).toBeNull();
    expect(localStorage.getItem(EXPIRATION)).toBeNull();
  });

  test("borra una sesión expirada", () => {
    const ahora = Date.now();
    jest.spyOn(Date, "now").mockReturnValue(ahora);
    localStorage.setItem(TOKEN, btoa("admin_test_TCP_jos_BOL_clave_test"));
    localStorage.setItem(EXPIRATION, String(ahora - 1));

    expect(authService.verificarSesionActiva()).toBe(false);
    expect(localStorage.getItem(TOKEN)).toBeNull();
    expect(localStorage.getItem(EXPIRATION)).toBeNull();
    jest.restoreAllMocks();
  });

  test("el cierre elimina las claves de sesión", () => {
    localStorage.setItem(TOKEN, "token");
    localStorage.setItem(EXPIRATION, "123");

    authService.cerrarSesion();

    expect(localStorage.getItem(TOKEN)).toBeNull();
    expect(localStorage.getItem(EXPIRATION)).toBeNull();
  });
});
