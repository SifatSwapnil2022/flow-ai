"use client"
import { format } from "date-fns"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { WorkflowIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useWorkflows } from '@/features/use-workflow'
import CreateWorkflowDialog from '../_common/create-workflow'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'

const Page = () => {
  const router = useRouter();
  const { data, isPending } = useWorkflows();
  const workflows = data || [];

  return (
    <div className='min-h-screen'>
      <div className='py-4'>

        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-foreground mt-1'>
              Workflows
            </h1>
            <p className='text-muted-foreground mt-1'>
              Build and manage your automation workflows with custom logic and tools.
            </p>
          </div>
          <CreateWorkflowDialog />
        </div>

        <div>
          {isPending ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className='h-40' />
              ))}
            </div>
          ) : workflows.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {workflows.map((workflow) => (
                <Card
                  key={workflow.id}
                  onClick={() => router.push(`/workflow/${workflow.id}`)}
                  className='cursor-pointer hover:bg-secondary/50 transition-colors'
                >
                  <CardContent className='space-y-2'>
                    <div className='relative mb-3'>
                      <div className='flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary'>
                        <WorkflowIcon size={22} /> {/* ✅ single icon */}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <h3 className='font-semibold text-sm leading-none'>
                        {workflow.name}
                      </h3>
                    </div>
                    <p className='text-sm text-muted-foreground truncate'>
                      {workflow.description || "No description provided"}
                    </p>
                    <div className='pt-1 flex items-center justify-between text-xs text-muted-foreground/70 font-medium'> {/* ✅ fixed typo: foreground */}
                      <span>
                        {format(new Date(workflow.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <WorkflowIcon />
                </EmptyMedia>
                <EmptyTitle>No Workflows Found</EmptyTitle>
                <EmptyDescription>
                  You have not created any workflows yet. Click the button above to get started.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>

      </div>
    </div>
  )
}

export default Page