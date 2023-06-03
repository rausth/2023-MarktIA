import Modal from "@/components/common/modal";

type SchedulingReviewModalProps = {
    onSubmission: () => void;
    close: () => void;
}

export default function SchedulingReviewModal({ onSubmission, close }: SchedulingReviewModalProps) {
    return (
        <Modal title="Avaliação do Agendamento" close={close}>

        </Modal>
    )
}