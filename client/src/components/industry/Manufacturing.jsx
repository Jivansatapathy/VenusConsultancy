import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Manufacturing Industry Page
 * Route: /industry/manufacturing-production
 */
const Manufacturing = () => {
  const industryData = getIndustryBySlug("manufacturing-production");
  return <IndustryPage data={industryData} />;
};

export default Manufacturing;

