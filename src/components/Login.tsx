import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "."
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"

interface LoginProps {
  email: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { register, handleSubmit } = useForm<LoginProps>()
  const [error, setError] = useState<string>("")

  const login = async (data: LoginProps) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
          navigate("/")
        }
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg  bg-black-500 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account!
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account ?&nbsp;
          <Link
            to={"/signup"}
            className="font-medium text-white trasition-all duration-200 hover:underline"
          >
            Signup
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-8">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            <Input
              label="password"
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button type="submit" bgColor="black" textColor="white">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
