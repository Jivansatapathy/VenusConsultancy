import React from "react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "../../data/industryData/index.js";

/**
 * Sales Industry Page
 * Route: /industry/sales-business
 */
const Sales = () => {
  const industryData = getIndustryBySlug("sales-business");
  return <IndustryPage data={industryData} />;
};

export default Sales;

