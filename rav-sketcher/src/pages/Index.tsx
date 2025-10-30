
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import AIPrompt from '@/components/AIPrompt';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { saveAs } from 'file-saver';
import { DIAGRAM_TEMPLATES } from '@/data/templates';

const DEFAULT_DIAGRAM = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative Action]
    C --> E[Result]
    D --> E`;

const Index = () => {
  const [code, setCode] = useState<string>(DEFAULT_DIAGRAM);
  const [prompt, setPrompt] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [recentDiagrams, setRecentDiagrams] = useState<Array<{ id: string; name: string; code: string }>>([]);

  // Initialize theme and load recent diagrams
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Load recent diagrams from localStorage
    const saved = localStorage.getItem('recentDiagrams');
    if (saved) {
      try {
        setRecentDiagrams(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load recent diagrams:', e);
      }
    }
  }, []);

  // Save diagram to recent
  const saveToRecent = (diagramCode: string) => {
    const firstLine = diagramCode.split('\n')[0].replace(/[^\w\s]/gi, '').trim();
    const name = firstLine || 'Untitled Diagram';
    
    const newDiagram = {
      id: Date.now().toString(),
      name,
      code: diagramCode,
    };

    const updated = [newDiagram, ...recentDiagrams.filter(d => d.code !== diagramCode)].slice(0, 10);
    setRecentDiagrams(updated);
    localStorage.setItem('recentDiagrams', JSON.stringify(updated));
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Re-render the diagram with the new theme
    // This forces the Mermaid renderer to use the new theme
    const currentCode = code;
    setCode('');
    setTimeout(() => setCode(currentCode), 10);
  };

  const handleExport = () => {
    try {
      const svgElement = document.querySelector('.diagram-container svg');
      if (!svgElement) {
        toast({
          title: "Export failed",
          description: "No diagram to export",
          variant: "destructive",
        });
        return;
      }
      
      // Get SVG content
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
      
      // Generate filename from first line of diagram or use default
      let filename = 'mermaid-diagram.svg';
      const firstLine = code.split('\n')[0];
      if (firstLine) {
        const cleanName = firstLine
          .replace(/[^\w\s]/gi, '')
          .trim()
          .replace(/\s+/g, '-')
          .toLowerCase();
        if (cleanName) {
          filename = `${cleanName}.svg`;
        }
      }
      
      saveAs(svgBlob, filename);
      
      toast({
        title: "Export successful",
        description: `Saved as ${filename}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "Failed to export diagram",
        variant: "destructive",
      });
    }
  };

  const handleDiagramGenerated = (generatedCode: string) => {
    setCode(generatedCode);
    saveToRecent(generatedCode);
  };

  const handleTemplateSelect = (templateCode: string) => {
    setCode(templateCode);
    saveToRecent(templateCode);
    toast({
      title: "Template loaded",
      description: "Template has been loaded into the editor",
    });
  };

  const handleRecentSelect = (diagramCode: string) => {
    setCode(diagramCode);
    toast({
      title: "Diagram loaded",
      description: "Recent diagram has been loaded",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 animate-fade-in">
        <AppSidebar 
          templates={DIAGRAM_TEMPLATES}
          onTemplateSelect={handleTemplateSelect}
          recentDiagrams={recentDiagrams}
          onRecentSelect={handleRecentSelect}
        />
        
        <div className="flex flex-col flex-1 w-full">
          <Header 
            onExport={handleExport} 
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
          
          <main className="flex-1 container py-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <div className="glass-panel p-4 flex flex-col animate-slide-in">
                <Editor 
                  value={code} 
                  onChange={setCode} 
                  className="flex-1"
                  promptValue={prompt}
                  onPromptChange={setPrompt}
                />
                <Separator className="my-4" />
                <AIPrompt 
                  prompt={prompt} 
                  onDiagramGenerated={handleDiagramGenerated} 
                />
              </div>
              
              <div className="glass-panel p-4 flex flex-col animate-slide-in" style={{ animationDelay: '100ms' }}>
                <Preview code={code} className="flex-1" />
              </div>
            </div>
            
            <div className="glass-panel p-4 text-center text-sm text-muted-foreground animate-slide-in" style={{ animationDelay: '200ms' }}>
              <p>
                Create beautiful diagrams with Mermaid syntax and AI assistance. 
                Made with precision and care.
              </p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
