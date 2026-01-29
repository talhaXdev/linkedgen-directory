import { FC } from 'react';

interface StructuredDataProps {
  type: 'WebPage' | 'WebSite' | 'Directory' | 'Review' | 'Product' | 'BreadcrumbList';
  data: Record<string, any>;
}

export const StructuredData: FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "LinkedGen Directory",
          "alternateName": "LinkedIn Lead Generation Tools Directory",
          "url": "https://linkedgen.directory",
          "description": "Compare 80+ LinkedIn lead gen tools with honest verdicts, speed tests, and feature matrices. Find the perfect tool for LinkedIn marketing and sales.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://linkedgen.directory/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "LinkedGen Directory",
            "url": "https://linkedgen.directory"
          }
        };

      case 'Directory':
        return {
          "@context": "https://schema.org",
          "@type": "Directory",
          "name": data.name || "LinkedIn Lead Generation Tools Directory",
          "description": data.description || "Comprehensive directory of LinkedIn lead generation tools with reviews and comparisons",
          "url": "https://linkedgen.directory",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": data.numberOfItems || 80,
            "itemListElement": data.tools?.map((tool: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "SoftwareApplication",
                "name": tool.name,
                "description": tool.description,
                "url": tool.url,
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": tool.pricing ? {
                  "@type": "Offer",
                  "price": tool.pricing,
                  "priceCurrency": "USD"
                } : undefined,
                "aggregateRating": tool.rating ? {
                  "@type": "AggregateRating",
                  "ratingValue": tool.rating,
                  "reviewCount": tool.reviewCount,
                  "bestRating": "5",
                  "worstRating": "1"
                } : undefined
              }
            })) || []
          }
        };

      case 'Product':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": data.name,
          "description": data.description,
          "url": data.url,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": data.pricing ? {
            "@type": "Offer",
            "price": data.pricing,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          } : undefined,
          "aggregateRating": data.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating,
            "reviewCount": data.reviewCount || 1,
            "bestRating": "5",
            "worstRating": "1"
          } : undefined,
          "review": data.review ? {
            "@type": "Review",
            "author": {
              "@type": "Organization",
              "name": "LinkedGen Directory"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": data.reviewRating,
              "bestRating": "5",
              "worstRating": "1"
            },
            "reviewBody": data.reviewBody
          } : undefined,
          "featureList": data.features || []
        };

      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.breadcrumbs?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          })) || []
        };

      case 'Review':
        return {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": data.toolName,
            "applicationCategory": "BusinessApplication"
          },
          "author": {
            "@type": "Organization",
            "name": "LinkedGen Directory"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": data.rating,
            "bestRating": "5",
            "worstRating": "1"
          },
          "reviewBody": data.reviewBody,
          "publisher": {
            "@type": "Organization",
            "name": "LinkedGen Directory"
          },
          "datePublished": data.datePublished || new Date().toISOString()
        };

      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": data.name || "LinkedGen Directory",
          "description": data.description || "LinkedIn Lead Generation Tools Directory"
        };
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};