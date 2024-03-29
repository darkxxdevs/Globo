import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../store/store"

export default function AuthLayout({
  children,
  authentication = true,
}: {
  children: React.ReactNode
  authentication: boolean
}) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState<boolean>(true)

  const authStatus = useSelector((state: RootState) => state.auth.status)

  useEffect(() => {
    // TODO: refactor it

    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } else if (!authentication && authStatus !== authentication) {
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
