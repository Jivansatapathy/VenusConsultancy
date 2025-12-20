/**
 * Industry Data Index
 * 
 * This file exports all industry data from individual files.
 * Each industry has its own file for better organization and maintainability.
 */

import technology from "./technology.js";
import financeAccounting from "./finance-accounting.js";
import automotiveEv from "./automotive-ev.js";
import aerospace from "./aerospace.js";
import autotech from "./autotech.js";
import customerServiceTechSupport from "./customer-service-tech-support.js";
import cSuiteExecutive from "./c-suite-executive.js";
import clinicalResearch from "./clinical-research.js";
import ecommerceSupplyChain from "./ecommerce-supply-chain.js";
import manufacturingSkilledTrade from "./manufacturing-skilled-trade.js";
import scientificOutsourcing from "./scientific-outsourcing.js";
import lightIndustrial from "./light-industrial.js";
import officeClerical from "./office-clerical.js";
import outsourcing from "./outsourcing.js";
import rpo from "./rpo.js";
import engineering from "./engineering.js";

// Combine all industries into a single object
const industryData = {
  [technology.slug]: technology,
  [financeAccounting.slug]: financeAccounting,
  [automotiveEv.slug]: automotiveEv,
  [aerospace.slug]: aerospace,
  [autotech.slug]: autotech,
  [customerServiceTechSupport.slug]: customerServiceTechSupport,
  [cSuiteExecutive.slug]: cSuiteExecutive,
  [clinicalResearch.slug]: clinicalResearch,
  [ecommerceSupplyChain.slug]: ecommerceSupplyChain,
  [manufacturingSkilledTrade.slug]: manufacturingSkilledTrade,
  [scientificOutsourcing.slug]: scientificOutsourcing,
  [lightIndustrial.slug]: lightIndustrial,
  [officeClerical.slug]: officeClerical,
  [outsourcing.slug]: outsourcing,
  [rpo.slug]: rpo,
  [engineering.slug]: engineering,
};

// Helper function to get industry by slug
export const getIndustryBySlug = (slug) => {
  return industryData[slug] || null;
};

// Helper function to get all industries
export const getAllIndustries = () => {
  return Object.values(industryData);
};

// Helper function to get industry IDs
export const getIndustryIds = () => {
  return Object.keys(industryData);
};

export default industryData;

