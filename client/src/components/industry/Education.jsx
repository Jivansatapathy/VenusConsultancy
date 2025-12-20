import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Education Industry Page
 * Route: /industry/education-training
 */
const Education = () => {
  const industryData = getIndustryBySlug("education-training");
  return <IndustryPage data={industryData} />;
};

export default Education;

