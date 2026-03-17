import React from 'react'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';  
import { Plus, Workflow } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreateWorkflow } from '@/features/use-workflow';
import { Dialog } from 'radix-ui';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


const workflowSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional()
});

type WorkflowFormData = z.infer<typeof workflowSchema>;



const CreateWorkflowDialog = () => {
    const { mutate, isPending } = useCreateWorkflow();
    const [open, setOpen] = React.useState(false);
    const form = useForm<WorkflowFormData>({
        resolver: zodResolver(workflowSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    });

    const onSubmit = (data: WorkflowFormData) => {
        mutate(data);
    }
    const onSubmit = (data: WorkflowFormData) => {
        return <Dialog open = {open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button>
                  <Plus size = {18} />  
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Workflow</DialogTitle>
                    <DialogDescription>
                        Create a new workflow
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    }
}

export default CreateWorkflowDialog;