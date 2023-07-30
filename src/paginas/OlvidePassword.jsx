import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { clienteAxios } from "../config/axios";
import { eliminarAlerta } from "../helpers/eliminarAlerta";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El email es obligatorio", error: true });
      eliminarAlerta(setAlerta);
      return;
    }

    // paso la validacion de los campos procederemos a enviar el emaiñ
    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email }
      );
      setAlerta({
        msg: data.msg,
      });
      eliminarAlerta(setAlerta);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      eliminarAlerta(setAlerta);
    }
  };
  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu acceso y no Pierdas{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="md:flex md:justify-center">
            <input
              type="submit"
              value="Enviar Instrucciones"
              className="bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </div>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesion
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
