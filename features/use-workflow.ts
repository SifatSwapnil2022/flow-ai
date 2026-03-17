import { Workflow } from "@/lib/generated/prisma";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CreateWorkflowPayload = {
    name: string;
    description?: string;
};

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