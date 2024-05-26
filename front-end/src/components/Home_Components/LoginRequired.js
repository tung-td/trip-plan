import React, { useEffect, useState } from "react";
import loginrequired from "../../assets/HomeImg/loginrequired.png";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

import { Link, NavLink } from "react-router-dom";

import { signInWithGoogle } from "../../firebase/firebaseconfig";
import firebase from "../../firebase/firebaseconfig";
import { auth } from "../../firebase/firebaseconfig";

const LoginRequired = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    return () => {
      // Unsubscribe when the component unmounts.
      unsubscribe();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 ">
      {/* Overlay */}
      <div class="absolute inset-0 bg-black opacity-40"></div>
      {/* Main contain */}
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-xl bg-white px-4 py-4">
          {/* Close button */}
          <div
            onClick={props.active}
            className="absolute right-4 top-4 cursor-pointer rounded-full p-2 hover:bg-slate-200"
          >
            <GrClose />
          </div>
          {/* Button */}
          <h1 className="mb-5 text-xl font-bold text-slate-900">
            <span className="text-2xl font-bold text-red-800">Oops!</span> You
            need login to use this feature!
          </h1>
          <div className="flex h-1/3 justify-around">
            <div className="h-1/3 w-1/3 overflow-hidden">
              <img
                src={loginrequired}
                className="h-full w-full object-cover"
                alt="loginrequired"
              />
            </div>
            <div className="flex w-1/3 flex-col">
              <div className="mb-5">
                <p className="text-base font-semibold text-slate-900">
                  Already have an account?
                </p>
                <NavLink to={"/login"}>
                  <button className="mt-2 w-full rounded-xl bg-indigo-500 px-8 py-2 text-base font-semibold text-white hover:bg-indigo-600">
                    Login
                  </button>
                </NavLink>
              </div>
              <div className="flex items-center justify-around">
                <span className=" h-px w-72 bg-slate-900"></span>{" "}
                <span className=" mx-2">or</span>{" "}
                <span className=" h-px w-72 bg-slate-900"></span>
              </div>
              <div className="mt-5">
                <button
                  onClick={signInWithGoogle}
                  className="relative w-full rounded-lg border border-slate-700 py-5 hover:border-slate-900 hover:bg-slate-100 focus:outline-none "
                >
                  <FcGoogle className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-3xl" />
                </button>
                <button className="relative mt-2 w-full rounded-lg border border-slate-700 py-5 hover:border-slate-900 hover:bg-slate-100 focus:outline-none ">
                  <BsFacebook className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-3xl" />
                </button>
              </div>
              <div>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  Dont have an account ?{" "}
                  <Link
                    to={"/signup"}
                    className="text-base text-indigo-500 underline"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequired;
