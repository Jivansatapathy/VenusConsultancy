import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Finance Industry Page
 * Route: /industry/finance-banking
 */
const Finance = () => {
  const industryData = getIndustryBySlug("finance-banking");
  return <IndustryPage data={industryData} />;
};

export default Finance;

