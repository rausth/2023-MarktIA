"use client";

import { useEffect, useRef } from "react";
import Button from "./button";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
    title?: string;
    children: React.ReactNode;
    close: () => void;
}

const useOutsideDetect = (ref: any, close: () => void) => {
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                close();
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [ref, close]);
}

export default function Modal({ title, children, close }: ModalProps) {
    const wrapperRef = useRef(null);
    useOutsideDetect(wrapperRef, close);

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center opacity-1">
            <div ref={wrapperRef} className="absolute min-w-[50vw] rounded-[20px] mt-[50vh] -translate-y-1/2 bg-white-dark border-2 border-black">
                <header className="flex justify-between py-4 px-8 border-b">
                    <div className="flex items-end">
                        <h1 className="text-2xl">{title}</h1>
                    </div>

                    <div className="flex justify-end">
                        <Button color="blue" onClick={close}><AiOutlineClose /></Button>
                    </div>
                </header>

                <section className="p-8">{children}</section>
            </div>
        </div>
    )
}