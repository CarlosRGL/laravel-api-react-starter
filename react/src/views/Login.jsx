import React, { useRef } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import SignupErrors from "../components/SignupErrors";
import axiosClient from "../api/axios-client";
import { useStateContext } from "../context/ContextProvider";

function Login() {
  const passwordRef = useRef();
  const emailRef = useRef();

  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = React.useState({});

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
            return;
          } else {
            setErrors({ email: [response.data.message] });
            return;
          }
        }
      });
  };
  return (
    <>
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Se connecter
        </h2>
        {Object.keys(errors).length > 0 && <SignupErrors errors={errors} />}
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              ref={emailRef}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Mot de passe"
              ref={passwordRef}
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Creer une compte
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
