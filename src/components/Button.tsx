import React from "react"

interface ButtonProps {
  children: React.ReactNode
  type?: "submit" | "button" | "reset"
  textColor?: string
  bgColor?: string
  className?: string
  onClick?: () => void
}

const Button = ({
  children,
  type = "button",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      className={`px-4 py-2 w-full font-bold bg-black rounded-lg bg-${bgColor} text-${textColor} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
