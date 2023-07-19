"use client";

import Button from "@/components/common/button";
import TextField from "@/components/common/forms/text_field";
import TextArea from "@/components/common/forms/textarea";
import Modal from "@/components/common/modal";
import { EvaluationRequestDTO } from '@/dtos/requests/evaluations/evaluationRequestDTO';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { SiPicpay } from "react-icons/si";
import { z } from "zod";

type SchedulingReviewModalProps = {
    schedulingId: string;
    picpayUser: string;
    onSubmission: (evaluation: EvaluationRequestDTO) => void;
    close: () => void;
}

const newEvaluationFormSchema = z.object({
    rating: z.number({
        invalid_type_error: "A nota não pode ser vazia."
    }),
    assessment: z.string()
        .nonempty({
            message: "O comentário não pode ser vazio."
        })
});
type NewEvaluationFormData = z.infer<typeof newEvaluationFormSchema>;

export default function SchedulingReviewModal({ schedulingId, picpayUser, onSubmission, close }: SchedulingReviewModalProps) {
    const newEvaluationForm = useForm<NewEvaluationFormData>({
        resolver: zodResolver(newEvaluationFormSchema),
        defaultValues: {
            rating: undefined,
            assessment: ""
        }
    });
    const { handleSubmit, formState: { errors }, reset } = newEvaluationForm;

    return (
        <Modal title="Finalização do Agendamento" close={close}>
            <div className="flex justify-center">
                <Button color="green">
                    <Link href={"https://picpay.me/" + picpayUser}>
                        <div className="flex items-center">
                            <span className="mr-2">Pagar com o PicPay</span>
                            <SiPicpay />
                        </div>
                    </Link>
                </Button>
            </div>
            <FormProvider {...newEvaluationForm}>
                <form onSubmit={handleSubmit((newEvaluationFormData: NewEvaluationFormData) => {
                    onSubmission({
                        schedulingId: schedulingId,
                        rating: newEvaluationFormData.rating,
                        assessment: newEvaluationFormData.assessment
                    });
                })}>
                    <div className="p-1">
                        <TextField
                            type="number"
                            label="Nota (0 a 5)"
                            name="rating"
                            range={true}
                        />
                        {errors.rating && <span className="text-xs text-red mt-1">{errors.rating.message}</span>}
                    </div>
                    <div className="p-1">
                        <TextArea
                            label="Comentário"
                            name="assessment"
                        />
                        {errors.assessment && <span className="text-xs text-red mt-1">{errors.assessment.message}</span>}
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <Button color="gray" onClick={() => reset()} className="mr-2">Cancelar</Button>
                        <Button type="submit" color="green">Salvar</Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}