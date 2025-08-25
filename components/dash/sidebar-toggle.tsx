
'use client';

import type { ComponentProps } from 'react';

import { type SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import {Tooltip,TooltipContent,TooltipTrigger,} from '@/components/ui/tooltip';
import { Button } from '../ui/button';
import { SidebarIcon } from 'lucide-react';


export function SidebarToggle({ }: ComponentProps<typeof SidebarTrigger>) {
  
  const { toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-testid="sidebar-toggle-button"
          onClick={toggleSidebar}
          variant="outline"
          className="md:px-2 md:h-fit"
        >
          <SidebarIcon size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="start">Toggle Sidebar</TooltipContent>
    </Tooltip>
  );
}
