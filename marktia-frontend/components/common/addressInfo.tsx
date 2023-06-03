import { Address } from "@/models/address";
import { FaPencilAlt } from "react-icons/fa";

type AddressProps = {
    address: Address;
    actionOnEditButton?: () => void;
}

export default function AddressInfo({ address, actionOnEditButton }: AddressProps) {
    return (
        <div className="p-5">
            <div className="grid grid-cols-2 py-2">
                <div><span>Estado: {address.state}</span></div>
                <div><span>Município: {address.county}</span></div>
            </div>
            <div className="grid grid-cols-2 py-2">
                <div><span>Bairro: {address.district}</span></div>
                <div><span>Rua: {address.publicPlace}</span></div>
            </div>
            <div className="grid grid-cols-2 py-2">
                <div><span>Número: {address.number}</span></div>
                {!actionOnEditButton ? (
                    <div><span>Complemento: {address.complement}</span></div>
                ) : (
                    <div className="flex justify-between items-center">
                        <div><span>Complemento: {address.complement}</span></div>
                        <div><FaPencilAlt className="cursor-pointer" onClick={() => actionOnEditButton()} /></div>
                    </div>
                )}
            </div>
        </div>
    )
}