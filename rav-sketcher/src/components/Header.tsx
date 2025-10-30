import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Moon, Sun, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  onExport: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onExport,
  toggleTheme,
  isDarkMode
}) => {
  return (
    <header className="w-full py-4 px-6 border-b border-border backdrop-blur-sm bg-background/50 animate-fade-in">
      <div className="container max-w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SidebarTrigger>
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-semibold">M</div>
          <h1 className="text-xl font-medium">AI Diagram Creator</h1>
          <div className="hidden sm:flex items-center gap-2">
            <div className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Beta</div>
            <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">AI Powered</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;