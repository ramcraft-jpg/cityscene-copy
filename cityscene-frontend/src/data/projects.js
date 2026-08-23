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
      "Power Portal supports both **Order-to-Cash** and **Concept-to-Completion** workflows, making it ideal for businesses that handle complex sales cycles, customized orders, service delivery, and project-based execution.",
      "Built with scalability and flexibility at its core, the platform can efficiently support organizations processing as few as **10 orders per month** to enterprises handling **10,000+ orders monthly**—without compromising performance, data integrity, or user experience."
    ],
    modulesTitle: "Sales & Delivery Modules",
    summaryNote: "From lead capture to delivery confirmation, Power Portal ensures accuracy, speed, and transparency.",
    capabilities: [
      { title: "Lead & Sales Management", description: "Multi-channel lead capture, BANT scoring, nurturing, and analytics." },
      { title: "Quotation & Order Processing", description: "Dynamic pricing, approvals, inventory validation, and payments." },
      { title: "Delivery & Logistics", description: "Partial shipments, courier integrations, GPS tracking, POD." },
      { title: "Customer Communication", description: "Automated emails, order tracking portal, and support tickets." }
    ],
    valuePropositions: [
      { title: "Unified Data Model", description: "Single source of truth across sales, projects, inventory, and finance." },
      { title: "Automation Excellence", description: "Eliminates repetitive tasks with intelligent workflow automation." },
      { title: "Real-Time Visibility", description: "Live dashboards for executives, sales managers, and project heads." },
      { title: "Scalable Architecture", description: "Designed for growth without performance degradation." },
      { title: "Industry Flexibility", description: "Manufacturing, services, distribution, and engineering workflows." },
      { title: "Enterprise Security", description: "Role-based access, audit logs, and compliance-ready." }
    ],
    executionTitle: "Project Execution & Analytics",
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
      "The system synchronizes Electronic Health Records (**EHR**), automated appointment dispatching, and secure telemedicine consultations into a seamless clinical workflow.",
      "HealthConnect empowers care providers to deliver proactive treatment plans while providing patients with instant access to lab results, digital prescriptions, and vital telemetry.",
      "Engineered for high availability and strict medical data privacy standards across hospital networks, specialized diagnostic centers, and outpatient clinics."
    ],
    modulesTitle: "Clinical Care & Patient Modules",
    summaryNote: "By digitizing clinical workflows and patient touchpoints, HealthConnect improves care delivery speed and patient satisfaction.",
    capabilities: [
      { title: "EHR Synchronization", description: "Real-time medical history timeline, lab results, digital scripts, and allergy records." },
      { title: "Tele-Health Engine", description: "Encrypted HD video consultations with interactive prescription notes and vitals logging." },
      { title: "Automated Appointment Queue", description: "Multi-channel automated appointment booking, smart queueing, and instant SMS reminders." },
      { title: "Patient Care Portal", description: "Self-service lab report downloads, symptom trackers, and secure doctor messaging." }
    ],
    valuePropositions: [
      { title: "HIPAA & GDPR Compliance", description: "End-to-end data encryption, immutable audit trails, and strict role-based access control." },
      { title: "Clinical Error Reduction", description: "Automated dosage cross-checking and digital chart verification." },
      { title: "Zero-Wait Queueing", description: "Automated clinic check-ins and digital token dispatching." },
      { title: "24/7 Remote Telemetry", description: "Continuous remote vitals monitoring for chronic condition patient management." },
      { title: "HL7 & FHIR Standards", description: "Native interoperability protocols connecting seamlessly with hospital ERP systems." },
      { title: "Patient Satisfaction Boost", description: "85% reduction in appointment no-shows through automated patient engagement." }
    ],
    executionTitle: "Clinical Workflow & Analytics",
    executionFeatures: [
      { title: "Clinical Scheduling", description: "Multi-channel automated appointment booking and instant doctor notifications." },
      { title: "Patient Portal Sync", description: "Self-service lab downloads, symptom trackers, and secure medical messaging." },
      { title: "HIPAA Security Architecture", description: "End-to-end encryption, audit logs, and role-based clinical access control." },
      { title: "Care Outcome Analytics", description: "Patient recovery metrics, clinic bed occupancy, and physician performance KPIs." }
    ],
    techStack: ["React Native", "React", "GraphQL", "Node.js", "WebRTC"]
  },
  {
    id: "fleetpro",
    title: "FleetPro",
    titleSystem: "FleetPro Telemetry & Mobility System",
    category: "Logistics & Mobility",
    categoryCaps: "LOGISTICS & MOBILITY",
    description: "Smart fleet management platform for tracking vehicles, driver safety, and transport operations.",
    image: "/assets/images/projects/fleetpro.jpg",
    slug: "fleetpro",
    systemOverview: [
      "FleetPro delivers an intelligent telemetry and fleet management platform for commercial logistics, transit networks, and heavy transport enterprises.",
      "The system aggregates sub-second geospatial updates, IoT engine sensor feeds, and fuel telemetry to eliminate route inefficiencies and reduce operating costs.",
      "FleetPro provides automated geofence triggers, driver behavior safety scoring, and predictive maintenance alerts across long-haul and last-mile logistics routes.",
      "Built for high-density transport fleets handling **thousands of active vehicles** across global logistics networks with zero latency."
    ],
    modulesTitle: "Logistics & Fleet Operations Modules",
    summaryNote: "FleetPro provides total visibility over vehicle fleets, ensuring safety compliance and optimized fuel consumption.",
    capabilities: [
      { title: "Sub-Second GPS Telemetry", description: "Live vehicle location tracking, geofence breaches, and route history playback." },
      { title: "Driver Behavior Analytics", description: "Safety scoring based on harsh braking, rapid acceleration, idling, and speed compliance." },
      { title: "Dynamic Route Optimization", description: "AI-powered route planning, dynamic traffic avoidance, and multi-drop ordering." },
      { title: "Fuel & Theft Protection", description: "Real-time fuel level monitoring, theft detection alerts, and consumption analytics." }
    ],
    valuePropositions: [
      { title: "30% Fuel Cost Reduction", description: "Intelligent route optimization and idling reduction cut fleet fuel expenditure significantly." },
      { title: "Predictive Vehicle Maintenance", description: "Engine OBD-II diagnostics trigger maintenance before costly breakdowns occur." },
      { title: "Driver Safety Enhancement", description: "Automated in-cab alerts and driver safety scorecards lower accident rates." },
      { title: "Complete Supply Chain Visibility", description: "Live ETA updates shared directly with cargo owners and dispatchers." },
      { title: "Automated Compliance Logging", description: "Electronic Logging Device (ELD) integration for regulatory transport compliance." },
      { title: "Rapid Cargo Dispatch", description: "Automated trip assignment based on driver proximity and vehicle load capacity." }
    ],
    executionTitle: "Fleet Analytics & Operations",
    executionFeatures: [
      { title: "Route Optimization Engine", description: "AI route planning, dynamic traffic avoidance, and multi-drop ordering." },
      { title: "Fuel Management System", description: "Fuel theft detection, consumption analytics, and fill-up logging." },
      { title: "Maintenance Work Order Sync", description: "Predictive breakdown alerts and automated service work order triggers." },
      { title: "Fleet Profitability Reports", description: "Vehicle utilization rates, carbon footprint metrics, and operational cost KPIs." }
    ],
    techStack: ["React", "Leaflet Maps", "Python / FastAPI", "Kafka", "Docker"]
  },
  {
    id: "solarcare",
    title: "SolarCare",
    titleSystem: "SolarCare Construction ERP System",
    category: "Enterprise ERP",
    categoryCaps: "ENTERPRISE ERP",
    description: "Project-centric ERP workflow managing procurement, site execution, and renewable energy delivery.",
    image: "/assets/images/projects/solarcare.jpg",
    slug: "solarcare",
    systemOverview: [
      "SolarCare is a specialized enterprise resource planning (ERP) system engineered specifically for commercial and utility solar construction projects.",
      "The platform unifies site engineering survey data, bill of quantities (**BOQ**) procurement, contractor milestone approvals, and commissioning verification.",
      "SolarCare connects field engineering teams with corporate finance departments, preventing cost overruns and material bottlenecks during solar installations.",
      "Designed to support solar developers managing **multi-megawatt solar projects** across distributed geographic regions."
    ],
    modulesTitle: "Solar Procurement & Project Modules",
    summaryNote: "SolarCare streamlines renewable energy project lifecycles from initial engineering survey to grid connection.",
    capabilities: [
      { title: "BOQ & Procurement Portal", description: "Material requisition, supplier BOQ requests, PO approvals, and inventory dispatching." },
      { title: "Field Mobile App", description: "Site audit checklists, offline photo uploads, and contractor milestone signoffs." },
      { title: "Subcontractor Management", description: "Contractor bidding, milestone verification, and automated progress billing." },
      { title: "Grid Commissioning Verification", description: "Safety inspection workflows, compliance documentation, and handover logs." }
    ],
    valuePropositions: [
      { title: "Zero Material Bottlenecks", description: "Just-in-time procurement tracking prevents solar site work stoppage." },
      { title: "100% Budget Traceability", description: "Real-time BOQ cost variance monitoring against project budgets." },
      { title: "Mobile Field Signoff", description: "Engineers verify milestones directly from tablets on site." },
      { title: "Supplier Transparency", description: "Vendor rating metrics based on delivery speed and material quality." },
      { title: "Accelerated Grid Handover", description: "Standardized commissioning workflows speed up utility approval." },
      { title: "Multi-Site Portfolio Control", description: "Executive visibility across dozens of simultaneous solar farm builds." }
    ],
    executionTitle: "Solar Execution & Analytics",
    executionFeatures: [
      { title: "BOQ & Costing Engine", description: "Automated bill of materials costing, supplier pricing sync, and PO tracking." },
      { title: "Milestone Gantt Tracker", description: "Gantt schedules, site inspection signoffs, and commissioning logs." },
      { title: "Vendor Compliance Management", description: "Supplier ratings, contract compliance, and invoice reconciliation." },
      { title: "Executive Margin Dashboards", description: "Portfolio yield forecasts, project margin health, and cash flow." }
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
      "Built with child-friendly interactive interfaces and strict medical data privacy protections across therapy centers."
    ],
    modulesTitle: "Therapy & Clinical Modules",
    summaryNote: "AutiTrack Pro turns therapy evaluation data into actionable, personalized care plans for every child.",
    capabilities: [
      { title: "Standardized Clinical Assessments", description: "Digital scoring for ADOS, CARS, and custom behavioral evaluation matrices." },
      { title: "Multidisciplinary Therapy Logs", description: "Shared clinical notes between speech language pathologists, OTs, and behavioral therapists." },
      { title: "Home Exercise & Parent Portal", description: "Interactive caregiver portal with video guidance for daily skill reinforcement." },
      { title: "Longitudinal Progress Charts", description: "Visual progress graphs tracking speech, motor skills, and social engagement over time." }
    ],
    valuePropositions: [
      { title: "Accelerated Therapy Outcomes", description: "Unified caregiver coordination improves child skill acquisition speed by 40%." },
      { title: "Standardized Scoring Accuracy", description: "Eliminates manual paper assessment errors in clinical evaluations." },
      { title: "Empowered Parent Participation", description: "Parents log home milestones with direct therapist feedback." },
      { title: "HIPAA Data Protection", description: "Encrypted clinical records accessible only by authorized care teams." },
      { title: "Multi-Specialty Alignment", description: "Speech, occupational, and behavioral therapists share a single chart." },
      { title: "Tele-Therapy Integration", description: "Remote video observation sessions with real-time clinical notes." }
    ],
    executionTitle: "Clinical Insights & Tracking",
    executionFeatures: [
      { title: "Assessment Automation", description: "Standardized clinical questionnaires, diagnostic scoring, and report generation." },
      { title: "Session Timer & Log", description: "Built-in session timer, activity tracking, and objective performance records." },
      { title: "Family Sync Mobile App", description: "Daily home habit logging, video guidance, and direct therapist messaging." },
      { title: "Clinical Cohort Insights", description: "Cohort progress trends, intervention efficacy metrics, and outcome charts." }
    ],
    techStack: ["React", "Redux Toolkit", "Chart.js", "Node.js", "Express"]
  },
  {
    id: "procuraone",
    title: "ProcuraOne",
    titleSystem: "ProcuraOne Enterprise Procurement System",
    category: "Supply Chain",
    categoryCaps: "SUPPLY CHAIN",
    description: "End-to-end procurement and vendor management system ensuring compliance, transparency, and auditability.",
    image: "/assets/images/projects/procuraone.jpg",
    slug: "procuraone",
    systemOverview: [
      "ProcuraOne modernizes corporate procurement by digitizing requisition approvals, vendor sourcing, contract lifecycle management, and invoice audit matching.",
      "The system enforces multi-tiered financial approval matrices, mitigating fraud risk and eliminating manual processing bottlenecks.",
      "ProcuraOne connects seamlessly with legacy ERP accounting ledgers for instant purchase order and ledger reconciliation.",
      "Built for enterprise procurement departments processing **thousands of vendor contracts** and purchase orders annually."
    ],
    modulesTitle: "Procurement & Vendor Modules",
    summaryNote: "ProcuraOne delivers total spend visibility and automated procurement workflows for modern enterprises.",
    capabilities: [
      { title: "Requisition & Approval Engine", description: "Dynamic threshold approval routing, budget checking, and automated PO generation." },
      { title: "Vendor Self-Service Portal", description: "Digital RFQs, bid submissions, compliance document storage, and scorecard ratings." },
      { title: "Automated 3-Way Matching", description: "Automated reconciliation between PO, goods receipt note (GRN), and vendor invoice." },
      { title: "Immutable Audit Trail", description: "Complete event logging for every financial approval, edit, and payment trigger." }
    ],
    valuePropositions: [
      { title: "100% Spend Visibility", description: "Centralized dashboard tracking purchase orders across all company divisions." },
      { title: "Fraud & Risk Mitigation", description: "Strict multi-tiered approval limits prevent unauthorized corporate spend." },
      { title: "70% Faster PO Approval", description: "Automated mobile signoffs reduce PO turnaround from days to hours." },
      { title: "Vendor Contract Savings", description: "Dynamic RFQ bidding encourages competitive pricing from suppliers." },
      { title: "Zero Invoice Discrepancies", description: "Automated 3-way matching prevents overpayments and duplicate invoices." },
      { title: "ERP Ledger Synchronization", description: "Direct integration with SAP, Oracle, and Microsoft Dynamics ledgers." }
    ],
    executionTitle: "Procurement Analytics & Compliance",
    executionFeatures: [
      { title: "Requisition Engine", description: "Item catalog selection, budget checking, and automated PO generation." },
      { title: "3-Way Matching Engine", description: "PO, goods receipt, and invoice automated reconciliation." },
      { title: "Audit Trail Logging", description: "Immutable event logs for every procurement action and approval." },
      { title: "Spend Category Analytics", description: "Category spend breakdown, savings metrics, and vendor performance." }
    ],
    techStack: ["React", "Tailwind CSS", "Enterprise API", "Node.js"]
  },
  {
    id: "solarsync",
    title: "SolarSync",
    titleSystem: "SolarSync IoT Telemetry & Analytics System",
    category: "Renewable Energy",
    categoryCaps: "RENEWABLE ENERGY",
    description: "Intelligent IoT monitoring system for tracking solar farm output, inverter performance, and asset health.",
    image: "/assets/images/projects/solarsync.jpg",
    slug: "solarsync",
    systemOverview: [
      "SolarSync is an IoT-connected energy telemetry and performance analytics application engineered for utility-scale solar arrays and commercial rooftop setups.",
      "The platform continuously evaluates string-level power output, solar irradiance, ambient temperature, and inverter conversion efficiency in real time.",
      "SolarSync utilizes machine learning models to detect thermal anomalies, panel degradation, and inverter failures before power generation drops.",
      "Designed for solar asset managers, IPPs, and operation & maintenance (O&M) teams handling **gigawatt-scale renewable portfolios**."
    ],
    modulesTitle: "Solar Telemetry & Performance Modules",
    summaryNote: "SolarSync maximizes solar plant yield and minimizes downtime through real-time IoT diagnostic feeds.",
    capabilities: [
      { title: "Real-Time IoT Telemetry", description: "Sub-second inverter string monitoring, weather sensor feeds, and live generation charts." },
      { title: "Yield & PR Calculation", description: "Continuous Performance Ratio (PR) tracking, temperature-loss modeling, and yield forecasts." },
      { title: "AI Anomaly Fault Map", description: "Machine learning classification of panel degradation, soiling loss, and inverter tripping." },
      { title: "Automated O&M Work Orders", description: "Automatic dispatch of field maintenance teams upon fault detection." }
    ],
    valuePropositions: [
      { title: "15% Power Yield Optimization", description: "Early fault detection prevents generation loss across solar arrays." },
      { title: "99.8% System Uptime", description: "Predictive inverter maintenance prevents catastrophic outages." },
      { title: "Automated Washing Schedules", description: "Soiling loss sensors trigger panel cleaning only when cost-effective." },
      { title: "PPA Revenue Protection", description: "Precise kWh generation accounting matches Power Purchase Agreement tariffs." },
      { title: "Remote Plant Diagnostics", description: "Engineers diagnose inverter issues remotely before traveling to the site." },
      { title: "Executive Portfolio Dashboards", description: "Consolidated generation performance across hundreds of solar sites." }
    ],
    executionTitle: "Solar Analytics & Reporting",
    executionFeatures: [
      { title: "IoT Fault Detection", description: "AI anomaly classification, inverter tripping alerts, and string fault maps." },
      { title: "Predictive O&M Schedules", description: "Soiling loss estimation and optimal panel cleaning schedule triggers." },
      { title: "PPA Revenue Forecast", description: "PPA tariff calculation, generation forecasts, and financial yield logs." },
      { title: "Asset Yield Reports", description: "Automated investor reports, daily generation summaries, and uptime KPIs." }
    ],
    techStack: ["React", "D3.js / Recharts", "Python", "MQTT / WebSockets"]
  }
];

export default projects;
