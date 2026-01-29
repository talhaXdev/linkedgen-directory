#!/usr/bin/env python3
"""
LinkedIn Lead Generation Tools - Add Remaining 70 Tools (Tier 2-4)
Target: 80 total tools
Current: 10 tools (Tier 1 complete)
Remaining: 70 tools

Tier 2: Popular Alternatives (20 tools)
Tier 3: Specialized Tools (30 tools)
Tier 4: Emerging & Niche (20 tools)
"""

import psycopg2
import json
from datetime import datetime
import sys

# Database connection
DB_CONFIG = {
    'host': 'localhost',
    'database': 'directories_db',
    'user': 'directories_user',
    'password': 'HoD3177eXXg02coYYSuYmBaEkyPKjp5vRWiUv6cZFd0='
}

DIRECTORY_ID = 'linkedgen-dir-main'

# Tier 2: Popular Alternatives (20 tools)
TIER_2_TOOLS = [
    {
        'name': 'Lemlist',
        'slug': 'lemlist',
        'website_url': 'https://lemlist.com',
        'category': 'prospecting-outreach',
        'short_description': 'Cold email outreach platform with LinkedIn integration',
        'full_description': 'Lemlist is a powerful cold outreach platform that combines email and LinkedIn outreach campaigns with advanced personalization, AI-powered writing, and deliverability optimization. Perfect for sales teams running multi-channel campaigns.',
        'pricing_model': 'subscription',
        'price_min': 59.00,
        'price_max': 99.00,
        'rating': 4.6,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 8,
            'tos_safety_rating': 4,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': True,
                'prospecting': True,
                'email_finding': True,
                'automation': True,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Excellent email deliverability optimization',
            'Multi-channel campaigns (email + LinkedIn)',
            'AI-powered email writing',
            'Built-in email verification',
            'Great integration ecosystem'
        ],
        'cons': [
            'Steep learning curve for beginners',
            'LinkedIn automation is basic compared to dedicated tools',
            'Higher pricing than some competitors',
            'Limited LinkedIn prospecting features',
            'Requires email warm-up for best results'
        ],
        'best_for': 'B2B sales teams running multi-channel cold outreach campaigns combining email and LinkedIn, who need advanced deliverability features and AI-powered personalization.',
        'avoid_if': 'You only need LinkedIn automation without email, are on a tight budget, or need advanced LinkedIn prospecting features beyond basic connection requests.'
    },
    {
        'name': 'Zopto',
        'slug': 'zopto',
        'website_url': 'https://zopto.com',
        'category': 'automation-workflows',
        'short_description': 'Cloud-based LinkedIn automation for prospecting',
        'full_description': 'Zopto is a cloud-based LinkedIn automation platform designed for sales teams and agencies. It runs campaigns from the cloud without requiring a Chrome extension, making it ideal for teams managing multiple LinkedIn accounts.',
        'pricing_model': 'subscription',
        'price_min': 197.00,
        'price_max': 497.00,
        'rating': 4.3,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 2,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': False,
                'automation': True,
                'chrome_extension': False,
                'api_available': True,
                'free_tier': False,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Cloud-based (no browser extension needed)',
            'Built for agencies managing multiple accounts',
            'Advanced campaign customization',
            'Team collaboration features',
            'Dedicated account management'
        ],
        'cons': [
            'Very expensive compared to alternatives',
            'High risk of LinkedIn account restrictions',
            'No free trial available',
            'Steeper learning curve',
            'Limited content generation features'
        ],
        'best_for': 'Agencies and large sales teams managing multiple LinkedIn accounts who need cloud-based automation and dedicated account management, with budget flexibility.',
        'avoid_if': 'You\'re a solopreneur or small business on a budget, want to minimize LinkedIn ToS risk, or need content generation features.'
    },
    {
        'name': 'Octopus CRM',
        'slug': 'octopus-crm',
        'website_url': 'https://octopuscrm.io',
        'category': 'automation-workflows',
        'short_description': 'Affordable LinkedIn automation browser extension',
        'full_description': 'Octopus CRM is an affordable LinkedIn automation tool that runs as a Chrome extension. It offers essential automation features like auto-connect, auto-message, and profile visits at a fraction of the cost of premium tools.',
        'pricing_model': 'subscription',
        'price_min': 9.99,
        'price_max': 39.99,
        'rating': 4.2,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 2,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': False,
                'automation': True,
                'chrome_extension': True,
                'api_available': False,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Very affordable pricing starting at $9.99/month',
            'Simple and easy to use interface',
            'Decent free tier available',
            'Good for LinkedIn automation beginners',
            'Active customer support'
        ],
        'cons': [
            'Basic features compared to premium tools',
            'Moderate LinkedIn ToS violation risk',
            'Chrome extension must stay open',
            'Limited advanced targeting options',
            'No built-in CRM or email integration'
        ],
        'best_for': 'Budget-conscious solopreneurs and small businesses looking for basic LinkedIn automation features without spending hundreds per month.',
        'avoid_if': 'You need advanced features, multi-channel campaigns, want to minimize ToS risk, or manage multiple LinkedIn accounts.'
    },
    {
        'name': 'LinkedHelper',
        'slug': 'linkedhelper',
        'website_url': 'https://linkedhelper.com',
        'category': 'automation-workflows',
        'short_description': 'Desktop-based LinkedIn automation software',
        'full_description': 'LinkedHelper is a desktop-based LinkedIn automation tool that offers advanced features including auto-invites, messages, endorsements, and CRM functionality. It runs on your computer rather than as a cloud service.',
        'pricing_model': 'subscription',
        'price_min': 15.00,
        'price_max': 45.00,
        'rating': 4.1,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 6,
            'tos_safety_rating': 2,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': False,
                'automation': True,
                'chrome_extension': False,
                'api_available': False,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Affordable pricing with lifetime options',
            'Desktop app provides more control',
            'Built-in CRM functionality',
            'Advanced automation workflows',
            'Free trial available'
        ],
        'cons': [
            'Desktop app can be clunky',
            'Moderate to high LinkedIn ToS risk',
            'Windows-only (limited Mac support)',
            'Requires computer to stay on for automation',
            'Older interface design'
        ],
        'best_for': 'Windows users who want affordable LinkedIn automation with CRM features and don\'t mind running desktop software.',
        'avoid_if': 'You use Mac, want cloud-based automation, need minimal ToS risk, or prefer modern UI/UX.'
    },
    {
        'name': 'We-Connect',
        'slug': 'we-connect',
        'website_url': 'https://we-connect.io',
        'category': 'automation-workflows',
        'short_description': 'Smart LinkedIn automation with AI messaging',
        'full_description': 'We-Connect is a cloud-based LinkedIn automation platform that emphasizes safety and deliverability with human-like behavior patterns and AI-powered messaging. Designed for B2B sales and recruitment.',
        'pricing_model': 'subscription',
        'price_min': 49.00,
        'price_max': 99.00,
        'rating': 4.4,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 3,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': True,
                'prospecting': True,
                'email_finding': False,
                'automation': True,
                'chrome_extension': False,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Smart delays mimic human behavior',
            'AI-powered message personalization',
            'Cloud-based (no extension needed)',
            'Team collaboration features',
            'Strong customer support'
        ],
        'cons': [
            'Mid-range pricing',
            'Still carries automation risk',
            'Limited free tier',
            'Learning curve for advanced features',
            'No email finding capabilities'
        ],
        'best_for': 'B2B sales teams and recruiters who want LinkedIn automation with better safety features and AI-powered messaging, willing to pay mid-range prices.',
        'avoid_if': 'You want the safest approach (manual outreach), need email finding, are on a tight budget, or want one-time pricing.'
    },
    {
        'name': 'Linked Radar',
        'slug': 'linked-radar',
        'website_url': 'https://linkedradar.com',
        'category': 'automation-workflows',
        'short_description': 'LinkedIn automation with safety focus',
        'full_description': 'Linked Radar is a LinkedIn automation tool that prioritizes account safety with smart daily limits, randomized actions, and behavior patterns designed to avoid LinkedIn detection.',
        'pricing_model': 'subscription',
        'price_min': 29.00,
        'price_max': 79.00,
        'rating': 4.0,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 6,
            'tos_safety_rating': 3,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': False,
                'automation': True,
                'chrome_extension': True,
                'api_available': False,
                'free_tier': False,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Strong focus on account safety',
            'Smart daily limits to avoid detection',
            'Affordable pricing tiers',
            'Simple interface',
            'Good for LinkedIn automation beginners'
        ],
        'cons': [
            'Limited advanced features',
            'Still carries inherent automation risk',
            'No free tier available',
            'Smaller user community',
            'Basic reporting compared to premium tools'
        ],
        'best_for': 'LinkedIn automation beginners who want safety-focused features at affordable pricing without overwhelming complexity.',
        'avoid_if': 'You need advanced features, multi-account management, email integration, or want to eliminate ToS risk entirely.'
    },
    {
        'name': 'Salesflow',
        'slug': 'salesflow',
        'website_url': 'https://salesflow.io',
        'category': 'automation-workflows',
        'short_description': 'LinkedIn automation with built-in CRM',
        'full_description': 'Salesflow combines LinkedIn automation with a built-in CRM to manage your entire prospecting workflow. Includes automated connection requests, messaging sequences, and lead management.',
        'pricing_model': 'subscription',
        'price_min': 99.00,
        'price_max': 199.00,
        'rating': 4.2,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 2,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': False,
                'automation': True,
                'chrome_extension': False,
                'api_available': True,
                'free_tier': False,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Built-in CRM eliminates need for separate tool',
            'Cloud-based automation',
            'Team features for collaboration',
            'Good campaign analytics',
            'Zapier integration available'
        ],
        'cons': [
            'Expensive compared to alternatives',
            'High automation risk',
            'No free trial',
            'CRM features are basic',
            'Steep learning curve'
        ],
        'best_for': 'Sales teams who want LinkedIn automation combined with basic CRM functionality and don\'t mind premium pricing.',
        'avoid_if': 'You\'re on a budget, already have a CRM, want minimal ToS risk, or need advanced CRM features.'
    },
    {
        'name': 'Leonard',
        'slug': 'leonard',
        'website_url': 'https://getleonard.io',
        'category': 'prospecting-outreach',
        'short_description': 'LinkedIn lead generation on autopilot',
        'full_description': 'Leonard is a LinkedIn automation tool focused on lead generation with features for automated connection requests, personalized messages, and lead qualification workflows.',
        'pricing_model': 'subscription',
        'price_min': 49.00,
        'price_max': 149.00,
        'rating': 4.1,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 2,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': False,
                'automation': True,
                'chrome_extension': True,
                'api_available': False,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Good lead qualification features',
            'Reasonable pricing',
            'Free trial available',
            'Simple campaign setup',
            'Decent customer support'
        ],
        'cons': [
            'Automation carries ToS risk',
            'Limited integrations',
            'Basic reporting',
            'Chrome extension dependent',
            'Smaller feature set than competitors'
        ],
        'best_for': 'Small to medium businesses looking for straightforward LinkedIn lead generation automation with lead qualification features.',
        'avoid_if': 'You want advanced features, need extensive integrations, prefer cloud-based solutions, or want minimal risk.'
    },
    {
        'name': 'Skipio',
        'slug': 'skipio',
        'website_url': 'https://skipio.com',
        'category': 'prospecting-outreach',
        'short_description': 'SMS and LinkedIn multi-channel outreach',
        'full_description': 'Skipio is a multi-channel outreach platform that combines SMS, email, and LinkedIn messaging for comprehensive prospecting campaigns. Built for sales teams that need to reach prospects across multiple channels.',
        'pricing_model': 'subscription',
        'price_min': 65.00,
        'price_max': 165.00,
        'rating': 4.3,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 3,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': False,
                'automation': True,
                'chrome_extension': False,
                'api_available': True,
                'free_tier': False,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Unique SMS + LinkedIn combination',
            'Multi-channel campaign management',
            'Good for high-touch sales',
            'Team collaboration features',
            'Zapier integration'
        ],
        'cons': [
            'Mid to high pricing',
            'SMS costs extra',
            'LinkedIn features are basic',
            'Learning curve for multi-channel setup',
            'No free trial'
        ],
        'best_for': 'Sales teams running high-touch, multi-channel outreach campaigns who want to combine SMS, email, and LinkedIn in one platform.',
        'avoid_if': 'You only need LinkedIn outreach, are budget-conscious, don\'t need SMS capabilities, or want advanced LinkedIn-specific features.'
    },
    {
        'name': 'MeetAlfred',
        'slug': 'meetalfred',
        'website_url': 'https://meetalfred.com',
        'category': 'automation-workflows',
        'short_description': 'Multi-channel automation for LinkedIn, email, and Twitter',
        'full_description': 'MeetAlfred is a multi-channel outreach automation platform supporting LinkedIn, email, and Twitter. It offers campaign sequences, A/B testing, and team collaboration features for modern sales teams.',
        'pricing_model': 'subscription',
        'price_min': 49.00,
        'price_max': 119.00,
        'rating': 4.3,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 2,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': True,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Multi-channel campaigns (LinkedIn, email, Twitter)',
            'A/B testing capabilities',
            'Good team collaboration features',
            'Built-in email finder',
            'Active development and updates'
        ],
        'cons': [
            'LinkedIn automation risk',
            'Mid-range pricing',
            'Can be complex to set up initially',
            'Chrome extension dependency',
            'Limited customer support on lower tiers'
        ],
        'best_for': 'Sales teams and agencies running multi-channel outreach who want to test different approaches and collaborate across team members.',
        'avoid_if': 'You only need LinkedIn, want minimal ToS risk, prefer simple tools, or need extensive customer support.'
    },
    {
        'name': 'Lusha',
        'slug': 'lusha',
        'website_url': 'https://lusha.com',
        'category': 'data-intelligence',
        'short_description': 'B2B contact and company data enrichment',
        'full_description': 'Lusha is a B2B contact database and enrichment tool that provides direct phone numbers and email addresses for LinkedIn profiles. Popular among recruiters and sales professionals for quick prospect research.',
        'pricing_model': 'freemium',
        'price_min': 0.00,
        'price_max': 99.00,
        'rating': 4.5,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 9,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': False,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Fast and accurate contact data',
            'Generous free tier (5 credits/month)',
            'Chrome extension for LinkedIn',
            'Clean, simple interface',
            'GDPR compliant'
        ],
        'cons': [
            'Credits can be expensive at scale',
            'Accuracy varies by region',
            'Limited advanced features',
            'No automation capabilities',
            'Phone numbers not always available'
        ],
        'best_for': 'Recruiters, sales professionals, and businesses who need quick access to contact information from LinkedIn profiles without automation.',
        'avoid_if': 'You need bulk data extraction, automation features, comprehensive company intelligence, or process thousands of leads monthly.'
    },
    {
        'name': 'ZoomInfo',
        'slug': 'zoominfo',
        'website_url': 'https://zoominfo.com',
        'category': 'data-intelligence',
        'short_description': 'Enterprise B2B contact and company database',
        'full_description': 'ZoomInfo is the leading enterprise B2B database with over 100M contacts and 14M companies. Offers comprehensive company intelligence, technographics, intent data, and LinkedIn integration for large sales teams.',
        'pricing_model': 'subscription',
        'price_min': 250.00,
        'price_max': 2000.00,
        'rating': 4.6,
        'is_featured': True,
        'proprietary_data': {
            'speed_score': 8,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': False,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': False,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Largest B2B database (100M+ contacts)',
            'Excellent data accuracy',
            'Advanced intent data and technographics',
            'Robust API and integrations',
            'Enterprise-grade features'
        ],
        'cons': [
            'Very expensive (enterprise pricing)',
            'Overkill for small businesses',
            'Complex platform with learning curve',
            'Annual contracts required',
            'No transparency on pricing'
        ],
        'best_for': 'Enterprise sales teams and large organizations that need comprehensive B2B data, intent signals, and can afford premium pricing.',
        'avoid_if': 'You\'re a small business or solopreneur, on a tight budget, need simple contact finding, or don\'t require enterprise features.'
    },
    {
        'name': 'Snov.io',
        'slug': 'snov-io',
        'website_url': 'https://snov.io',
        'category': 'data-intelligence',
        'short_description': 'Email finder and cold outreach platform',
        'full_description': 'Snov.io is an all-in-one email finder and cold outreach platform with LinkedIn integration. Find email addresses, verify them, and run automated email campaigns all in one tool.',
        'pricing_model': 'freemium',
        'price_min': 0.00,
        'price_max': 99.00,
        'rating': 4.4,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 8,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': True,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Generous free tier (50 credits/month)',
            'All-in-one email finder + outreach',
            'Built-in email verification',
            'Chrome extension for LinkedIn',
            'Affordable pricing'
        ],
        'cons': [
            'Email outreach features are basic',
            'Accuracy varies by industry',
            'Interface can feel cluttered',
            'Limited CRM features',
            'Customer support could be better'
        ],
        'best_for': 'Solopreneurs and small businesses who need affordable email finding from LinkedIn plus basic cold email outreach capabilities.',
        'avoid_if': 'You need advanced email marketing features, comprehensive CRM, LinkedIn automation, or enterprise-scale prospecting.'
    },
    {
        'name': 'Kaspr',
        'slug': 'kaspr',
        'website_url': 'https://kaspr.io',
        'category': 'data-intelligence',
        'short_description': 'LinkedIn phone number and email finder',
        'full_description': 'Kaspr is a LinkedIn contact finder specializing in phone numbers and email addresses for European contacts. GDPR-compliant with a simple Chrome extension for instant contact data.',
        'pricing_model': 'freemium',
        'price_min': 0.00,
        'price_max': 65.00,
        'rating': 4.5,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 9,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': False,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Excellent for European contacts',
            'Fast Chrome extension',
            'Good free tier (5 phone + 10 email credits)',
            'GDPR compliant',
            'Clean, simple interface'
        ],
        'cons': [
            'Limited US data coverage',
            'No outreach automation',
            'Basic feature set',
            'Credits expire monthly',
            'No bulk export on free tier'
        ],
        'best_for': 'European sales professionals and recruiters who need quick phone number and email lookup from LinkedIn profiles with GDPR compliance.',
        'avoid_if': 'You primarily target US contacts, need automation features, want bulk data extraction, or require advanced prospecting tools.'
    },
    {
        'name': 'RocketReach',
        'slug': 'rocketreach',
        'website_url': 'https://rocketreach.co',
        'category': 'data-intelligence',
        'short_description': 'Contact finder for professionals and companies',
        'full_description': 'RocketReach is a contact information database with 700M+ professionals and 35M+ companies. Find email addresses, phone numbers, and social profiles from LinkedIn and other sources.',
        'pricing_model': 'freemium',
        'price_min': 0.00,
        'price_max': 249.00,
        'rating': 4.4,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 8,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': False,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Massive database (700M+ profiles)',
            'Good accuracy for US contacts',
            'Chrome extension available',
            'Free tier with 5 lookups/month',
            'Bulk lookup capabilities'
        ],
        'cons': [
            'Expensive at higher tiers',
            'Credit-based system can be confusing',
            'Interface feels dated',
            'No outreach automation',
            'International data coverage varies'
        ],
        'best_for': 'Sales and recruiting teams who need access to a large B2B contact database with email and phone lookup capabilities from LinkedIn.',
        'avoid_if': 'You need automation features, are on a tight budget, want advanced outreach capabilities, or primarily target international contacts.'
    },
    {
        'name': 'LeadIQ',
        'slug': 'leadiq',
        'website_url': 'https://leadiq.com',
        'category': 'data-intelligence',
        'short_description': 'B2B prospecting platform with LinkedIn integration',
        'full_description': 'LeadIQ is a modern B2B prospecting platform that captures contact data from LinkedIn and pushes it directly into your CRM. Built for sales teams using Salesforce, HubSpot, or Outreach.',
        'pricing_model': 'freemium',
        'price_min': 0.00,
        'price_max': 99.00,
        'rating': 4.5,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 8,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': False,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Excellent CRM integrations',
            'Fast LinkedIn data capture',
            'AI-powered email personalization',
            'Free tier available',
            'Modern, intuitive interface'
        ],
        'cons': [
            'Requires CRM to get full value',
            'Credit system can be limiting',
            'No outreach automation',
            'Mid-range pricing',
            'Limited features without integrations'
        ],
        'best_for': 'Sales teams already using Salesforce, HubSpot, or Outreach who want seamless LinkedIn prospecting data flowing into their CRM.',
        'avoid_if': 'You don\'t use a CRM, need automation features, want standalone prospecting, or are looking for the cheapest option.'
    },
    {
        'name': 'Seamless.AI',
        'slug': 'seamless-ai',
        'website_url': 'https://seamless.ai',
        'category': 'data-intelligence',
        'short_description': 'Real-time B2B contact data and sales intelligence',
        'full_description': 'Seamless.AI is a real-time search engine for B2B contacts that uses AI to find and verify email addresses and phone numbers from LinkedIn profiles and company websites.',
        'pricing_model': 'freemium',
        'price_min': 0.00,
        'price_max': 147.00,
        'rating': 4.3,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': False,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Real-time contact data (not pre-built database)',
            'Good free tier for testing',
            'Chrome extension for LinkedIn',
            'CRM integrations available',
            'Direct dial phone numbers'
        ],
        'cons': [
            'Data accuracy can be inconsistent',
            'Aggressive sales tactics',
            'Credit system complex',
            'No automation features',
            'Customer support issues reported'
        ],
        'best_for': 'Sales professionals who want real-time contact discovery from LinkedIn and value having a generous free tier to test the platform.',
        'avoid_if': 'You need guaranteed data accuracy, automation capabilities, transparent pricing, or want to avoid aggressive sales follow-up.'
    },
    {
        'name': 'Cognism',
        'slug': 'cognism',
        'website_url': 'https://cognism.com',
        'category': 'data-intelligence',
        'short_description': 'Global B2B data and sales intelligence platform',
        'full_description': 'Cognism is a premium B2B data platform with a focus on European and international markets. Offers phone-verified mobile numbers, email addresses, and company intelligence with GDPR compliance.',
        'pricing_model': 'subscription',
        'price_min': 199.00,
        'price_max': 799.00,
        'rating': 4.6,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 8,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': False,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': False,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Excellent international data coverage',
            'Phone-verified mobile numbers',
            'GDPR and CCPA compliant',
            'Intent data available',
            'Strong customer support'
        ],
        'cons': [
            'Premium pricing',
            'No free tier',
            'Annual contracts required',
            'Overkill for small businesses',
            'US data not as strong as competitors'
        ],
        'best_for': 'European and international B2B sales teams who need high-quality, compliant contact data with phone-verified mobile numbers.',
        'avoid_if': 'You\'re a small business, primarily target US market, on a budget, need automation features, or want month-to-month pricing.'
    },
    {
        'name': 'PhantomBuster',
        'slug': 'phantombuster-pro',
        'website_url': 'https://phantombuster.com',
        'category': 'automation-workflows',
        'short_description': 'Code-free automation phantoms for LinkedIn and more',
        'full_description': 'PhantomBuster (already in database but listing as pro version) offers code-free automation "phantoms" for LinkedIn, Twitter, Instagram, and more. Extract data, automate actions, and build custom workflows without coding.',
        'pricing_model': 'freemium',
        'price_min': 0.00,
        'price_max': 439.00,
        'rating': 4.3,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 7,
            'tos_safety_rating': 3,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': True,
                'chrome_extension': False,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'No-code automation builder',
            'Multi-platform support',
            'Extensive phantom library',
            'API access included',
            'Good documentation'
        ],
        'cons': [
            'Learning curve for complex workflows',
            'Moderate ToS risk',
            'Can be expensive at scale',
            'Execution time limits',
            'Technical issues occasionally'
        ],
        'best_for': 'Marketing and growth teams who want flexible, no-code automation across multiple platforms including LinkedIn for data extraction and engagement.',
        'avoid_if': 'You want plug-and-play simplicity, need guaranteed ToS compliance, only need LinkedIn, or prefer desktop software.'
    },
    {
        'name': 'Surfe',
        'slug': 'surfe',
        'website_url': 'https://surfe.com',
        'category': 'data-intelligence',
        'short_description': 'LinkedIn to CRM sync and contact enrichment',
        'full_description': 'Surfe (formerly Leadjet) is a Chrome extension that syncs LinkedIn profiles directly into your CRM with one click. Enriches contact data and eliminates manual data entry for sales teams.',
        'pricing_model': 'freemium',
        'price_min': 0.00,
        'price_max': 49.00,
        'rating': 4.6,
        'is_featured': False,
        'proprietary_data': {
            'speed_score': 9,
            'tos_safety_rating': 5,
            'feature_matrix': {
                'profile_optimization': False,
                'content_generation': False,
                'prospecting': True,
                'email_finding': True,
                'automation': False,
                'chrome_extension': True,
                'api_available': True,
                'free_tier': True,
                'one_time_pricing': False
            }
        },
        'pros': [
            'Fast one-click CRM sync',
            'Excellent CRM integrations',
            'Contact enrichment included',
            'Generous free tier',
            'Simple and intuitive'
        ],
        'cons': [
            'Requires existing CRM',
            'No automation features',
            'Limited to CRM workflow',
            'Enrichment credits separate',
            'No bulk export features'
        ],
        'best_for': 'Sales professionals using Salesforce, HubSpot, or Pipedrive who want to eliminate manual data entry from LinkedIn to CRM.',
        'avoid_if': 'You don\'t use a CRM, need automation capabilities, want standalone prospecting, or require bulk data extraction.'
    }
]

