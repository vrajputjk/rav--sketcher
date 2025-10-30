import { FileText, Sparkles, History, BookOpen, LayoutTemplate } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Template {
  id: string;
  title: string;
  category: string;
  code: string;
  icon: React.ReactNode;
}

interface AppSidebarProps {
  templates: Template[];
  onTemplateSelect: (code: string) => void;
  recentDiagrams: Array<{ id: string; name: string; code: string }>;
  onRecentSelect: (code: string) => void;
}

export function AppSidebar({ templates, onTemplateSelect, recentDiagrams, onRecentSelect }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4" />
              {!collapsed && <span>Templates</span>}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {Object.entries(groupedTemplates).map(([category, items]) => (
                <div key={category} className="mb-4">
                  {!collapsed && (
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                      {category}
                    </div>
                  )}
                  <SidebarMenu>
                    {items.map((template) => (
                    <SidebarMenuItem key={template.id}>
                      <SidebarMenuButton
                        onClick={() => onTemplateSelect(template.code)}
                        title={collapsed ? template.title : undefined}
                      >
                        {template.icon}
                        {!collapsed && <span>{template.title}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>

          {recentDiagrams.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <History className="h-4 w-4" />
                {!collapsed && <span>Recent</span>}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentDiagrams.slice(0, 5).map((diagram) => (
                    <SidebarMenuItem key={diagram.id}>
                      <SidebarMenuButton
                        onClick={() => onRecentSelect(diagram.code)}
                        title={collapsed ? diagram.name : undefined}
                      >
                        <FileText className="h-4 w-4" />
                        {!collapsed && (
                          <span className="truncate">{diagram.name}</span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {!collapsed && <span>Resources</span>}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="https://mermaid.js.org/intro/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Sparkles className="h-4 w-4" />
                      {!collapsed && <span>Mermaid Docs</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
