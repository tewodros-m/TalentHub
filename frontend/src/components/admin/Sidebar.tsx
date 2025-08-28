import { ArrowLeft, Briefcase, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

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
    <div className='w-56 h-screen bg-primary-900 dark:bg-primary-100 text-gray-200 dark:text-gray-700 flex flex-col py-5 fixed left-0 top-0 transition-all'>
      <Button
        onClick={() => navigate('/')}
        variant='custom'
        className='fixed left-4 top-4 hover:left-3 transition-all duration-200 px-0 py-0 border-none'
      >
        <ArrowLeft className='mr-2 inline-block' />
        Back
      </Button>
      <nav className='space-y-2 mt-14'>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant='custom'
            onClick={() => onSelect(tab.id)}
            className={`!justify-start items-center gap-3 w-full px-4 py-2 text-sm font-medium transition border-b border-gray-600 dark:border-gray-300 uppercase
              ${
                activeTab === tab.id
                  ? 'bg-primary-600'
                  : 'hover:bg-gray-700 hover:dark:bg-primary-200'
              }`}
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
