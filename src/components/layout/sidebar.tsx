import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  ShieldAlert, 
  Key, 
  Network, 
  AppWindow, 
  Database, 
  Cloud, 
  Laptop, 
  GitMerge, 
  Activity, 
  RefreshCcw, 
  Scale, 
  BookOpen 
} from 'lucide-react';

const navItems = [
  { id: 'zero-trust', label: 'Zero Trust & Boundaries', icon: ShieldAlert },
  { id: 'identity', label: 'Identity & Access', icon: Key },
  { id: 'network', label: 'Edge & Network', icon: Network },
  { id: 'apps', label: 'Apps & Threat Modeling', icon: AppWindow },
  { id: 'data', label: 'Data & Crypto', icon: Database },
  { id: 'cloud', label: 'Cloud & Containers', icon: Cloud },
  { id: 'endpoints', label: 'Endpoints & Posture', icon: Laptop },
  { id: 'supply-chain', label: 'Supply Chain & DevSecOps', icon: GitMerge },
  { id: 'telemetry', label: 'Telemetry & Response', icon: Activity },
  { id: 'resilience', label: 'Resilience & Recovery', icon: RefreshCcw },
  { id: 'grc', label: 'GRC & Principles', icon: Scale },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState('zero-trust');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <aside className="w-72 flex-shrink-0 border-r border-border bg-sidebar hidden lg:flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          SecArch Lab
        </h1>
        <p className="text-xs text-sidebar-foreground/70 mt-1 font-mono">
          Interactive Field Guide
        </p>
      </div>
      
      <nav className="flex-1 px-4 pb-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left font-medium",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-sidebar-foreground/60")} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
