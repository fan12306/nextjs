import SideNav from '@/app/ui/dashboard/sidenav';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { ModeToggle } from '../components/mode-toggle';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div  className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      <ModeToggle></ModeToggle>
      <CopilotSidebar
          clickOutsideToClose={false}
          defaultOpen={true}
          labels={{
            title: "Popup Assistant",
            initial: "👋 Hi, there! You're chatting with an agent. This agent comes with a few tools to get you started.\n\nFor example you can try:\n- **Frontend Tools**: \"Set the theme to orange\"\n- **Shared State**: \"Write a proverb about AI\"\n- **Generative UI**: \"Get the weather in SF\"\n\nAs you interact with the agent, you'll see the UI update in real-time to reflect the agent's **state**, **tool calls**, and **progress**."
          }}
        />
    </div>
  );
}