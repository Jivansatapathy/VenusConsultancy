import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIndustryBySlug } from "../data/industryData/index.js";
import IndustryPage from "../components/industry/IndustryPage";

/**
 * Industry Page - Uses the reusable IndustryPage template
 * Route: /industry/:slug
 */
const Industry = () => {
  const { slug } = useParams();
  const industryData = getIndustryBySlug(slug);

  // Update document title and meta tags for SEO
  useEffect(() => {
    if (industryData && industryData.seo) {
      document.title = industryData.seo.title || "Industry Page | Venus Consultancy";
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && industryData.seo.description) {
        metaDescription.setAttribute("content", industryData.seo.description);
      } else if (industryData.seo.description) {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = industryData.seo.description;
        document.getElementsByTagName("head")[0].appendChild(meta);
      }
    } else {
      document.title = "Industry Page Not Found | Venus Consultancy";
    }
  }, [industryData]);

  return <IndustryPage data={industryData} />;
};

export default Industry;

