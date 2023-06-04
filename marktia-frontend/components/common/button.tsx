"use client";

type ButtonProps = {
    color: "blue" | "green" | "gray";
    onClick?: () => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export default function Button({ color, onClick, children, type, className }: ButtonProps) {
    const getClassName = (color: string) => {
        let className = "flex gap-1 rounded-lg py-2 px-4 ";

        if (color === "blue") {
            className += "text-white bg-blue-dark hover:bg-blue-dark-hover";
        } else if (color === "green") {
            className += "text-white bg-green-500 hover:bg-green-600";
        } else {
            className += "text-gray bg-white border border-gray-200 hover:text-white hover:bg-gray";
        }

        return className;
    }

    return (
        <button
            className={`${getClassName(color)} ${className}`}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();

                    onClick();
                }
            }}
            type={type}
        >
            {children}
        </button>
    )
}