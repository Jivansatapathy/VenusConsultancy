import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Real Estate Industry Page
 * Route: /industry/real-estate
 */
const RealEstate = () => {
  const industryData = getIndustryBySlug("real-estate");
  return <IndustryPage data={industryData} />;
};

export default RealEstate;

