import { Workflow, GitBranch, Database, Calendar, PieChart, Binary, Network, BoxSelect, Layers } from "lucide-react";
import type { Template } from "@/components/AppSidebar";

export const DIAGRAM_TEMPLATES: Template[] = [
  {
    id: "flowchart-basic",
    title: "Basic Flowchart",
    category: "Flowcharts",
    icon: <Workflow className="h-4 w-4" />,
    code: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[Alternative]
    C --> E[End]
    D --> E`,
  },
  {
    id: "flowchart-complex",
    title: "Complex Flow",
    category: "Flowcharts",
    icon: <Workflow className="h-4 w-4" />,
    code: `graph TB
    Start([Start Process]) --> Input[/User Input/]
    Input --> Validate{Valid?}
    Validate -->|No| Error[Show Error]
    Error --> Input
    Validate -->|Yes| Process[Process Data]
    Process --> Store[(Save to DB)]
    Store --> Notify[Send Notification]
    Notify --> End([Complete])`,
  },
  {
    id: "sequence-basic",
    title: "Sequence Diagram",
    category: "Diagrams",
    icon: <GitBranch className="h-4 w-4" />,
    code: `sequenceDiagram
    participant User
    participant App
    participant API
    participant DB
    
    User->>App: Login Request
    App->>API: Authenticate
    API->>DB: Check Credentials
    DB-->>API: User Data
    API-->>App: Auth Token
    App-->>User: Success`,
  },
  {
    id: "class-diagram",
    title: "Class Diagram",
    category: "Diagrams",
    icon: <BoxSelect className="h-4 w-4" />,
    code: `classDiagram
    class User {
        +String name
        +String email
        +login()
        +logout()
    }
    class Admin {
        +String privileges
        +manageUsers()
    }
    class Customer {
        +String customerId
        +makeOrder()
    }
    User <|-- Admin
    User <|-- Customer`,
  },
  {
    id: "er-diagram",
    title: "Entity Relationship",
    category: "Diagrams",
    icon: <Database className="h-4 w-4" />,
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
    
    CUSTOMER {
        string name
        string email
        string phone
    }
    ORDER {
        int orderNumber
        date orderDate
        string status
    }
    LINE-ITEM {
        int quantity
        decimal price
    }`,
  },
  {
    id: "gantt-basic",
    title: "Gantt Chart",
    category: "Charts",
    icon: <Calendar className="h-4 w-4" />,
    code: `gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Planning
    Research           :a1, 2024-01-01, 30d
    Requirements       :a2, after a1, 20d
    section Development
    Frontend           :b1, after a2, 45d
    Backend            :b2, after a2, 40d
    section Testing
    QA Testing         :c1, after b1, 15d
    UAT                :c2, after c1, 10d`,
  },
  {
    id: "pie-chart",
    title: "Pie Chart",
    category: "Charts",
    icon: <PieChart className="h-4 w-4" />,
    code: `pie title Market Share
    "Product A" : 42.5
    "Product B" : 28.7
    "Product C" : 18.3
    "Others" : 10.5`,
  },
  {
    id: "state-diagram",
    title: "State Diagram",
    category: "Diagrams",
    icon: <Binary className="h-4 w-4" />,
    code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : Start
    Processing --> Success : Complete
    Processing --> Failed : Error
    Success --> [*]
    Failed --> Idle : Retry
    Failed --> [*] : Cancel`,
  },
  {
    id: "mindmap",
    title: "Mind Map",
    category: "Diagrams",
    icon: <Network className="h-4 w-4" />,
    code: `mindmap
  root((Project))
    Planning
      Research
      Requirements
      Timeline
    Development
      Frontend
        React
        TypeScript
      Backend
        API
        Database
    Testing
      Unit Tests
      Integration
      E2E`,
  },
  {
    id: "user-journey",
    title: "User Journey",
    category: "User Experience",
    icon: <Layers className="h-4 w-4" />,
    code: `journey
    title User Shopping Experience
    section Discovery
      Search Product: 5: User
      View Details: 4: User
    section Purchase
      Add to Cart: 5: User
      Checkout: 3: User
      Payment: 2: User
    section Post-Purchase
      Confirmation: 5: User
      Delivery: 4: User, Courier
      Review: 3: User`,
  },
];
