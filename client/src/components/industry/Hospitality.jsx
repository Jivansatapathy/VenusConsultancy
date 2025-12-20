import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Hospitality Industry Page
 * Route: /industry/hospitality-tourism
 */
const Hospitality = () => {
  const industryData = getIndustryBySlug("hospitality-tourism");
  return <IndustryPage data={industryData} />;
};

export default Hospitality;

