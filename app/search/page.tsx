import { Metadata } from 'next';
import { StructuredData } from '../../components/StructuredData';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { searchTools } from '../../lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface SearchPageProps {
  searchParams: { q?: string };
}

export const metadata: Metadata = {
  title: 'Search LinkedIn Tools | Find Perfect Tool | LinkedGen Directory',
  description: 'Search our directory of LinkedIn lead generation tools. Find the perfect tool for your needs by name, category, or features.',
  keywords: [
    'LinkedIn tools search',
    'find LinkedIn tools',
    'LinkedIn tool finder',
    'search lead generation tools',
    'LinkedIn marketing tools search'
  ],
  openGraph: {
    title: 'Search LinkedIn Tools | LinkedGen Directory',
    description: 'Search our comprehensive directory of LinkedIn lead generation tools.',
    url: 'https://linkedgen.directory/search',
  },
  alternates: {
    canonical: '/search',
  },
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  
  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ name: 'Search', url: '/search' }]} className="mb-8" />
          
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Search LinkedIn Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find the perfect LinkedIn lead generation tool for your needs.
            </p>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <form action="/search" method="GET" className="flex gap-4">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for tools, features, or categories..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="mt-12 text-left bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Searches</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">By Category</h3>
                  <ul className="space-y-1">
                    <li><Link href="/category/profile-optimization" className="text-blue-600 hover:underline">Profile Optimization</Link></li>
                    <li><Link href="/category/content-generation" className="text-blue-600 hover:underline">Content Generation</Link></li>
                    <li><Link href="/category/prospecting-outreach" className="text-blue-600 hover:underline">Prospecting & Outreach</Link></li>
                    <li><Link href="/category/data-intelligence" className="text-blue-600 hover:underline">Data & Intelligence</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">By Feature</h3>
                  <ul className="space-y-1">
                    <li><Link href="/tools?q=free" className="text-blue-600 hover:underline">Free Tools</Link></li>
                    <li><Link href="/tools?q=automation" className="text-blue-600 hover:underline">Automation Tools</Link></li>
                    <li><Link href="/tools?q=chrome" className="text-blue-600 hover:underline">Chrome Extensions</Link></li>
                    <li><Link href="/tools?q=email" className="text-blue-600 hover:underline">Email Finding</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const searchResults = searchTools(query);
  const structuredData = {
    name: `Search Results for "${query}"`,
    description: `Found ${searchResults.length} tools matching "${query}" in our LinkedIn tools directory.`,
    numberOfItems: searchResults.length,
  };

  const breadcrumbItems = [
    { name: 'Search', url: '/search' },
    { name: query, url: `/search?q=${query}` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        
        <StructuredData type="WebPage" data={structuredData} />
        
        <header className="mb-8">
          <div className="max-w-2xl mx-auto">
            <form action="/search" method="GET" className="flex gap-4 mb-6">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search for tools, features, or categories..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Search
              </button>
            </form>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Search Results for "{query}"
              </h1>
              <p className="text-gray-600">
                Found {searchResults.length} tool{searchResults.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </header>

        {searchResults.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {searchResults.map((tool) => (
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
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No tools found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any tools matching "{query}". Try searching with different keywords.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Try searching for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/search?q=automation" className="text-blue-600 hover:underline">automation</Link>
                <Link href="/search?q=free" className="text-blue-600 hover:underline">free tools</Link>
                <Link href="/search?q=prospecting" className="text-blue-600 hover:underline">prospecting</Link>
                <Link href="/search?q=content" className="text-blue-600 hover:underline">content generation</Link>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link 
            href="/tools"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}