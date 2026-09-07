import { type ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Menu } from 'lucide-react';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm p-4 flex items-center gap-3">
          <Menu className="w-5 h-5" />
          <h1 className="font-bold text-primary tracking-tight">SecArch Lab</h1>
        </header>
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
