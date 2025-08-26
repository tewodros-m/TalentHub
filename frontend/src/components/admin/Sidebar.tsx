import { ArrowLeft, Briefcase, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  onSelect: (tab: string) => void;
  activeTab: string;
}

const Sidebar = ({ onSelect, activeTab }: SidebarProps) => {
  const navigate = useNavigate();

  const tabs = [
    { id: 'jobs', label: 'Jobs', icon: <Briefcase size={18} /> },
    { id: 'applications', label: 'Applications', icon: <FileText size={18} /> },
  ];

  return (
    <div className='w-64 h-screen bg-primary-900 text-text flex flex-col p-5 fixed left-0 top-0'>
      <button
        onClick={() => navigate('/')}
        className='text-gray-50 fixed left-4 top-4 hover:left-3 transition-all duration-200'
      >
        <ArrowLeft className='mr-2 inline-block' />
        Back
      </button>
      <nav className='space-y-2 mt-14'>
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
