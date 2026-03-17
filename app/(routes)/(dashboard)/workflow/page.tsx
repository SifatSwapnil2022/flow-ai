import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import {  WorkflowIcon } from 'lucide-react'


import CreateWorkflowDialog from '../_common/create-workflow'

const Page = () => {
  return (
    <div className='min-h-auto'>
      <div className='py-4'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-foreground mt-1'>
              Workflows</h1>
              <p className='text-muted-foreground mt-1'>
                Build a chat agent workflow with custom logic and tools
              </p>
          </div>
          
          <CreateWorkflowDialog />
        </div>
          <div>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <WorkflowIcon />
                </EmptyMedia>
                <EmptyTitle>No Workflows Found</EmptyTitle>
                <EmptyDescription>
                  You have not created any workflows yet. Click the button above to create your first workflow.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
      </div>
      </div>
  )
}

export default Page