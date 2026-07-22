export type PortfolioData = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  objective: string;
  education: { degree: string; institution: string; score: string }[];
  technicalSkills: string[];
  software: { name: string; level: number }[];
  experience: { title: string; company: string; period: string; tasks: string[] }[];
  projects: { title: string; desc: string }[];
  equipment: string[];
  languages: string[];
};

export const defaultPortfolio: PortfolioData = {
  name: "Akash Dinkar Chavan",
  title: "GIS Analyst & Geospatial Professional",
  location: "Karad, Maharashtra, India",
  email: "chavanakash052@gmail.com",
  phone: "+91 9762667194",
  objective:
    "To obtain a position in a progressive organization where I can use my GIS, remote sensing, and surveying skills to support spatial data management, mapping, and infrastructure planning.",
  education: [
    { degree: "PG Diploma in Geoinformatics", institution: "Institute of Technical Education, Karad", score: "" },
    { degree: "M.A./M.Sc Geography", institution: "", score: "74.60%" },
    { degree: "B.A Geography", institution: "", score: "60.78%" },
    { degree: "ITI Surveyor", institution: "", score: "61.06%" },
    { degree: "HSC", institution: "", score: "55.23%" },
    { degree: "SSC", institution: "", score: "60.00%" },
  ],
  technicalSkills: [
    "Georeferencing & Digitization",
    "Geodatabase & Shapelayer Creation",
    "Geoprocessing & Spatial Analysis",
    "Map Layout & Cartography",
    "Attribute Data Management",
    "Topology Correction",
  ],
  software: [
    { name: "ArcGIS", level: 90 },
    { name: "QGIS", level: 85 },
    { name: "Google Earth Pro", level: 80 },
    { name: "AutoCAD", level: 75 },
  ],
  experience: [
    {
      title: "GIS Analyst",
      company: "Quantox Technologies Pvt. Ltd.",
      period: "Sep 2024 – Present",
      tasks: [
        "Parcel digitization & infrastructure mapping",
        "Property taxation GIS database creation",
        "Road, river & utilities mapping",
        "Map layout and spatial data management",
      ],
    },
    {
      title: "GIS Data Operator",
      company: "JMK Infosoft Solutions",
      period: "Feb 2024 – Jul 2024",
      tasks: [
        "Drone survey property digitization",
        "Attribute & area calculation",
        "Cadastral correction & georeferencing",
      ],
    },
    {
      title: "GIS Executive",
      company: "Genesys International Corp. Ltd.",
      period: "Oct 2022 – Feb 2024",
      tasks: [
        "Google mapping & road network planning",
        "SHP & geodatabase management",
        "Spatial data validation & analysis",
        "Map visualization & stakeholder delivery",
      ],
    },
  ],
  projects: [
    { title: "SVAMITVA Drone Survey Mapping", desc: "Comprehensive drone-based property mapping for rural land records under the SVAMITVA scheme." },
    { title: "Property Taxation GIS Projects", desc: "Created geospatial databases for municipal property taxation and infrastructure planning." },
    { title: "3D City Jaipur LiDAR Survey", desc: "Participated in large-scale LiDAR point cloud processing for 3D city model generation." },
    { title: "Ground Control Point (GCP) Collection", desc: "Field GCP acquisition using GNSS receivers for accurate georeferencing of aerial imagery." },
    { title: "Drone Survey Mapping of Dams & Assets", desc: "High-resolution drone mapping for dam inspection and asset inventory management." },
  ],
  equipment: ["Leica GS16", "Trimble R12", "LiDAR Pegasus System", "GNSS Survey Equipment"],
  languages: ["Marathi", "Hindi", "English"],
};
