import { Metadata } from 'next';
import { StructuredData } from '../../../components/StructuredData';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { getCategoryBySlug, getToolsByCategory } from '../../../lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LinkedIn Profile Optimization Tools | Best Tools for 2025 | LinkedGen Directory',
  description: 'Discover the best LinkedIn profile optimization tools to enhance your professional presence. Compare features, pricing, and honest reviews of top tools. Find tools to optimize headlines, summaries, and profile sections.',
  keywords: [
    'LinkedIn profile optimization tools',
    'LinkedIn profile enhancement',
    'LinkedIn headline optimizer',
    'LinkedIn summary generator',
    'LinkedIn profile manager',
    'LinkedIn personal branding tools',
    'LinkedIn SEO optimization',
    'LinkedIn profile analyzer'
  ],
  openGraph: {
    title: 'LinkedIn Profile Optimization Tools | Best Tools for 2025',
    description: 'Compare top LinkedIn profile optimization tools with honest reviews, speed tests, and feature comparisons. Enhance your LinkedIn presence today.',
    url: 'https://linkedgen.directory/category/profile-optimization',
    images: [
      {
        url: '/og-profile-optimization.jpg',
        width: 1200,
        height: 630,
        alt: 'LinkedIn Profile Optimization Tools',
      },
    ],
  },
  twitter: {
    title: 'LinkedIn Profile Optimization Tools | LinkedGen Directory',
    description: 'Find the best tools to optimize your LinkedIn profile and enhance your professional brand.',
    images: ['/og-profile-optimization.jpg'],
  },
  alternates: {
    canonical: '/category/profile-optimization',
  },
};

export default function ProfileOptimizationCategory() {
  const category = getCategoryBySlug('profile-optimization');
  const tools = getToolsByCategory('profile-optimization');
  
  if (!category) {
    return <div>Category not found</div>;
  }

  const structuredData = {
    name: category.name,
    description: category.description,
    numberOfItems: tools.length,
    tools: tools
  };

  const breadcrumbItems = [
    { name: category.name, url: `/category/${category.slug}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        
        <StructuredData type="Directory" data={structuredData} />
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category.description}
          </p>
          <p className="text-lg text-gray-500 mt-2">
            {tools.length} tools available
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What Are Profile Optimization Tools?</h2>
            <p className="text-gray-600 mb-4">
              LinkedIn profile optimization tools help you create compelling profiles that attract recruiters, 
              clients, and opportunities. They provide AI-powered suggestions, templates, and analytics to 
              improve your professional branding.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>AI-powered headline generation</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Summary optimization</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Profile completeness scoring</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Keyword optimization</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Features to Compare</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center"><span className="text-blue-500 mr-2">◆</span>Headline analyzer</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">◆</span>Summary generator</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">◆</span>Skills section optimizer</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">◆</span>Profile audit reports</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">◆</span>SEO optimization</li>
              <li className="flex items-center"><span className="text-blue-500 mr-2">◆</span>A/B testing capabilities</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Top Categories</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Headline Optimizers</span>
                <span className="text-sm text-gray-500">8 tools</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Summary Generators</span>
                <span className="text-sm text-gray-500">5 tools</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Profile Auditors</span>
                <span className="text-sm text-gray-500">4 tools</span>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Profile Optimization Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">First Impressions Count</h3>
              <p className="text-gray-600">
                Your LinkedIn profile is often the first impression recruiters and potential clients have of you. 
                Optimized profiles get 14x more profile views and 9x more connection requests.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Visibility</h3>
              <p className="text-gray-600">
                LinkedIn's algorithm favors optimized profiles. Proper keyword placement and completeness scores 
                dramatically improve your visibility in search results.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Credibility</h3>
              <p className="text-gray-600">
                A well-optimized profile establishes authority and expertise in your field, leading to more 
                opportunities, inbound leads, and career advancement.
              </p>
            </div>
          </div>
        </section>

        {tools.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div key={tool.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-lg">{tool.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                      <span className="text-sm text-gray-500">{tool.pricingModel}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{tool.shortDescription}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">{tool.rating}</span>
                      <span className="text-sm text-gray-400 ml-1">({tool.reviewCount})</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {tool.pricingModel === 'free' ? 'Free' : 
                       tool.pricingModel === 'one-time' ? `$${tool.priceMin}` : 
                       `$${tool.priceMin}/mo`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Speed: {tool.speedScore}/10
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Safe: {tool.tosSafetyRating}/5
                    </span>
                  </div>
                  <Link 
                    href={`/tools/${tool.slug}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}