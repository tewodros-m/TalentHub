import { Briefcase, FileText } from 'lucide-react';

interface SidebarProps {
  onSelect: (tab: string) => void;
  activeTab: string;
}

const Sidebar = ({ onSelect, activeTab }: SidebarProps) => {
  const tabs = [
    { id: 'jobs', label: 'Jobs', icon: <Briefcase size={18} /> },
    { id: 'applications', label: 'Applications', icon: <FileText size={18} /> },
  ];

  return (
    <div className='w-64 h-screen bg-primary-900 text-text flex flex-col p-5 fixed left-0 top-0'>
      <nav className='space-y-2 mt-10'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition border-b border-gray-700 mb-4 uppercase
              ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
