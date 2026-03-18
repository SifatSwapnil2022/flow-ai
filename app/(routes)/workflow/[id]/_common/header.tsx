"use client";

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Code, MoreHorizontal, Pencil, Play } from 'lucide-react';
import Link from 'next/link';
import { useWorkflowContext } from '@/context/workflow-context'; // ✅ correct name
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type PropsType = {
    isLoading?: boolean;
    name?: string;
    workflowId?: string;
}

const Header = ({ isLoading, name }: PropsType) => {
    const { view, setView } = useWorkflowContext(); // ✅ object destructure

    const tabs = [
        { id: "edit", label: "Edit", icon: Pencil },
        { id: "preview", label: "Preview", icon: Play },
    ] as const;

    const zIndex = view === "preview" ? "z-99" : "z-0";

    const handleSetView = (tabId: "edit" | "preview") => {
        setView(tabId);
    }

    return (
        <div className='relative'>
            <header className='w-full bg-transparent absolute top-0 z-50'>
                <div className='flex h-14 items-center justify-between px-4'>
                    <Link
                        href="/workflow"
                        className={`flex items-center gap-3 bg-card ${zIndex} py-1 px-1 rounded-lg`}
                    >
                        <Button variant="secondary" size="icon" className='size-8!'>
                            <ChevronLeft className='size-4' />
                        </Button>
                        <div>
                            {isLoading ? (
                                <Skeleton className='w-20' />
                            ) : (
                                <h1 className='text-sm font-semibold truncate max-w-50'>
                                    {name || 'Untitled Workflow'}
                                </h1>
                            )}
                        </div>
                    </Link>

                    <div className='flex items-center gap-1 rounded-lg bg-muted p-1 mt-1 z-999!'>
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleSetView(tab.id)}
                                    className={cn(
                                        'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                                        view === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                                    )}
                                >
                                    <Icon className='size-4' />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>

                    <div className='flex items-center gap-2 bg-card p-1 rounded-lg'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className='size-8'>
                                    <MoreHorizontal className='size-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant="ghost" size="icon" className='size-8 gap-1.5'>
                            <Code className='w-3.5 h-3.5' />
                            code
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header