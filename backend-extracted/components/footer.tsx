import Link from 'next/link'
import { categories } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">About</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-we-review" className="hover:text-foreground transition-colors">
                  How We Review
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Categories</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Popular</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/category/full-stack-solutions" className="hover:text-foreground transition-colors">
                  Top Rated Tools
                </Link>
              </li>
              <li>
                <Link href="/search?pricing=free" className="hover:text-foreground transition-colors">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link href="/search?pricing=under-50" className="hover:text-foreground transition-colors">
                  Tools Under $50
                </Link>
              </li>
              <li>
                <Link href="/search?features=chromeExtension" className="hover:text-foreground transition-colors">
                  Chrome Extensions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-foreground transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LinkedGen Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
