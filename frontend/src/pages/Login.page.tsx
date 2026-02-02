import React, { useState } from "react"
import Input from "../component/Reusable/Input"
import Button from "../component/Button/Button"
import api from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState<{ [key: string]: string }>({})


  // Functions
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!inputs.email.includes("@")) newErrors.email = "Invalid Email Address";
    if (inputs.password.length < 6) newErrors.password = "Password must be at least 6 characters long";
    return newErrors;
  }

  //   Onsubmit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateError = validate();
    if (Object.keys(validateError).length > 0) {
      setError(validateError)
    }
    setError({})

    try {
      const response = await api.post(API_PATHS.AUTH.LOGIN, {
        email: inputs.email,
        password: inputs.password

      })
      console.log(response)
      if (response.status === 200) {
        const token = response.data.token; // Adjust if your backend uses a different key
        localStorage.setItem('token', token);
      }
    } catch (error: any) {
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR DATA:", error.response?.data);
      if (error.response) {
        setError({ general: error.response.data.message || "Login failed" });
      }
    }
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          Type="email"
          Name="email"
          Value={inputs.email}
          Placeholder="Enter your email"
          onChange={onInputChange}
        />
        {error && <div style={{ color: 'red' }}>{error.email}</div>}

        <Input
          Type="password"
          Name="password"
          Value={inputs.password}
          Placeholder="Enter your password"
          onChange={onInputChange}
        />
        {error && <div style={{ color: 'red' }}>{error.password}</div>}


        <Button TypeBtn="submit"
          Text="Log_in"
        />

      </form>

    </>
  )
}

export default Login