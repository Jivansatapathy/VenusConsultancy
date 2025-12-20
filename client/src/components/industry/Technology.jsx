import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Technology Industry Page
 * Route: /industry/technology-software
 */
const Technology = () => {
  const industryData = getIndustryBySlug("technology-software");
  return <IndustryPage data={industryData} />;
};

export default Technology;

