/* eslint-disable @typescript-eslint/no-explicit-any */
import {Workflow} from "@/lib/generated/prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CreateWorkflowPayload = {
    name: string;
    description?: string;
};

type WorkflowType = {
    id: string;
    name: string;
    flowObject: any;
}

type ApiResponse<T> = {
    success: boolean;
    data: T;
};

export const useWorkflows = () => {
    return useQuery({
        queryKey: ["workflows"],
        queryFn: () =>
            axios
                .get<ApiResponse<Workflow[]>>("/api/workflow")
                .then((res) => res.data.data),
    });
};

export const useCreateWorkflow = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: CreateWorkflowPayload) =>
            axios
                .post<ApiResponse<Workflow>>("/api/workflow", payload)
                .then((res) => res.data),

        onSuccess: (data) => {
            toast.success("Workflow created successfully");
            router.push(`/workflow/${data.data.id}`);
        },

        onError: (error: AxiosError) => {
            console.error("[useCreateWorkflow]", error);
            toast.error("Failed to create workflow");
        },
    });
};


export const useGetWorkflowById = (WorkflowId: string) => {
    return useQuery({
        queryKey: ["workflow", WorkflowId],
        queryFn: async () => {
            return await axios
                .get<{ data: WorkflowType }>(`/api/workflow/${WorkflowId}`)
                .then((res) => res.data.data);
    },
        enabled: !!WorkflowId, // Only run the query if WorkflowId is truthy
});

};