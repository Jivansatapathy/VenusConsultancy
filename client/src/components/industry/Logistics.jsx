import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Logistics Industry Page
 * Route: /industry/logistics-supply-chain
 */
const Logistics = () => {
  const industryData = getIndustryBySlug("logistics-supply-chain");
  return <IndustryPage data={industryData} />;
};

export default Logistics;

