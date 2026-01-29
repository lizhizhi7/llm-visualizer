import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AgentSidebar } from '../agent/AgentSidebar';
import { SettingsModal } from '../controls/SettingsModal';
import { useVisualizationStore } from '../../store/visualizationStore';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { currentPage } = useVisualizationStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <div className="flex-1 flex overflow-hidden">
        {currentPage === 'pipeline' ? <Sidebar /> : <AgentSidebar />}

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
