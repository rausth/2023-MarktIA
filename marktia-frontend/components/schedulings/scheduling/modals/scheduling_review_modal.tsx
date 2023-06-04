"use client";

import Button from "@/components/common/button";
import TextField from "@/components/common/forms/text_field";
import TextArea from "@/components/common/forms/textarea";
import Modal from "@/components/common/modal";
import { EvaluationsController } from "@/controllers/evaluations";
import { EvaluationRequestDTO } from '@/dtos/requests/evaluations/evaluationRequestDTO';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type SchedulingReviewModalProps = {
    schedulingId: string;
    onSubmission: () => void;
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

export default function SchedulingReviewModal({ schedulingId, onSubmission, close }: SchedulingReviewModalProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const newEvaluationForm = useForm<NewEvaluationFormData>({
        resolver: zodResolver(newEvaluationFormSchema),
        defaultValues: {
            rating: undefined,
            assessment: ""
        }
    });
    const { handleSubmit, formState: { errors }, reset } = newEvaluationForm;

    const handleNewEvaluationFormSubmission = (newEvaluationFormData: NewEvaluationFormData) => {
        if (session) {
            const evaluationRequestDTO: EvaluationRequestDTO = {
                schedulingId: schedulingId,
                rating: newEvaluationFormData.rating,
                assessment: newEvaluationFormData.assessment
            }

            EvaluationsController.create(evaluationRequestDTO, session.user.token)
                .then(() => {
                    onSubmission();

                    close();
                })
                .catch(() => enqueueSnackbar("Houve um erro ao criar a avaliação!", {
                    variant: "error"
                }))
        } else {
            router.push("/auth/login");
        }
    }

    return (
        <Modal title="Avaliação do Agendamento" close={close}>
            <FormProvider {...newEvaluationForm}>
                <form onSubmit={handleSubmit((newEvaluationFormData: NewEvaluationFormData) => handleNewEvaluationFormSubmission(newEvaluationFormData))}>
                    <div className="p-1">
                        <TextField
                            type="number"
                            label="Nota (0 a 5)"
                            name="rating"
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
                        <Button color="gray" onClick={() => reset()}>Cancelar</Button>
                        <Button type="submit" color="green">Salvar</Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}