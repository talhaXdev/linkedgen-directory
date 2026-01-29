// API service functions for fetching data from backend
export interface Tool {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  websiteUrl: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  pricingModel: 'free' | 'freemium' | 'subscription' | 'one-time';
  priceMin: number | null;
  priceMax: number | null;
  currency: 'USD' | 'EUR' | 'GBP';
  speedScore: number;
  tosSafetyRating: number;
  rating: number;
  reviewCount: number;
  features: {
    profileOptimization: boolean;
    contentGeneration: boolean;
    prospecting: boolean;
    emailFinding: boolean;
    automation: boolean;
    chromeExtension: boolean;
    apiAvailable: boolean;
    freeTier: boolean;
    oneTimePricing: boolean;
  };
  pros: string[];
  cons: string[];
  humanReview: string;
  bestFor: string;
  avoidIf: string;
  featured: boolean;
  sponsored: boolean;
  exclusiveDeal?: string;
  affiliateLink: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  toolCount: number;
}

export interface ApiResponse<T> {
  data?: T;
  count?: number;
  tools?: Tool[];
  categories?: Category[];
  query?: string;
  error?: string;
}

class ApiService {
  private baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://linkedgen.directory' 
    : 'http://localhost:3005';

  async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Service Error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Tools API
  async getTools(params?: {
    featured?: boolean;
    category?: string;
    search?: string;
    slug?: string;
  }): Promise<ApiResponse<Tool[]>> {
    const searchParams = new URLSearchParams();
    if (params?.featured) searchParams.set('featured', 'true');
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.slug) searchParams.set('slug', params.slug);

    const queryString = searchParams.toString();
    const endpoint = `/api/tools${queryString ? `?${queryString}` : ''}`;
    
    return this.fetchApi<Tool[]>(endpoint);
  }

  async getToolBySlug(slug: string): Promise<ApiResponse<Tool>> {
    return this.getTools({ slug });
  }

  async getFeaturedTools(): Promise<ApiResponse<Tool[]>> {
    return this.getTools({ featured: true });
  }

  async getToolsByCategory(categorySlug: string): Promise<ApiResponse<Tool[]>> {
    return this.getTools({ category: categorySlug });
  }

  async searchTools(query: string): Promise<ApiResponse<Tool[]>> {
    return this.getTools({ search: query });
  }

  // Categories API
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.fetchApi<Category[]>('/api/categories');
  }

  async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    return this.fetchApi<Category[]>(`/api/categories?slug=${slug}`);
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export convenience functions for backward compatibility
export const getToolBySlug = (slug: string) => apiService.getToolBySlug(slug);
export const getFeaturedTools = () => apiService.getFeaturedTools();
export const getToolsByCategory = (categorySlug: string) => apiService.getToolsByCategory(categorySlug);
export const searchTools = (query: string) => apiService.searchTools(query);
export const getCategories = () => apiService.getCategories();
export const getCategoryBySlug = (slug: string) => apiService.getCategoryBySlug(slug);