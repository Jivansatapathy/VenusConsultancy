// server/src/scripts/seedData.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "../config/index.js";
import Admin from "../models/Admin.js";
import Recruiter from "../models/Recruiter.js";
import Job from "../models/Job.js";
import connectDB from "../config/db.js";

const seedData = async () => {
  try {
    // Validate required environment variables for seeding
    if (!config.SEED_ADMIN_PASSWORD) {
      console.error("❌ CRITICAL SECURITY ERROR: SEED_ADMIN_PASSWORD is not configured!");
      console.error("🚨 For security reasons, seed scripts require explicit password configuration.");
      console.error("Please set SEED_ADMIN_PASSWORD environment variable before running seed script.");
      process.exit(1);
    }

    if (!config.SEED_RECRUITER_PASSWORD) {
      console.error("❌ CRITICAL SECURITY ERROR: SEED_RECRUITER_PASSWORD is not configured!");
      console.error("🚨 For security reasons, seed scripts require explicit password configuration.");
      console.error("Please set SEED_RECRUITER_PASSWORD environment variable before running seed script.");
      process.exit(1);
    }

    await connectDB();
    console.log("Connected to database");

    // Clear existing data
    await Admin.deleteMany({});
    await Recruiter.deleteMany({});
    await Job.deleteMany({});
    console.log("Cleared existing data");

    // Create Admin (password will be hashed by pre-save hook)
    const admin = new Admin({
      name: "System Administrator",
      email: "admin@venusconsultancy.com",
      password: config.SEED_ADMIN_PASSWORD, // Will be hashed by pre-save hook
      role: "admin"
    });
    await admin.save();
    console.log("✅ Created admin user: admin@venusconsultancy.com");

    // Create Recruiter (password will be hashed by pre-save hook)
    const recruiter = new Recruiter({
      name: "John Recruiter",
      email: "recruiter@venusconsultancy.com",
      password: config.SEED_RECRUITER_PASSWORD, // Will be hashed by pre-save hook
      role: "recruiter"
    });
    await recruiter.save();
    console.log("✅ Created recruiter user: recruiter@venusconsultancy.com");

    // Create sample jobs
    const sampleJobs = [
      {
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote",
        type: "Full-Time",
        description: "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building user-facing features and ensuring the best user experience across our web applications.",
        tags: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Frontend"],
        isActive: true
      },
      {
        title: "Backend Developer",
        department: "Engineering",
        location: "New York, NY",
        type: "Full-Time",
        description: "Join our backend team to build scalable and robust server-side applications. You'll work with modern technologies and contribute to our growing platform.",
        tags: ["Node.js", "Python", "MongoDB", "PostgreSQL", "API Development", "Backend"],
        isActive: true
      },
      {
        title: "UX/UI Designer",
        department: "Design",
        location: "San Francisco, CA",
        type: "Full-Time",
        description: "We're seeking a creative UX/UI Designer to help shape the user experience of our products. You'll work closely with product managers and developers to create intuitive and beautiful interfaces.",
        tags: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems", "UX"],
        isActive: true
      },
      {
        title: "Marketing Specialist",
        department: "Marketing",
        location: "Chicago, IL",
        type: "Full-Time",
        description: "Looking for a Marketing Specialist to drive our digital marketing initiatives. You'll be responsible for content creation, social media management, and campaign execution.",
        tags: ["Digital Marketing", "Social Media", "Content Creation", "SEO", "Analytics", "Marketing"],
        isActive: true
      },
      {
        title: "Data Analyst",
        department: "Analytics",
        location: "Austin, TX",
        type: "Full-Time",
        description: "Join our analytics team to help drive data-driven decisions. You'll work with large datasets, create reports, and provide insights to support business growth.",
        tags: ["SQL", "Python", "R", "Tableau", "Statistics", "Data Analysis"],
        isActive: true
      },
      {
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Seattle, WA",
        type: "Full-Time",
        description: "We need a DevOps Engineer to help us scale our infrastructure and improve our deployment processes. You'll work with cloud technologies and automation tools.",
        tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Infrastructure", "DevOps"],
        isActive: true
      },
      {
        title: "Product Manager",
        department: "Product",
        location: "Boston, MA",
        type: "Full-Time",
        description: "Looking for a Product Manager to lead product strategy and development. You'll work with cross-functional teams to deliver features that meet user needs.",
        tags: ["Product Strategy", "Agile", "User Stories", "Roadmapping", "Stakeholder Management", "Product"],
        isActive: true
      },
      {
        title: "Sales Representative",
        department: "Sales",
        location: "Miami, FL",
        type: "Full-Time",
        description: "Join our sales team to help grow our business. You'll be responsible for building relationships with clients and driving revenue growth.",
        tags: ["Sales", "CRM", "Lead Generation", "Client Relations", "Negotiation", "Business Development"],
        isActive: true
      },
      {
        title: "Software Engineering Intern",
        department: "Engineering",
        location: "Remote",
        type: "Internship",
        description: "Great opportunity for students to gain real-world experience in software development. You'll work on actual projects and learn from experienced developers.",
        tags: ["Learning", "Mentorship", "Software Development", "Internship", "Growth", "Education"],
        isActive: true
      },
      {
        title: "Customer Success Manager",
        department: "Customer Success",
        location: "Denver, CO",
        type: "Full-Time",
        description: "Help our customers succeed by providing excellent support and guidance. You'll work closely with clients to ensure they get the most value from our products.",
        tags: ["Customer Support", "Account Management", "Communication", "Problem Solving", "Client Success", "Support"],
        isActive: true
      }
    ];

    for (const jobData of sampleJobs) {
      const job = new Job(jobData);
      await job.save();
    }
    console.log(`✅ Created ${sampleJobs.length} sample jobs`);

    console.log("\n🎉 Seed data created successfully!");
    console.log("\nLogin credentials:");
    console.log("Admin: admin@venusconsultancy.com");
    console.log("Recruiter: recruiter@venusconsultancy.com");
    console.log("\n⚠️  Passwords are securely hashed and stored.");
    console.log("Use the SEED_ADMIN_PASSWORD and SEED_RECRUITER_PASSWORD environment variables to login.");

  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

// Run the seed function
seedData();
