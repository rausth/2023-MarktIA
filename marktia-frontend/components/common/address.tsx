type AddressProps = {
    /**
     * Por enquanto any
     */
    address: any;
}

export default function Address({ address }: AddressProps) {
    return (
        <div>
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
                <div><span>Complemento: {address.complement}</span></div>
            </div>
        </div>
    )
}