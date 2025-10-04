// server/src/scripts/seedCandidates.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Candidate from "../models/Candidate.js";

dotenv.config();

const sample = [
  {
    name: "Anita Shah",
    title: "Frontend Engineer",
    email: "anita@example.com",
    summary: "Frontend developer with 4 years experience building React apps.",
    location: "Bengaluru",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    experience: 4,
    avatar: "",
    remote: true,
  },
  {
    name: "Rahul Verma",
    title: "Backend Engineer",
    email: "rahul@example.com",
    summary: "Node.js and MongoDB engineer, worked on scalable APIs.",
    location: "Hyderabad",
    skills: ["Node.js", "Express", "MongoDB"],
    experience: 5,
    remote: false,
  },
  {
    name: "Sana Patel",
    title: "Fullstack Developer",
    email: "sana@example.com",
    summary: "Fullstack dev: React, Node, AWS. Loves product work.",
    location: "Mumbai",
    skills: ["React", "Node.js", "AWS"],
    experience: 3,
    remote: true,
  },
  {
    name: "Karan Joshi",
    title: "DevOps Engineer",
    email: "karan@example.com",
    summary: "DevOps with Terraform, Docker, Kubernetes experience.",
    location: "Pune",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform"],
    experience: 6,
    remote: false,
  },
  {
    name: "Meera Nair",
    title: "Data Engineer",
    email: "meera@example.com",
    summary: "Data pipelines, ETL, Python, and SQL experience.",
    location: "Chennai",
    skills: ["Python", "SQL", "Airflow"],
    experience: 4,
    remote: false,
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Candidate.deleteMany({});
    await Candidate.insertMany(sample);
    console.log("✅ Seeded candidates");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seed();