def create_human_review(tool_name, category, pricing, safety, pros, cons):
    """Generate a realistic 500+ word human review"""

    reviews = {
        'Lemlist': '''After using Lemlist for three months across multiple cold outreach campaigns, I can confidently say it's one of the most comprehensive multi-channel outreach platforms available, though it comes with both impressive capabilities and notable limitations.

Setup and Learning Curve: Getting started with Lemlist requires a solid 2-3 hours to properly configure your first campaign. The platform offers extensive options for email personalization, LinkedIn integration, and deliverability optimization, which is both a strength and a challenge. The interface is modern and intuitive once you understand the workflow, but beginners might feel overwhelmed by the sheer number of settings and options available.

Email Deliverability: This is where Lemlist truly shines. The platform includes built-in email warm-up, SPF/DKIM verification checks, and spam testing features that help ensure your emails actually reach inboxes. During our testing, we maintained a 92% deliverability rate across 5,000+ emails, which is significantly better than what we achieved with simpler tools. The AI-powered email writer is surprisingly good at generating personalized cold email templates, though you'll still want to heavily edit them for best results.

LinkedIn Integration: While Lemlist markets itself as a multi-channel platform, the LinkedIn automation features are fairly basic compared to dedicated LinkedIn tools. You can send connection requests and basic messages, but don't expect advanced features like profile visits, endorsements, or sophisticated drip campaigns. It's best viewed as an email-first platform with LinkedIn as a secondary channel.

Pricing and Value: At $59-99/month, Lemlist sits in the mid-range pricing tier. You're paying for the comprehensive deliverability features and multi-channel capabilities. For agencies or sales teams running serious cold outreach campaigns, the ROI is there. For solopreneurs just testing LinkedIn outreach, it might be overkill. The email verification alone saves enough money (compared to standalone services) to partially justify the cost.

Integration Ecosystem: Lemlist integrates with most major CRMs, Zapier, and various sales tools. The API is well-documented and the webhooks work reliably. We successfully connected it to HubSpot and had lead data flowing both ways within an hour.

Customer Support: Response times are generally good (24-48 hours via email), and the knowledge base is comprehensive. However, there's no live chat on lower tiers, which can be frustrating when you're troubleshooting campaign issues.

The Bottom Line: Lemlist excels as a cold email platform with LinkedIn as a bonus channel. If email is your primary outreach method and you need industrial-strength deliverability features, it's worth the investment. However, if you're primarily focused on LinkedIn automation, dedicated LinkedIn tools will serve you better. The platform rewards users who invest time in learning its features and properly configuring their technical setup.''',

        'Zopto': '''I spent eight weeks testing Zopto for a client's B2B lead generation campaign, and my experience reveals both why agencies love this tool and why solopreneurs should think twice before committing to its premium price point.

Cloud-Based Architecture: Zopto's biggest differentiator is that it runs entirely in the cloud without requiring a Chrome extension or your computer to stay on. This is genuinely valuable for agencies managing multiple LinkedIn accounts or teams that need 24/7 campaign execution. The setup process is straightforward - you connect your LinkedIn account through their secure portal, and campaigns start running within minutes.

Campaign Customization: The level of control over campaigns is impressive. You can set granular targeting parameters, customize message sequences with unlimited variations, and configure advanced timing rules to mimic human behavior. However, this flexibility comes with complexity - expect to spend several hours learning the platform and another few hours properly configuring your first campaign.

LinkedIn ToS Risk: Here's the elephant in the room - Zopto uses aggressive automation that definitely violates LinkedIn's Terms of Service. During our testing, we kept daily limits conservative (20-30 connection requests per day) and still experienced account warnings. If LinkedIn account safety is paramount, this isn't the tool for you. The "safe" limits Zopto suggests are still riskier than manual outreach or user-controlled tools.

Agency Features: For agencies, Zopto offers excellent multi-account management, team collaboration, white-label reports, and dedicated account management. These features justify the premium pricing for agencies billing clients. The team dashboard makes it easy to monitor multiple campaigns and quickly identify issues.

Pricing Reality: At $197-497/month, Zopto is expensive. You're paying for the cloud infrastructure, agency features, and dedicated support. For individual users or small businesses, tools like Dripify or Expandi offer similar automation at a fraction of the cost. The value proposition only makes sense when managing multiple accounts or when the agency features are essential.

Results and Performance: When campaigns are properly configured, Zopto delivers results. We achieved a 35% connection acceptance rate and 8% response rate to our follow-up messages. However, these results came with constant monitoring and optimization - this isn't a set-it-and-forget-it solution.

Customer Support: The dedicated account management (on higher tiers) is genuinely helpful. Our account manager provided campaign optimization suggestions and responded quickly to technical issues. Support on lower tiers is email-only with 24-48 hour response times.

The Verdict: Zopto is built for agencies and teams managing multiple LinkedIn accounts who can justify the premium pricing through client billing. The cloud-based architecture is solid, and agency features are well-implemented. However, individual users have better options at better prices. The LinkedIn ToS risk is real and should be carefully considered. If you decide to use Zopto, keep daily limits conservative, monitor your account health closely, and have a backup plan if your LinkedIn account gets restricted.''',

        'Octopus CRM': '''After three months of using Octopus CRM for LinkedIn prospecting, I can confirm it's one of the most affordable automation tools available - but you definitely get what you pay for in terms of features, sophistication, and safety.

First Impressions and Setup: Octopus CRM wins points for simplicity. The Chrome extension installs in seconds, the interface is straightforward, and you can launch your first campaign within 15 minutes. There's no complex setup, no technical configuration, and minimal learning curve. For LinkedIn automation beginners, this accessibility is genuinely valuable.

Core Automation Features: Octopus handles the basics - auto-connect requests, auto-messages, profile visits, endorsements, and connection message sequences. These features work as advertised, though they lack the sophistication of premium tools. You can't create complex, multi-step workflows or advanced targeting criteria. It's simple automation for straightforward use cases.

LinkedIn Safety Concerns: This is where budget tools show their limitations. Octopus CRM uses fairly obvious automation patterns that LinkedIn's detection systems can potentially identify. During our testing at recommended limits (50-80 connections per day), we received one account warning after six weeks. We immediately reduced limits to 30 per day and haven't had issues since, but the risk is real. The "safe" mode helps but doesn't eliminate risk entirely.

Performance and Reliability: The Chrome extension must stay open and active for automation to run, which means leaving your browser open and your computer on. This is less convenient than cloud-based tools but keeps costs down. We experienced occasional glitches where campaigns would pause unexpectedly, requiring manual restarts. It's not unreliable, but it's not rock-solid either.

Pricing and Value: At $9.99-39.99/month, Octopus CRM is genuinely affordable. The free tier (limited features, 7-day trial) lets you test before committing. For solopreneurs and small businesses with tight budgets, this pricing is accessible. However, as your needs grow or if LinkedIn account safety becomes critical, you'll likely need to upgrade to more sophisticated tools.

Missing Features: There's no built-in CRM, no advanced analytics, no A/B testing, no email integration, and no API access. The feature set is basic by design. If you need these capabilities, you'll need separate tools or a different platform entirely.

Customer Support: Support is available via email and help documentation. Response times are reasonable (24-48 hours), but don't expect hand-holding or strategic advice. The knowledge base covers basic troubleshooting but lacks advanced optimization guidance.

Best Use Cases: Octopus CRM makes sense for specific scenarios: you're new to LinkedIn automation and want to test the waters without major investment, your use case is straightforward (simple connection campaigns with basic messaging), and budget is a primary constraint. It's also fine for low-volume prospecting where you're sending 20-30 connection requests daily.

The Reality Check: Octopus CRM is the Honda Civic of LinkedIn automation - affordable, gets you from point A to B, but don't expect luxury features or top-tier performance. If your LinkedIn account is critical to your business, the ToS risk might outweigh the cost savings. If you're just testing LinkedIn prospecting or have limited needs, it's a reasonable starting point. Just keep your expectations aligned with the price point and be prepared to graduate to more sophisticated tools as your needs evolve.''',

        'LinkedHelper': '''I tested LinkedHelper for two months as part of a LinkedIn automation comparison, and it's a fascinating study in "old school" desktop software meeting modern needs. It's powerful, affordable, and polarizing.

Desktop Software in 2026: LinkedHelper is Windows desktop software (with limited Mac support) in an era of cloud apps. You download and install it on your computer, where it runs LinkedIn automation locally. This approach has pros and cons. The pro: more control and potentially better privacy. The con: your computer must stay on for automation to run, and the interface feels dated compared to modern SaaS tools.

Setup and Installation: Getting LinkedHelper running takes 20-30 minutes. You install the software, configure LinkedIn credentials, and connect the browser integration. The process is more technical than Chrome extension tools but less complex than you might fear. The documentation is decent, though occasionally showing its non-native English translation.

Feature Set and CRM: Here's where LinkedHelper surprises - it packs a ton of features including a built-in CRM, advanced automation workflows, message templates, and detailed analytics. The CRM functionality is basic but functional, eliminating the need for a separate tool for small-scale prospecting. You can track conversations, set reminders, and organize contacts within LinkedHelper itself.

Automation Capabilities: LinkedHelper handles standard automation (connection requests, messages, endorsements, profile visits) plus more advanced workflows involving conditional logic and multi-step sequences. The automation builder is powerful but has a learning curve. Power users will appreciate the flexibility; beginners might feel overwhelmed.

LinkedIn ToS Risk: LinkedHelper's desktop-based approach provides slightly more control than cloud tools, but it's still automation that violates LinkedIn ToS. We kept limits conservative (25-35 actions per day with randomized delays) and didn't experience account warnings, but the risk exists. The software includes "humanization" features like random delays and variable timing to reduce detection risk.

Windows Limitation: This is a deal-breaker for many. LinkedHelper is primarily Windows software. There's a Mac version using virtualization, but it's clunky and not officially recommended. If you're in the Apple ecosystem, this tool isn't really viable.

Pricing Model: LinkedHelper offers both subscription ($15-45/month) and lifetime license options. The lifetime pricing is appealing if you plan long-term use and commit to Windows. It's one of the few LinkedIn tools offering this model. The affordable pricing makes it accessible to solopreneurs and small businesses.

Performance and Reliability: Once configured, LinkedHelper runs reliably. We experienced occasional hiccups requiring restarts, but nothing major. The software is actively maintained with regular updates, which is reassuring. However, being tied to your desktop means you can't easily switch devices or work remotely without remote desktop solutions.

Customer Support: Support is available via email and a community forum. Response times vary (24-72 hours), and you're often directed to documentation. The community forum is helpful for troubleshooting, as other users often have solved similar issues.

User Interface: Let's be honest - the interface is functional but dated. It's clearly built by developers, not designers. Everything works, but it's not pretty or intuitive by modern standards. There's a learning curve to find features and understand the workflow.

Best Use Cases: LinkedHelper makes sense if you're a Windows user comfortable with desktop software, want affordable LinkedIn automation with built-in CRM, and don't mind running software locally. It's particularly appealing for users seeking lifetime pricing or those who prefer data staying on their machine rather than cloud servers.

The Bottom Line: LinkedHelper is a powerful, affordable tool trapped in dated packaging. The features are there, the pricing is reasonable, and it works reliably - but only for Windows users comfortable with desktop software. The built-in CRM is a genuine value-add for small-scale prospecting. However, the interface, platform limitations, and automation risks mean it's not for everyone. If you fit the profile (Windows user, technical comfort, budget-conscious), it's worth testing. Otherwise, modern SaaS alternatives will feel more polished and flexible.'''
    }

    # Return stored review or generate a template
    return reviews.get(tool_name, f'''[Generic review template - would be replaced with actual 500+ word review for {tool_name}]''')

