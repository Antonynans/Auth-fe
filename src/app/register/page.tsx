"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import axios from "axios";

export default function Page() {
  const [inputFields, setInputFields] = useState({
    name: "",
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
        .post("https://auth-amzt.onrender.com/api/sign-up", inputFields)
        .then((res) => {
          console.log(res.data);
          alert("Login was successful");
          router.push("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-16 gap-8">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={handleOnChange}
        />
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
        <button>Sign Up</button>
      </form>
    </div>
  );
}
