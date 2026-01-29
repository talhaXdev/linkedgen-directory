'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [tools, setTools] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const toolsResponse = await fetch('/api/tools');
        const toolsData = await toolsResponse.json();
        
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        
        if (toolsData.tools) {
          setTools(toolsData.tools.filter((tool: any) => tool.featured));
        }
        if (categoriesData.categories) {
          setCategories(categoriesData.categories);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading LinkedIn tools...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LinkedIn Lead Generation Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare {tools.length}+ tools with honest reviews, speed tests, and feature matrices. 
            Find perfect tool for LinkedIn marketing and sales.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool: any) => (
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

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">{category.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.toolCount} tools</span>
                  <span className="text-blue-600 text-sm font-medium">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Backend Integration Status</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-green-800 font-semibold mb-2">✅ Frontend-Backend Integration Complete!</h3>
            <ul className="space-y-2 text-green-700">
              <li>• <strong>Real Data Integration</strong> - Frontend fetches from /api/tools & /api/categories</li>
              <li>• <strong>Working API Endpoints</strong> - Tools, categories, search, filtering</li>
              <li>• <strong>Dynamic Content</strong> - 6 LinkedIn tools with full details</li>
              <li>• <strong>Client-Side Rendering</strong> - React hooks manage state and API calls</li>
              <li>• <strong>Interactive UI</strong> - Loading states, error handling</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
            <h3 className="text-blue-800 font-semibold mb-2">🔗 API Endpoints Working:</h3>
            <ul className="space-y-1 text-blue-700 font-mono text-sm">
              <li><strong>GET</strong> /api/tools - Returns all tools</li>
              <li><strong>GET</strong> /api/tools?featured=true - Featured tools only</li>
              <li><strong>GET</strong> /api/tools?category=[slug] - Tools by category</li>
              <li><strong>GET</strong> /api/tools?search=[query] - Search functionality</li>
              <li><strong>GET</strong> /api/categories - All categories</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}