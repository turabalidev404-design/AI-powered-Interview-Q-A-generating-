import React, { useState } from "react"
import Input from "../component/Reusable/Input"
import Button from "../component/Button/Button"
import { API_PATHS } from "../utils/apiPaths"
import api from "../utils/axiosInstance"
import { useNavigate } from "react-router-dom"


const SignUp = () => {
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
        password: ""
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const navigate = useNavigate();



    // Functionality

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!inputs.email.includes("@")) newErrors.email = "Invalid Email Address";

        if (inputs.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters long";

        if (inputs.password.length < 6) newErrors.password = "Password must be at least 6 characters long";
        return newErrors;
    }


    //   Onchange function
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    //   Onsubmit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationError = validate();
        if (Object.keys(validationError).length > 0) {
            setErrors(validationError);
            return;
        }
        setErrors({})

        try {
            const response = await api.post(API_PATHS.AUTH.REGISTER, {
                email: inputs.email,
                name: inputs.name,
                password: inputs.password

            })
            console.log(response)
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error: any) {
            console.log("ERROR STATUS:", error.response?.status);
            console.log("ERROR DATA:", error.response?.data);
            if (error.response) {
                setErrors({ general: error.response.data.message || "Registration failed" });
            }
        }

    }



    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <Input
                    Type="email"
                    Name="email"
                    Value={inputs.email}
                    Placeholder="Enter your email"
                    onChange={onInputChange}
                />
                {errors.email}
                <Input
                    Type="text"
                    Name="name"
                    Value={inputs.name}
                    Placeholder="Enter your name"
                    onChange={onInputChange}
                />
                {errors.name}
                <Input
                    Type="password"
                    Name="password"
                    Value={inputs.password}
                    Placeholder="Enter your password"
                    onChange={onInputChange}
                />
                {errors.password}
                <Button TypeBtn="submit"
                    Text="Sign_Up"
                />
                {errors.general}
            </form>

        </>
    )
}

export default SignUp