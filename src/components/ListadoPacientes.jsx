import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length > 0 ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{""}
            <span className="text-indigo-600 font-bold ">
              Pacientes y citas
            </span>
          </p>
          <div className="overflow-y-scroll h-2/5">
            {pacientes.map((paciente) => (
              <Paciente key={paciente._id} paciente={paciente} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando Pacientes {""}
            <span className="text-indigo-600 font-bold ">
              {" "}
              y apareceran en esta lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};
export default ListadoPacientes;
