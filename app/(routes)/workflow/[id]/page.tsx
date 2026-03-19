"use client";

import { useGetWorkflowById } from '@/features/use-workflow';
import { useParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import Header from '@/app/(routes)/workflow/[id]/_common/header';
import { WorkflowProvider } from '@/context/workflow-context';
import WorkflowCanvas from './_common/workflow-canvas';

const Page = () => {
    const params = useParams();
    const id = params.id as string;
    const { data: workflow, isPending } = useGetWorkflowById(id);

    if (isPending) { // ✅ check loading first
        return (
            <div className='flex items-center justify-center h-full'>
                <Spinner className='size-12 text-primary' />
            </div>
        );
    }

    if (!workflow) { // ✅ only show not found after loading completes
        return <div>Workflow not found</div>;
    }

    return (
        <div className='min-h-screen bg-background'>
            <WorkflowProvider>
            <div className='flex flex-col h-screen relative'>
                <Header
                isLoading = {isPending}
                    name ={workflow?.name}
                    workflowId={workflow?.id}
                />
                <div className='flex relative overflow-hidden'>
                    { isPending ? (
                        <div className='flex items-center justify-center h-full w-full'>
                            <Spinner className='size-12 text-primary' />
                        </div>
                    ) : (
                        <WorkflowCanvas />
                    )}
                </div>
            </div>
            </WorkflowProvider>
        </div>
    );
}

export default Page;