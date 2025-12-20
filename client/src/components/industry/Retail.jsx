import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Retail Industry Page
 * Route: /industry/retail-consumer
 */
const Retail = () => {
  const industryData = getIndustryBySlug("retail-consumer");
  return <IndustryPage data={industryData} />;
};

export default Retail;