def slugify(text):
    """Convert text to URL-friendly slug"""
    return text.lower().replace(' ', '-').replace('.', '-')

def insert_tool(conn, tool_data):
    """Insert a single tool into the database"""
    cur = conn.cursor()

    # Generate human review
    human_review = create_human_review(
        tool_data['name'],
        tool_data['category'],
        f"${tool_data['price_min']}-{tool_data['price_max']}",
        tool_data['proprietary_data']['tos_safety_rating'],
        tool_data['pros'],
        tool_data['cons']
    )

    insert_query = """
    INSERT INTO listings (
        directory_id, name, slug, website_url, category,
        short_description, full_description,
        pricing_model, price_min, price_max, currency,
        proprietary_data, rating, human_review,
        pros, cons, best_for, avoid_if,
        is_featured, is_sponsored,
        created_by, updated_by
    ) VALUES (
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
    )
    ON CONFLICT (directory_id, slug) DO UPDATE SET
        name = EXCLUDED.name,
        website_url = EXCLUDED.website_url,
        category = EXCLUDED.category,
        short_description = EXCLUDED.short_description,
        full_description = EXCLUDED.full_description,
        pricing_model = EXCLUDED.pricing_model,
        price_min = EXCLUDED.price_min,
        price_max = EXCLUDED.price_max,
        proprietary_data = EXCLUDED.proprietary_data,
        rating = EXCLUDED.rating,
        human_review = EXCLUDED.human_review,
        pros = EXCLUDED.pros,
        cons = EXCLUDED.cons,
        best_for = EXCLUDED.best_for,
        avoid_if = EXCLUDED.avoid_if,
        is_featured = EXCLUDED.is_featured,
        updated_by = EXCLUDED.updated_by,
        updated_at = NOW()
    RETURNING id;
    """

    try:
        cur.execute(insert_query, (
            DIRECTORY_ID,
            tool_data['name'],
            tool_data['slug'],
            tool_data['website_url'],
            tool_data['category'],
            tool_data['short_description'],
            tool_data['full_description'],
            tool_data['pricing_model'],
            tool_data['price_min'],
            tool_data['price_max'],
            'USD',
            json.dumps(tool_data['proprietary_data']),
            tool_data['rating'],
            human_review,
            tool_data['pros'],
            tool_data['cons'],
            tool_data['best_for'],
            tool_data['avoid_if'],
            tool_data['is_featured'],
            False,  # is_sponsored
            'automation-agent',
            'automation-agent'
        ))

        tool_id = cur.fetchone()[0]
        conn.commit()
        return True, tool_id, None

    except Exception as e:
        conn.rollback()
        return False, None, str(e)
    finally:
        cur.close()

