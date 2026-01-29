import { Metadata } from 'next';
import { StructuredData } from '../../../components/StructuredData';
import { Breadcrumbs } from '../../../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'LinkedIn Sales Navigator vs LinkedIn Helper | 2025 Comparison | LinkedGen Directory',
  description: 'Comprehensive comparison: LinkedIn Sales Navigator vs LinkedIn Helper. Compare features, pricing, pros & cons, and find the best LinkedIn prospecting tool for your needs.',
  keywords: [
    'LinkedIn Sales Navigator vs LinkedIn Helper',
    'LinkedIn Sales Navigator alternative',
    'LinkedIn Helper review',
    'LinkedIn prospecting tools comparison',
    'LinkedIn Sales Navigator pricing',
    'LinkedIn Helper features',
    'best LinkedIn prospecting tool',
    'LinkedIn lead generation comparison'
  ],
  openGraph: {
    title: 'LinkedIn Sales Navigator vs LinkedIn Helper | 2025 Comparison',
    description: 'Detailed comparison of LinkedIn Sales Navigator vs LinkedIn Helper. Features, pricing, pros & cons to help you choose the best tool.',
    url: 'https://linkedgen.directory/compare/linkedin-sales-navigator-vs-linkedin-helper',
    images: [
      {
        url: '/og-sales-navigator-vs-helper.jpg',
        width: 1200,
        height: 630,
        alt: 'LinkedIn Sales Navigator vs LinkedIn Helper Comparison',
      },
    ],
  },
  twitter: {
    title: 'LinkedIn Sales Navigator vs LinkedIn Helper | 2025 Comparison',
    description: 'Which LinkedIn prospecting tool is better? Compare features, pricing, and real user reviews.',
    images: ['/og-sales-navigator-vs-helper.jpg'],
  },
  alternates: {
    canonical: '/compare/linkedin-sales-navigator-vs-linkedin-helper',
  },
};

export default function SalesNavigatorVsHelper() {
  const structuredData = {
    name: 'LinkedIn Sales Navigator vs LinkedIn Helper Comparison',
    description: 'Detailed comparison of LinkedIn Sales Navigator and LinkedIn Helper for prospecting and lead generation.',
  };

  const breadcrumbItems = [
    { name: 'Compare', url: '/compare' },
    { name: 'Sales Navigator vs Helper', url: '/compare/linkedin-sales-navigator-vs-linkedin-helper' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />
        
        <StructuredData type="WebPage" data={structuredData} />
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LinkedIn Sales Navigator vs LinkedIn Helper
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive comparison of two leading LinkedIn prospecting tools. 
            Find out which one offers better features, pricing, and value for your business.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">LinkedIn Sales Navigator</h2>
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">$99.99</div>
                <div className="text-gray-600">per month (annual billing)</div>
              </div>
              <div className="text-left space-y-2">
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>Official LinkedIn tool</div>
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>Advanced search filters</div>
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>Lead recommendations</div>
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>CRM integration</div>
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>InMail credits</div>
                <div className="flex items-center"><span className="text-red-500 mr-2">✗</span>Expensive for small teams</div>
                <div className="flex items-center"><span className="text-red-500 mr-2">✗</span>Limited automation</div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">LinkedIn Helper</h2>
              <div className="bg-green-50 rounded-lg p-6 mb-4">
                <div className="text-3xl font-bold text-green-600 mb-2">$39.99</div>
                <div className="text-gray-600">per month (annual billing)</div>
              </div>
              <div className="text-left space-y-2">
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>Affordable pricing</div>
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>Advanced automation</div>
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>Message templates</div>
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>Profile data extraction</div>
                <div className="flex items-center"><span className="text-green-500 mr-2">✓</span>Multi-account support</div>
                <div className="flex items-center"><span className="text-red-500 mr-2">✗</span>Third-party tool</div>
                <div className="flex items-center"><span className="text-red-500 mr-2">✗</span>Potential ToS risks</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Feature Comparison</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Feature</th>
                  <th className="text-center py-2">Sales Navigator</th>
                  <th className="text-center py-2">LinkedIn Helper</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Advanced Search</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Lead Recommendations</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Automation</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">CRM Integration</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Data Export</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">InMail Credits</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">❌</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Use Case Analysis</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Choose Sales Navigator if:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• You need official LinkedIn integration</li>
                  <li>• Budget is not a constraint</li>
                  <li>• You value data accuracy and compliance</li>
                  <li>• You need InMail credits for outreach</li>
                  <li>• You're part of a large sales team</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Choose LinkedIn Helper if:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• You need advanced automation features</li>
                  <li>• Budget is a primary concern</li>
                  <li>• You need data extraction capabilities</li>
                  <li>• You manage multiple LinkedIn accounts</li>
                  <li>• You're a small business or freelancer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Verdict</h3>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              After extensive testing and analysis, <strong>LinkedIn Sales Navigator</strong> is the winner for 
              enterprises and teams that prioritize compliance and official integration, while 
              <strong>LinkedIn Helper</strong> offers better value for small businesses and freelancers who need 
              advanced automation features at a lower cost.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Key Takeaway:</strong> If you're a large enterprise with compliance requirements, 
              go with Sales Navigator. If you're a small business looking for cost-effective automation, 
              LinkedIn Helper provides better ROI.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important:</strong> LinkedIn Helper is a third-party tool that may violate LinkedIn's 
                Terms of Service. Use at your own risk and consider the compliance implications for your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}