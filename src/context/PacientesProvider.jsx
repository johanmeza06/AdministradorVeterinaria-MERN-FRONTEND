import { createContext, useState, useEffect } from "react";
import { clienteAxios } from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({}); //Usado para editar al paciente
  const { auth } = useAuth();

  // cuadno cargue el componente hay que llamar la API
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/pacientes", config);
        // oredenar pacientes por el mas nuevo a traves dle createdAt que viene de la base de datos
        data.sort((pacienteA, pacienteB) => {
          return new Date(pacienteB.createdAt) - new Date(pacienteA.createdAt);
        });
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, [pacientes,auth]);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      //editando el registro
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );
        const pacientesActualizados = pacientes.map((pacienteState) =>
          pacienteState.id == data._id ? data : pacienteState
        );
        setPacientes(pacientesActualizados);
      } catch (error) {
        console.log(error);
      }
    } else {
      // agregar Nuevo paciente
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  // eliminar un paciente
  const eliminarPaciente = async (id) => {
    const confirmar = confirm("¿Estas seguro de eliminar este paciente?");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
        console.log(data);

        const pacientesActualizados = pacientes.filter(
          (pacientesState) => pacientesState._id !== id
        );

        setPacientes(pacientesActualizados);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
