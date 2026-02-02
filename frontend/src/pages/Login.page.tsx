import React, { useState } from "react"
import Input from "../component/Reusable/Input"
import Button from "../component/Button/Button"

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState<string>("")

  
  // Functions
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const validate = () => {
    if (!inputs.email.includes("@")) setError("Invalid Email Address");
    if (inputs.password.length < 6) setError("Password must be at least 6 characters long");
    else setError("");
  }

  //   Onsubmit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate();
    if (error) return;
    console.log("Form submitted with data:", inputs);
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
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <Input
          Type="password"
          Name="password"
          Value={inputs.password}
          Placeholder="Enter your password"
          onChange={onInputChange}
        />

        <Button TypeBtn="submit"
          Text="Log_in"
        />

      </form>

    </>
  )
}

export default Login