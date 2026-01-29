'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '../../../lib/api-service';
import { notFound } from 'next/navigation';
import { StructuredData } from '../../../components/StructuredData';
import { Breadcrumbs } from '../../../components/Breadcrumbs';

interface ToolPageProps {
  params: { slug: string };
}

export default function ToolPage({ params }: ToolPageProps) {
  const [tool, setTool] = useState<any>(null);
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadToolData() {
      try {
        const [toolResponse, alternativesResponse] = await Promise.all([
          apiService.getToolBySlug(params.slug),
          apiService.getToolsByCategory('') // We'll need to get category from tool first
        ]);
        
        if (toolResponse.data) {
          setTool(toolResponse.data);
          
          // Get alternatives from same category
          if (toolResponse.data?.categorySlug) {
            const altResponse = await apiService.getToolsByCategory(toolResponse.data.categorySlug);
            if (altResponse.data) {
              const filteredAlternatives = altResponse.data
                .filter((t: any) => t.slug !== params.slug)
                .slice(0, 6);
              setAlternatives(filteredAlternatives);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load tool data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadToolData();
  }, [params.slug]);
  
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading tool details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!tool) {
    notFound();
  }

  
  
  const structuredData = {
    name: tool.name,
    description: tool.shortDescription,
    url: `https://linkedgen.directory/tools/${tool.slug}`,
    pricing: tool.pricingModel === 'free' ? 'Free' : `$${tool.priceMin}`,
    rating: tool.rating,
    reviewCount: tool.reviewCount,
    features: Object.entries(tool.features)
      .filter(([_, value]) => value)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim()),
    review: tool.humanReview,
    reviewRating: tool.rating,
    reviewBody: tool.humanReview.substring(0, 200) + '...'
  };

  const breadcrumbItems = [
    { name: 'Tools', url: '/tools' },
    { name: tool.category, url: `/category/${tool.categorySlug}` },
    { name: tool.name, url: `/tools/${tool.slug}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        
        <StructuredData type="Product" data={structuredData} />
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-2xl">{tool.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
                  <p className="text-gray-600 mb-3">{tool.shortDescription}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-lg font-semibold ml-1">{tool.rating}</span>
                      <span className="text-gray-500 ml-1">({tool.reviewCount} reviews)</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {tool.pricingModel === 'free' ? 'Free' : 
                       tool.pricingModel === 'one-time' ? `$${tool.priceMin}` : 
                       `$${tool.priceMin}-${tool.priceMax}/mo`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Speed Score</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(tool.speedScore / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{tool.speedScore}/10</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Safety Rating</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(tool.tosSafetyRating / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{tool.tosSafetyRating}/5</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{tool.fullDescription}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(tool.features)
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <div key={key} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Pros</h2>
                  <ul className="space-y-2">
                    {tool.pros.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Cons</h2>
                  <ul className="space-y-2">
                    {tool.cons.map((con: string, index: number) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <span className="text-red-500 mr-2 mt-1">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Honest Review</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">{tool.humanReview}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-2">Best For</h3>
                  <p className="text-green-700">{tool.bestFor}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-800 mb-2">Avoid If</h3>
                  <p className="text-red-700">{tool.avoidIf}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Pricing Model</span>
                  <p className="font-medium capitalize">{tool.pricingModel.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium">{tool.category}</p>
                </div>
                {tool.exclusiveDeal && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-yellow-800">🎯 Exclusive Deal</p>
                    <p className="text-sm text-yellow-700">{tool.exclusiveDeal}</p>
                  </div>
                )}
              </div>
              <a 
                href={tool.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Visit {tool.name}
              </a>
            </div>

            {alternatives.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternatives</h3>
                <div className="space-y-3">
                  {alternatives.map((alt) => (
                    <Link 
                      key={alt.id}
                      href={`/tools/${alt.slug}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{alt.name}</h4>
                          <p className="text-sm text-gray-500">{alt.pricingModel}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-yellow-500">★ {alt.rating}</div>
                          <div className="text-xs text-gray-500">{alt.reviewCount} reviews</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}