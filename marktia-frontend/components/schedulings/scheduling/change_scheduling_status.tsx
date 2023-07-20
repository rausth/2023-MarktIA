"use client";

import Button from "@/components/common/button";
import { SchedulingsController } from "@/controllers/schedulings";
import { SchedulingResponseDTO } from "@/dtos/responses/schedulings/schedulingResponseDTO";
import { SchedulingStatus, SchedulingStatusUtils } from "@/enums/schedulingStatus";
import { UserRoleUtils } from "@/enums/userRole";
import { Scheduling } from "@/models/scheduling";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import SchedulingReviewModal from "./modals/scheduling_review_modal";
import { EvaluationRequestDTO } from "@/dtos/requests/evaluations/evaluationRequestDTO";
import { SchedulingStatusUpdateRequestDTO } from '@/dtos/requests/schedulings/schedulingStatusUpdateRequestDTO';
import { handleError } from "@/utils/errorHandler";
import { AuthContext } from "@/contexts/AuthContext";

type ChangeSchedulingStatusProps = {
    scheduling: Scheduling;
    providerId: string;
    picpayUser: string;
}

export default function ChangeSchedulingStatus(changeSchedulingStatusProps: ChangeSchedulingStatusProps) {
    const [scheduling, setScheduling] = useState(changeSchedulingStatusProps.scheduling);

    const [isSchedulingReviewModalVisible, setIsSchedulingReviewModalVisible] = useState(false);

    const { token, user } = useContext(AuthContext);
    const router = useRouter();

    const updateStatus = (evaluation?: EvaluationRequestDTO) => {
        if (token && user) {
            const schedulingStatusUpdateRequestDTO: SchedulingStatusUpdateRequestDTO = {
                userId: user.id,
                evaluation: evaluation
            };

            SchedulingsController.updateStatus(scheduling.id, schedulingStatusUpdateRequestDTO, token)
                .then((response: AxiosResponse<SchedulingResponseDTO>) => {
                    setScheduling({
                        ...response.data,
                        consumer: {
                            ...response.data.consumer,
                            userRole: UserRoleUtils.fromNumber(response.data.consumer.userRole)
                        },
                        status: SchedulingStatusUtils.fromNumber(response.data.status)
                    });

                    enqueueSnackbar("Status do agendamento atualizado com sucesso!", {
                        variant: "success"
                    });

                    setIsSchedulingReviewModalVisible(false);
                })
                .catch((error: AxiosError) => handleError("Houve um erro ao atualizar o status do agendamento.", {
                    errors: error.response?.data as any
                }));
        }
    }

    return (
        <SnackbarProvider>
            {isSchedulingReviewModalVisible && (<SchedulingReviewModal
                schedulingId={scheduling.id}
                picpayUser={changeSchedulingStatusProps.picpayUser}
                onSubmission={(evaluation: EvaluationRequestDTO) => updateStatus(evaluation)}
                close={() => setIsSchedulingReviewModalVisible(false)}
            />)}

            <div className="flex justify-center">
                {scheduling.status === SchedulingStatus.OPENED && (
                    <div>
                        {user?.id === changeSchedulingStatusProps.providerId ? (
                            <div className="flex items-center">
                                <div className="py-2 mr-2"><span>Você é o provedor desse agendamento</span></div>
                                <div><Button color="blue" onClick={() => updateStatus()}>Marcar como entregue</Button></div>
                            </div>
                        ) : (
                            <div className="py-2"><span>Aguardando até que o provedor marque o agendamento como entregue</span></div>
                        )}
                    </div>
                )}

                {scheduling.status === SchedulingStatus.DELIVERED && (
                    <div>
                        {user?.id === scheduling.consumer.id ? (
                            <div className="flex items-center">
                                <div className="py-2 mr-2"><span>Você é o cliente desse agendamento</span></div>
                                <div><Button color="blue" onClick={() => setIsSchedulingReviewModalVisible(true)}>Marcar como finalizado</Button></div>
                            </div>
                        ) : (
                            <div className="py-2"><span>Aguardando até que o cliente marque o agendamento como finalizado</span></div>
                        )}
                    </div>
                )}

                {scheduling.status === SchedulingStatus.FINISHED && (
                    <div className="py-2"><span>Agendamento finalizado!</span></div>
                )}
            </div>
        </SnackbarProvider>
    )
}