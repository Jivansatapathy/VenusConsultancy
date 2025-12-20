import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Healthcare Industry Page
 * Route: /industry/healthcare-medical
 */
const Healthcare = () => {
  const industryData = getIndustryBySlug("healthcare-medical");
  return <IndustryPage data={industryData} />;
};

export default Healthcare;

