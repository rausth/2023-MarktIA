import { Address } from "@/models/address";
import { FaPencilAlt } from "react-icons/fa";

type AddressProps = {
    address: Address;
    actionOnEditButton?: () => void;
}

export default function AddressInfo({ address, actionOnEditButton }: AddressProps) {
    return (
        <div>
            <div className="grid grid-cols-3 py-2">
                <div><span>Estado: {address.state}</span></div>
                <div><span>Cidade: {address.city}</span></div>
            </div>
            <div className="grid grid-cols-3 py-2">
                <div><span>Bairro: {address.district}</span></div>
                <div><span>Rua: {address.publicPlace}</span></div>
                <div><span>Número: {address.number}</span></div>
            </div>
            <div className="py-2">
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