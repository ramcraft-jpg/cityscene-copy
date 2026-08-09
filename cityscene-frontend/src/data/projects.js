const projects = [
  {
    id: "powerportal",
    title: "PowerPortal",
    titleSystem: "Power Portal System",
    category: "Energy & Utilities",
    categoryCaps: "ENTERPRISE ERP",
    description: "Power Portal is a complete Sales & Project Management platform that manages the entire business lifecycle — from lead acquisition to project delivery, invoicing, and analytics — in one unified system.",
    image: "/assets/images/projects/powerportal.jpg",
    slug: "powerportal",
    systemOverview: [
      "Power Portal is a comprehensive enterprise-grade Sales and Project Management platform designed to manage the complete business lifecycle from initial lead acquisition through final project delivery, billing, and post-sales analysis.",
      "The system seamlessly connects sales operations, inventory, finance, delivery, and project execution into a unified data ecosystem, eliminating data silos between departments and ensuring real-time synchronization across all business functions.",
      "Power Portal supports both Order-to-Cash and Concept-to-Completion workflows, making it ideal for businesses that handle complex sales cycles, customized orders, service delivery, and project-based execution.",
      "Built with scalability and flexibility at its core, the platform can efficiently support organizations processing as few as 10 orders per month to enterprises handling 10,000+ orders monthly—without compromising performance, data integrity, or user experience."
    ],
    summaryNote: "With automated order validation and instant status confirmation, Power Portal ensures accuracy, speed, and transparency across every operational milestone.",
    capabilities: [
      { title: "Delivery & Logistics", description: "Partial shipments, courier integrations, GPS tracking, POD." },
      { title: "Customer Communication", description: "Automated emails, order tracking portal, and support tickets." }
    ],
    executionFeatures: [
      { title: "Project Automation", description: "Auto project creation, task templates, dependencies, and milestones." },
      { title: "Task & Resource Management", description: "Kanban boards, Gantt charts, skill-based allocation." },
      { title: "Time & Cost Control", description: "Timesheets, earned value management, profitability tracking." },
      { title: "Dashboards & Reports", description: "Sales funnels, project health, executive KPIs." }
    ],
    techStack: ["React", "Node.js", "TimeSeries DB", "Tailwind CSS", "WebSockets"]
  },
  {
    id: "healthconnect",
    title: "HealthConnect",
    titleSystem: "HealthConnect Digital System",
    category: "Healthcare Tech",
    categoryCaps: "HEALTHCARE TECH",
    description: "HealthConnect is a unified digital ecosystem connecting patients, doctors, and clinical administration in real time.",
    image: "/assets/images/projects/healthconnect.jpg",
    slug: "healthconnect",
    systemOverview: [
      "HealthConnect streamlines healthcare delivery by bridging the communication gap between clinical administration, attending physicians, and patients into a HIPAA-compliant digital environment.",
      "The system synchronizes electronic health records (EHR), automated appointment dispatching, and secure telemedicine consultations into a seamless workflow.",
      "HealthConnect empowers care providers to deliver proactive treatment plans while providing patients with instant access to lab results and digital prescriptions.",
      "Engineered for high availability and strict medical data privacy standards across hospital networks and outpatient clinics."
    ],
    summaryNote: "By digitizing clinical workflows and patient touchpoints, HealthConnect improves care delivery speed and patient satisfaction.",
    capabilities: [
      { title: "EHR Synchronization", description: "Real-time medical history timeline, lab results, and digital scripts." },
      { title: "Tele-Health Engine", description: "Encrypted HD video consultations with interactive prescription notes." }
    ],
    executionFeatures: [
      { title: "Clinical Scheduling", description: "Multi-channel automated appointment booking and instant reminders." },
      { title: "Patient Portal", description: "Self-service lab downloads, symptom trackers, and secure messaging." },
      { title: "HIPAA Security", description: "End-to-end encryption, audit logs, and role-based data access." },
      { title: "Analytics & Outcomes", description: "Patient recovery metrics, clinic occupancy, and physician KPIs." }
    ],
    techStack: ["React Native", "React", "GraphQL", "Node.js", "WebRTC"]
  },
  {
    id: "fleetpro",
    title: "FleetPro",
    titleSystem: "FleetPro Mobility System",
    category: "Logistics & Mobility",
    categoryCaps: "LOGISTICS & MOBILITY",
    description: "Smart fleet management platform for tracking vehicles, driver safety, and transport operations.",
    image: "/assets/images/projects/fleetpro.jpg",
    slug: "fleetpro",
    systemOverview: [
      "FleetPro delivers an intelligent telemetry and fleet management platform for commercial logistics, transit networks, and heavy transport enterprises.",
      "The system aggregates sub-second geospatial updates, IoT engine sensor feeds, and fuel telemetry to eliminate route inefficiencies and reduce operating costs.",
      "FleetPro provides automated geofence triggers, driver behavior safety scoring, and predictive maintenance alerts.",
      "Built for high-density transport fleets handling thousands of active routes across global supply routes."
    ],
    summaryNote: "FleetPro provides full visibility over vehicle fleets, ensuring safety compliance and optimized fuel consumption.",
    capabilities: [
      { title: "Telemetry & GPS", description: "Sub-second geospatial tracking, geofencing, and engine diagnostics." },
      { title: "Driver Analytics", description: "Safety scoring, speed compliance alerts, and automated shift logs." }
    ],
    executionFeatures: [
      { title: "Route Optimization", description: "AI route planning, dynamic traffic avoidance, and multi-drop ordering." },
      { title: "Fuel Management", description: "Fuel theft detection, consumption analytics, and fill-up logging." },
      { title: "Maintenance Sync", description: "Predictive breakdown alerts and automated service work orders." },
      { title: "Fleet Reports", description: "Utilization rates, carbon footprint metrics, and operational KPIs." }
    ],
    techStack: ["React", "Leaflet Maps", "Python / FastAPI", "Kafka", "Docker"]
  },
  {
    id: "solarcare",
    title: "SolarCare",
    category: "Enterprise ERP",
    categoryCaps: "ENTERPRISE ERP",
    titleSystem: "SolarCare ERP System",
    description: "Project-centric ERP workflow managing procurement, site execution, and renewable energy delivery.",
    image: "/assets/images/projects/solarcare.jpg",
    slug: "solarcare",
    systemOverview: [
      "SolarCare is a specialized enterprise resource planning (ERP) system engineered specifically for commercial and utility solar construction projects.",
      "The platform unifies site engineering survey data, bill of quantities (BOQ) procurement, contractor milestone approvals, and commissioning verification.",
      "SolarCare connects field engineering teams with corporate finance departments, preventing cost overruns and material bottlenecks.",
      "Designed to support solar developers managing multi-megawatt solar installations across distributed geographic regions."
    ],
    summaryNote: "SolarCare streamlines renewable energy project lifecycles from initial engineering survey to grid connection.",
    capabilities: [
      { title: "Procurement Portal", description: "Vendor BOQ requests, PO approvals, and inventory dispatching." },
      { title: "Field Mobile App", description: "Site audit checklists, offline photo uploads, and milestone signoffs." }
    ],
    executionFeatures: [
      { title: "BOQ & Costing", description: "Automated bill of materials costing, supplier pricing sync, and PO tracking." },
      { title: "Milestone Tracking", description: "Gantt schedules, site inspection signoffs, and commissioning logs." },
      { title: "Vendor Management", description: "Supplier ratings, contract compliance, and invoice reconciliation." },
      { title: "Executive Dashboards", description: "Portfolio yield forecasts, project margin health, and cash flow." }
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST APIs"]
  },
  {
    id: "autitrack-pro",
    title: "AutiTrack Pro",
    titleSystem: "AutiTrack Pro Clinical System",
    category: "Medical Tech",
    categoryCaps: "MEDICAL TECH",
    description: "Structured autism care platform enabling doctors, therapists, and families to track therapy and progress.",
    image: "/assets/images/projects/autitrack-pro.jpg",
    slug: "autitrack-pro",
    systemOverview: [
      "AutiTrack Pro is a specialized clinical platform designed for pediatricians, speech/occupational therapists, and care teams managing autism spectrum care.",
      "The system standardizes behavioral assessment scoring, therapy milestone tracking, and home exercise program monitoring into a unified caregiver portal.",
      "AutiTrack Pro enables real-time collaboration between multidisciplinary specialists and parents, accelerating developmental progress.",
      "Built with child-friendly interactive interfaces and strict medical data privacy protections."
    ],
    summaryNote: "AutiTrack Pro turns therapy evaluation data into actionable, personalized care plans for every child.",
    capabilities: [
      { title: "Behavioral Analytics", description: "Longitudinal progress charts, developmental milestones, and goal scoring." },
      { title: "Multidisciplinary Portal", description: "Shared session notes between speech, OT, and behavioral therapists." }
    ],
    executionFeatures: [
      { title: "Assessment Automation", description: "Standardized clinical questionnaires, diagnostic scoring, and report generation." },
      { title: "Therapy Log", description: "Session timer, activity tracking, and objective performance records." },
      { title: "Family Sync App", description: "Daily home habit logging, video guidance, and direct therapist messaging." },
      { title: "Clinical Insights", description: "Cohort progress trends, intervention efficacy metrics, and outcome charts." }
    ],
    techStack: ["React", "Redux Toolkit", "Chart.js", "Node.js", "Express"]
  },
  {
    id: "procuraone",
    title: "ProcuraOne",
    titleSystem: "ProcuraOne Procurement System",
    category: "Supply Chain",
    categoryCaps: "SUPPLY CHAIN",
    description: "End-to-end procurement and vendor management system ensuring compliance, transparency, and auditability.",
    image: "/assets/images/projects/procuraone.jpg",
    slug: "procuraone",
    systemOverview: [
      "ProcuraOne modernizes corporate procurement by digitizing requisition approvals, vendor sourcing, contract lifecycle management, and invoice audit matching.",
      "The system enforces multi-tiered financial approval matrices, mitigating fraud risk and eliminating manual processing bottlenecks.",
      "ProcuraOne connects seamlessly with legacy ERP accounting ledgers for instant purchase order and ledger reconciliation.",
      "Built for enterprise procurement departments processing thousands of vendor contracts and purchase orders annually."
    ],
    summaryNote: "ProcuraOne delivers total spend visibility and automated procurement workflows for modern enterprises.",
    capabilities: [
      { title: "Approval Matrix", description: "Dynamic financial threshold routing and multi-tier manager signoffs." },
      { title: "Vendor Portal", description: "RFQs, bid submissions, compliance document storage, and scorecard ratings." }
    ],
    executionFeatures: [
      { title: "Requisition Engine", description: "Item catalog selection, budget checking, and automated PO generation." },
      { title: "3-Way Matching", description: "PO, goods receipt, and invoice automated reconciliation." },
      { title: "Audit Trail", description: "Immutable event logs for every procurement action and approval." },
      { title: "Spend Analytics", description: "Category spend breakdown, savings metrics, and vendor performance." }
    ],
    techStack: ["React", "Tailwind CSS", "Enterprise API", "Node.js"]
  },
  {
    id: "solarsync",
    title: "SolarSync",
    titleSystem: "SolarSync Analytics System",
    category: "Renewable Energy",
    categoryCaps: "RENEWABLE ENERGY",
    description: "Intelligent IoT monitoring system for tracking solar farm output, inverter performance, and asset health.",
    image: "/assets/images/projects/solarsync.jpg",
    slug: "solarsync",
    systemOverview: [
      "SolarSync is an IoT-connected energy telemetry and performance analytics application engineered for utility-scale solar arrays and commercial rooftop setups.",
      "The platform continuously evaluates string-level power output, solar irradiance, ambient temperature, and inverter conversion efficiency in real time.",
      "SolarSync utilizes machine learning models to detect thermal anomalies, panel degradation, and inverter failures before power output drops.",
      "Designed for solar asset managers, IPPs, and operation & maintenance (O&M) teams handling gigawatt-scale renewable portfolios."
    ],
    summaryNote: "SolarSync maximizes solar plant yield and minimizes downtime through real-time IoT diagnostic feeds.",
    capabilities: [
      { title: "IoT Telemetry", description: "Inverter string monitoring, weather station sync, and live power graphs." },
      { title: "Yield Analytics", description: "Performance Ratio (PR) calculation, degradation alerts, and loss modeling." }
    ],
    executionFeatures: [
      { title: "Fault Detection", description: "AI anomaly classification, inverter tripping alerts, and string fault maps." },
      { title: "Predictive O&M", description: "Soiling loss estimation and optimal panel cleaning schedule triggers." },
      { title: "Revenue Forecast", description: "PPA tariff calculation, generation forecasts, and financial yield logs." },
      { title: "Asset Reports", description: "Automated investor reports, daily generation summaries, and uptime KPIs." }
    ],
    techStack: ["React", "D3.js / Recharts", "Python", "MQTT / WebSockets"]
  }
];

export default projects;
