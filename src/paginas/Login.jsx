import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import { clienteAxios } from "../config/axios";
import useAuth from "../hooks/useAuth";
import { eliminarAlerta } from "../helpers/eliminarAlerta";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      eliminarAlerta(setAlerta);
      return;
    }
    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/admin");
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
          Inicia Sesión y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
        <div className="my-5 text-center flex flex-col justify-center items-center gap-y-4">
            <p
              htmlFor=""
              className="uppercase text-gray-600 block text-md font-bold"
            >
              Prueba el Proyecto con las siguientes credenciales:
            </p>
            <div className="mt-2 shadow-md px-2 py-2 rounded-lg bg-white w-1/2 ">
            <p
              htmlFor=""
              className="uppercase text-gray-600 block text-sm font-bold"
            >
             Correo: <span className="text-gray-500 font-normal text-md normal-case">test@test.com</span>
            </p>
            <p
              htmlFor=""
              className="uppercase text-gray-600 block text-sm font-bold"
            >
             Contraseña: <span className="text-gray-500 font-normal text-md normal-case">testing</span>
            </p>
            </div>
          </div>
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
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="md:flex md:justify-center">
            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            />
          </div>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};
