import { FC } from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { StructuredData } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const breadcrumbSchema = {
    breadcrumbs: [
      { name: 'Home', url: 'https://linkedgen.directory' },
      ...items
    ]
  };

  return (
    <>
      <StructuredData type="BreadcrumbList" data={breadcrumbSchema} />
      <nav 
        aria-label="Breadcrumb navigation"
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      >
        <Link 
          href="/" 
          className="flex items-center hover:text-blue-600 transition-colors"
          aria-label="Navigate to homepage"
        >
          <Home className="w-4 h-4" />
        </Link>
        
        {items.map((item, index) => (
          <div key={item.url} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.url} 
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};