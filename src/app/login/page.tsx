"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import axios from 'axios'

export default function Page() {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
    const router = useRouter();


  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post("https://auth-amzt.onrender.com/api/sign-in", inputFields)
        .then((res) => {
          console.log(res.data);
          alert("Login was successful");
          document.cookie = `jwtToken=${res.data.accessToken}; SameSite=Strict; HttpOnly; Secure`
          router.push('/')
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleOnChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleOnChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
