"use client";

type ButtonProps = {
    color?: "green" | "outlined-grey" | "red";
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({ color, onClick, children, className, type }: ButtonProps) {
    return (
        <button
            className={`flex gap-1 rounded-lg text-red-400 py-2 px-4 ${color ? `bg-${color}-500 hover:bg-${color}-700` : ""}`}
            onClick={() => {
                if (onClick) onClick();
            }}
            type={type}
        >
            {children}
        </button>
    )
}