import { fireEvent, render, screen } from "@testing-library/react";
import FormularioModal from "../FormularioModal";

const datos = {
  nombre_completo: "",
  ente: "ENTE DE PRUEBA",
  departamento: "NACIONAL",
  estado: "Activo",
};

describe("FormularioModal", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("no confirma el alta cuando el nombre está vacío", () => {
    const confirmar = jest.fn();
    render(
      <FormularioModal
        formulario={datos}
        esNuevo
        setFormulario={jest.fn()}
        onCancelar={jest.fn()}
        onConfirmar={confirmar}
      />,
    );

    fireEvent.submit(screen.getByRole("button", { name: /Guardar Cambios/i }).closest("form"));

    expect(confirmar).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("Nombre Completo"));
  });

  test("confirma el formulario cuando el nombre tiene contenido", () => {
    const confirmar = jest.fn();
    render(
      <FormularioModal
        formulario={{ ...datos, nombre_completo: "Ada Prueba" }}
        esNuevo
        setFormulario={jest.fn()}
        onCancelar={jest.fn()}
        onConfirmar={confirmar}
      />,
    );

    fireEvent.submit(screen.getByRole("button", { name: /Guardar Cambios/i }).closest("form"));

    expect(confirmar).toHaveBeenCalledTimes(1);
  });
});
