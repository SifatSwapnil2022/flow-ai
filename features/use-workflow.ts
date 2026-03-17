import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useRouter } from "next/router"

import { toast } from "sonner";

type CreateWorkflowPayload = {
    name: string;
    description?: string;
}

export const useCreateWorkflow = () => {
    // const router = useRouter();

    return useMutation({
        mutationFn: async ({
            name,
            description
        }: CreateWorkflowPayload) => {
            return axios.post("/api/workflow", {
                name,
                description
            }).then((res) => res.data);
        },
        onSuccess: (data) => {
            toast.success("Workflow created successfully");
            // router.push(`/workflow/${data.data.id}`);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to create workflow");
        }
    })
}