import { Metadata } from 'next';
import { tools, categories } from '../../lib/data';
import { StructuredData } from '../../components/StructuredData';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All LinkedIn Tools | Complete Directory | LinkedGen Directory',
  description: 'Browse all {tools.length} LinkedIn lead generation tools. Filter by category, pricing, and features. Find the perfect tool for your LinkedIn marketing strategy.',
  keywords: [
    'LinkedIn tools directory',
    'complete LinkedIn tools list',
    'LinkedIn marketing tools',
    'LinkedIn lead generation software',
    'LinkedIn automation tools',
    'LinkedIn prospecting tools'
  ],
  openGraph: {
    title: 'All LinkedIn Tools | Complete Directory',
    description: 'Browse our complete directory of LinkedIn lead generation tools with reviews and comparisons.',
    url: 'https://linkedgen.directory/tools',
  },
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsPage() {
  const structuredData = {
    name: 'All LinkedIn Tools Directory',
    description: 'Complete directory of LinkedIn lead generation tools with reviews and comparisons.',
    numberOfItems: tools.length,
    tools: tools
  };

  const breadcrumbItems = [
    { name: 'Tools', url: '/tools' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        
        <StructuredData type="Directory" data={structuredData} />
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All LinkedIn Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our complete directory of {tools.length} LinkedIn lead generation tools. 
            Filter by category, pricing, and features to find the perfect solution.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Filter by Category</h2>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/tools"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                  All ({tools.length})
                </Link>
                {categories.map((category) => (
                  <Link 
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                  >
                    {category.name} ({category.toolCount})
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-lg">{tool.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <span className="text-sm text-gray-500">{tool.category}</span>
                </div>
                {tool.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.shortDescription}</p>
              
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
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded capitalize">
                  {tool.pricingModel}
                </span>
              </div>

              <div className="flex gap-2">
                <Link 
                  href={`/tools/${tool.slug}`}
                  className="flex-1 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </Link>
                <a 
                  href={tool.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm"
                >
                  Visit
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Showing all {tools.length} LinkedIn tools. Compare features, pricing, and reviews to find the perfect tool for your needs.
          </p>
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}