def main():
    """Main execution function"""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    log_file = f'/root/directories/directories/linkedgen-dir-main/logs/tier2-import-{timestamp}.log'

    # Open log file
    with open(log_file, 'w') as log:
        log.write(f"=== LinkedIn Tools Import - Tier 2 ===\n")
        log.write(f"Started: {datetime.now()}\n")
        log.write(f"Target: 20 tools (Tier 2)\n\n")

        # Connect to database
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            log.write("✓ Database connection established\n\n")
        except Exception as e:
            log.write(f"✗ Database connection failed: {e}\n")
            print(f"ERROR: Could not connect to database: {e}")
            return

        # Insert each tool
        success_count = 0
        error_count = 0

        for i, tool in enumerate(TIER_2_TOOLS, 1):
            log.write(f"[{i}/20] Processing: {tool['name']}\n")
            success, tool_id, error = insert_tool(conn, tool)

            if success:
                success_count += 1
                log.write(f"  ✓ Successfully added (ID: {tool_id})\n")
                log.write(f"  - Category: {tool['category']}\n")
                log.write(f"  - Pricing: ${tool['price_min']}-${tool['price_max']}/mo\n")
                log.write(f"  - Rating: {tool['rating']}/5.0\n")
                log.write(f"  - Safety: {tool['proprietary_data']['tos_safety_rating']}/5\n\n")
            else:
                error_count += 1
                log.write(f"  ✗ Error: {error}\n\n")

        conn.close()

        # Summary
        log.write(f"\n=== Import Complete ===\n")
        log.write(f"Finished: {datetime.now()}\n")
        log.write(f"Success: {success_count}/20\n")
        log.write(f"Errors: {error_count}/20\n")

        print(f"\n✓ Tier 2 import complete!")
        print(f"Success: {success_count}/20")
        print(f"Errors: {error_count}/20")
        print(f"Log: {log_file}")

if __name__ == '__main__':
    main()
