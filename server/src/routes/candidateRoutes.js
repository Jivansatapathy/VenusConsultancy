// server/src/routes/candidateRoutes.js
import express from "express";
import Candidate from "../models/Candidate.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Create candidate — ADMIN only
router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/*
  GET /api/candidates
  - accessible to authenticated recruiters and admins
*/
router.get("/", requireAuth, requireRole("admin", "recruiter"), async (req, res) => {
  try {
    // existing filter/pagination code (unchanged)
    const {
      q = "",
      location = "",
      skills = "",
      expMin = 0,
      expMax = 100,
      page = 1,
      limit = 8,
      sort = "relevance",
      remote = "any",
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageLimit = Math.min(50, parseInt(limit, 10) || 8);

    const filters = {};

    if (q && q.trim()) {
      const safeQ = q.trim();
      filters.$or = [
        { name: { $regex: safeQ, $options: "i" } },
        { title: { $regex: safeQ, $options: "i" } },
        { summary: { $regex: safeQ, $options: "i" } },
      ];
    }

    if (location && location.trim()) {
      const loc = location.trim();
      if (/remote/i.test(loc)) filters.remote = true;
      else filters.location = { $regex: loc, $options: "i" };
    } else if (remote === "remote") filters.remote = true;
    else if (remote === "onsite") filters.remote = false;

    if (skills && skills.trim()) {
      const skillList = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (skillList.length) filters.skills = { $all: skillList };
    }

    const minExp = Number(expMin) || 0;
    const maxExp = Number(expMax) || 100;
    filters.experience = { $gte: minExp, $lte: maxExp };

    let sortObj = {};
    if (sort === "latest") sortObj = { createdAt: -1 };
    else if (sort === "exp-desc") sortObj = { experience: -1 };
    else if (sort === "exp-asc") sortObj = { experience: 1 };
    else sortObj = { createdAt: -1 };

    const total = await Candidate.countDocuments(filters);

    const candidates = await Candidate.find(filters)
      .sort(sortObj)
      .skip((pageNum - 1) * pageLimit)
      .limit(pageLimit)
      .populate("appliedJob")
      .select("-ssn -personalEmail");

    const pages = Math.max(1, Math.ceil(total / pageLimit));

    res.json({
      candidates,
      total,
      page: pageNum,
      pages,
    });
  } catch (err) {
    console.error("GET /api/candidates error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
