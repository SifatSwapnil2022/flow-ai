"use client";

import React from 'react'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreateWorkflow } from '@/features/use-workflow';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';


const workflowSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional()
});

type WorkflowFormData = z.infer<typeof workflowSchema>;


const CreateWorkflowDialog = () => {
    const { mutate: createWorkflow, isPending } = useCreateWorkflow();
    const [open, setOpen] = React.useState(false);

    const form = useForm<WorkflowFormData>({
        resolver: zodResolver(workflowSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    });

    const onSubmit = (data: WorkflowFormData) => {
        createWorkflow(data, {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus size={18} />
                    <span>New Workflow</span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Workflow</DialogTitle>
                    <DialogDescription>
                        Define a workflow to automate and organize your processes. Fill in the details below to get started.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workflow Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Customer Support Automation"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. This workflow handles incoming customer support tickets and routes them to the appropriate team."
                                            className="resize-none"
                                            rows={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending && <Spinner />}
                                {isPending ? 'Creating...' : 'Create Workflow'}
                            </Button>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkflowDialog;