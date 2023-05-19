import Modal from "@/components/common/modal"

type ServicesFilterModalProps = {
    close: () => void;
}

export default function ServicesFilterModal({ close }: ServicesFilterModalProps) {
    return (
        <Modal title="Filtrar Serviços" close={close}>
            
        </Modal>
    )
}