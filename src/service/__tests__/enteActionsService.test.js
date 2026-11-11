import { enteActionsService } from "../enteActionsService";

describe("enteActionsService", () => {
  let guardar;

  beforeEach(() => {
    guardar = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("crea un ente normalizando el nombre y agregando un registro ancla", () => {
    const resultado = enteActionsService.crearEnte("  nuevo ente ", "icono", [], guardar);

    expect(resultado).toBe(true);
    expect(guardar).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ ente: "NUEVO ENTE", icono: "icono", estado: "Inactivo" }),
      ]),
    );
  });

  test("rechaza un ente duplicado sin guardar", () => {
    const resultado = enteActionsService.crearEnte(" fiscalía ", "icono", [{ ente: "FISCALÍA" }], guardar);

    expect(resultado).toBe(false);
    expect(guardar).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  test("edita el nombre y el icono en todos los registros del ente", () => {
    const actuales = [
      { ente: "ENTE A", nombre_completo: "Uno" },
      { ente: "ENTE A", nombre_completo: "Dos" },
      { ente: "ENTE B", nombre_completo: "Otro" },
    ];

    expect(enteActionsService.editarEnte("ENTE A", "ente nuevo", "estrella", actuales, guardar)).toBe(true);
    const guardados = guardar.mock.calls[0][0];
    expect(guardados.slice(0, 2)).toEqual([
      expect.objectContaining({ ente: "ENTE NUEVO", icono: "estrella" }),
      expect.objectContaining({ ente: "ENTE NUEVO", icono: "estrella" }),
    ]);
    expect(guardados[2].ente).toBe("ENTE B");
    expect(actuales[0].ente).toBe("ENTE A");
  });

  test("elimina todos los registros asociados al ente solicitado", () => {
    const actuales = [
      { ente: "ENTE A", nombre_completo: "Uno" },
      { ente: "ENTE B", nombre_completo: "Otro" },
      { ente: "ENTE A", nombre_completo: "Dos" },
    ];

    expect(enteActionsService.eliminarEnte("ENTE A", actuales, guardar)).toBe(true);
    expect(guardar).toHaveBeenCalledWith([{ ente: "ENTE B", nombre_completo: "Otro" }]);
  });
});
