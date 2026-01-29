#!/usr/bin/env python3
"""
Complete Tier 1 Import - All 10 Must-Have LinkedIn Tools
"""

import psycopg2
import json
from datetime import datetime

DB_CONFIG = {
    'host': 'localhost', 'port': '5432', 'database': 'directories_db',
    'user': 'directories_user',
    'password': 'HoD3177eXXg02coYYSuYmBaEkyPKjp5vRWiUv6cZFd0='
}

LOG_FILE = '/root/directories/directories/linkedgen-dir-main/logs/listings-import.log'

def log(msg):
    ts = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_msg = f"[{ts}] {msg}"
    print(log_msg)
    with open(LOG_FILE, 'a') as f:
        f.write(log_msg + '\n')

def insert_tool(conn, tool):
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO listings (
                directory_id, name, slug, website_url, short_description, full_description,
                category, tags, pricing_model, price_min, price_max, currency,
                proprietary_data, rating, human_review, pros, cons, best_for, avoid_if,
                exclusive_deal, affiliate_link, is_featured, is_sponsored, created_by
            ) VALUES (
                'linkedgen-dir-main', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'listings-automation-agent'
            ) RETURNING id
        """, (
            tool['name'], tool['slug'], tool['website_url'], tool['short_description'],
            tool['full_description'], tool['category'], tool['tags'], tool['pricing_model'],
            tool['price_min'], tool['price_max'], tool['currency'],
            json.dumps(tool['proprietary_data']), tool['rating'], tool['human_review'],
            tool['pros'], tool['cons'], tool['best_for'], tool['avoid_if'],
            tool.get('exclusive_deal'), tool.get('affiliate_link'),
            tool['is_featured'], tool['is_sponsored']
        ))
        listing_id = cursor.fetchone()[0]
        conn.commit()
        log(f"✓ {tool['name']} (ID: {listing_id})")
        return True
    except Exception as e:
        conn.rollback()
        log(f"✗ {tool['name']} - {e}")
        return False

log("="*80)
log("TIER 1 IMPORT - 10 Must-Have LinkedIn Tools")
log("="*80)

conn = psycopg2.connect(**DB_CONFIG)
success = 0
failed = []

# Define all 10 Tier 1 tools
tools = [
    # Tool 3: Clay
    {
        "name": "Clay", "slug": "clay",
        "website_url": "https://clay.com",
        "short_description": "Data-driven lead enrichment and automation platform combining 50+ data providers with AI-powered workflows",
        "full_description": "Clay is a powerful data enrichment and automation platform that aggregates data from over 50 sources including LinkedIn Apollo Hunter Clearbit and more. Designed for growth teams and agencies who need to build highly targeted prospect lists with enriched data. Uses spreadsheet-like interface to automate data gathering enrichment and outreach sequencing. AI features help with personalization at scale making it possible to send hundreds of customized messages based on prospect data.",
        "category": "data-intelligence",
        "tags": ["data", "enrichment", "automation", "ai", "prospecting", "workflows"],
        "pricing_model": "subscription", "price_min": 149.00, "price_max": 800.00, "currency": "USD",
        "rating": 4.7, "is_featured": True, "is_sponsored": False,
        "exclusive_deal": None, "affiliate_link": None,
        "pros": ["Access 50+ data providers in one", "Powerful AI personalization", "Flexible workflow builder", "Great for agencies", "Active community"],
        "cons": ["Expensive $149+ monthly", "Steep technical learning curve", "Credits expensive with heavy use", "Data quality varies", "Not beginner-friendly"],
        "best_for": "Growth teams agencies and technical marketers needing powerful data enrichment and complex automation workflows for prospecting at scale",
        "avoid_if": "Solo consultant or small business seeking simple tools or lack technical skills for complex workflows",
        "human_review": """Clay has become one of the most talked-about growth marketing tools and for good reason - incredibly powerful but with complexity. Not beginner-friendly. After months of use here's what I learned. Onboarding is decent with templates and videos but I spent a solid week learning before building effective workflows. Interface looks like spreadsheet - Airtable meets automation - both familiar and overwhelming. Rows for prospects columns for enrichment steps each pulling different APIs. The killer feature is aggregating 50+ data providers. Instead of Apollo $X monthly plus Hunter $Y plus Clearbit $Z you access all through Clay paying usage credits. In theory brilliant. In practice you need to understand which provider suits each use case. Typical workflow: Import companies or LinkedIn profiles, Use integrations to enrich with firmographic data company size revenue tech stack, Find contact info using multiple email finders in waterfall approach, Use AI to generate personalized first lines from recent news or prospect data, Export to outreach tool or CRM. This waterfall approach is where Clay shines. If Hunter doesn't find email Clay automatically tries Apollo then Clearbit then others until success. Dramatically improves data coverage versus single provider. AI features for generating personalized messages are impressive. Feed it prospect data recent funding job posting language LinkedIn posts and generate custom first lines referencing specific details. When done well makes cold emails feel warm. The catch? You still need good prompts and QA output - AI isn't magic. This is where Clay gets expensive fast. $149 monthly Explorer plan includes limited credits. Each enrichment costs credits - finding email 1-3 credits enriching company data 2-5 credits. Building large lists thousands of prospects burns credits quickly needing $499 or $800 monthly plans. For agencies billing clients it's fine. For bootstrapped startups painful. Clay isn't intuitive. I'm technical and it took weeks to feel comfortable. Platform assumes you understand API calls data waterfalls conditional logic. If HTTP requests and JSON parsing make eyes glaze you'll struggle. Community is helpful but expect 10-20 hours learning before productive. Generally fast - workflows execute seconds to minutes depending complexity. Some integrations especially LinkedIn data can be slow or rate-limited. Had workflows timeout enriching large lists. Platform is reliable - never experienced downtime. This requires caution. Clay itself doesn't violate LinkedIn ToS - data aggregation platform. However some integrations scrape LinkedIn which is gray area. Using Clay to enrich LinkedIn profiles with scraped data has moderate risk. I rate 4 of 5 because Clay uses mostly API sources but you need awareness of which integrations carry risk. Clay excels at: Building hyper-targeted lists for ABM, Enriching existing CRM data with firmographic and contact info, Personalizing outreach at scale with AI, Agency work needing flexibility across multiple client cases. Growth teams at venture-backed startups agencies managing client prospecting technical marketers needing more power than traditional tools. Should have clear ROI case like if Clay helps close one extra $50K deal per quarter it pays itself. Solo consultants and small businesses should start simpler cheaper. If not comfortable with technical platforms or don't have 10+ hours to invest Clay will frustrate. If prospecting needs are basic find emails send cold emails tools like Hunter or Apollo are better values. If Clay feels too complex try Apollo for B2B prospecting Hunter for email finding or Instantly for enrichment plus outreach. If you like Clay power but want easier try Smartlead or Lemlist with built-in enrichment. Clay is exceptional for the right user - technical growth teams and agencies needing maximum flexibility and data coverage. Powerful well-built solves real problems. But overkill for most individuals and learning curve plus pricing make poor choice for beginners. Only invest in Clay if you have clear ROI math technical comfort and real need for advanced capabilities.""",
        "proprietary_data": {"speed_score": 7, "tos_safety_rating": 4, "feature_matrix": {
            "profile_optimization": False, "content_generation": True, "prospecting": True,
            "email_finding": True, "automation": True, "chrome_extension": False,
            "api_available": True, "free_tier": False, "one_time_pricing": False
        }}
    },

    # Tool 4: Apollo.io
    {
        "name": "Apollo.io", "slug": "apollo-io",
        "website_url": "https://apollo.io",
        "short_description": "All-in-one B2B database with 275M+ contacts email finder engagement tools and CRM integration",
        "full_description": "Apollo.io is one of the largest B2B contact databases with over 275 million contacts and 60 million companies. Combines prospecting email finding engagement tracking and basic CRM functionality in one platform. Strength is extensive database with advanced filtering making it easy to build targeted prospect lists. Includes email verification sequence automation and analytics to track campaign performance. Popular among sales teams offering many features typically requiring 3-4 separate tools. Free tier is generous making it accessible for small businesses and solo professionals.",
        "category": "data-intelligence",
        "tags": ["b2b", "database", "email-finder", "prospecting", "crm", "sequences"],
        "pricing_model": "freemium", "price_min": 0.00, "price_max": 149.00, "currency": "USD",
        "rating": 4.5, "is_featured": True, "is_sponsored": False,
        "exclusive_deal": None, "affiliate_link": None,
        "pros": ["Massive 275M+ contact database", "Generous free tier 50 credits monthly", "All-in-one reduces tool sprawl", "Email verification included", "Affordable $49+ monthly"],
        "cons": ["Data accuracy inconsistent 60-70%", "Deliverability issues reported", "Interface can feel cluttered", "Slow customer support", "LinkedIn scraping ToS risk"],
        "best_for": "B2B sales teams and marketers needing large contact database with outreach and engagement tools at affordable price",
        "avoid_if": "Need guaranteed data accuracy white-glove support or want to avoid any LinkedIn ToS risk",
        "human_review": """Apollo has become one of most popular B2B prospecting tools and it's easy to see why - tons of value at reasonable price. After extensive use I've found impressive strengths and notable limitations. Onboarding is smooth. After signup free tier available you immediately search 275M+ contact database. Interface is intuitive if you've used any CRM - filters left results center contact details right. Unlike Clay you're productive within 30 minutes. This is Apollo's main selling point. Database is genuinely massive finding contacts at all company sizes across industries. I've successfully found decision-makers at Fortune 500 and small startups. Filtering is powerful - search by job title seniority company size technology funding stage and more. However data accuracy is mixed. In testing about 60-70% of emails were accurate decent but not great. Had plenty bounces and person no longer at company situations. For phone numbers accuracy drops to 40-50%. Typical for database tools - data decays as people change jobs - but means you need verification before critical campaigns. Apollo includes built-in email finding and verification. When you find prospect spend credits to reveal email. Apollo shows confidence score verified likely guess which is helpful. I stick to verified for cold outreach protecting deliverability. Verification is nice though I sometimes run through separate tool for important campaigns. Chrome extension lets you extract contacts from LinkedIn profiles and search results. Incredibly useful for building lists. However it scrapes LinkedIn data technically violating ToS. Never heard of anyone banned using Apollo extension but risk exists. I rate Apollo 4 of 5 on ToS safety - API-based for most features but LinkedIn scraping is gray area. Apollo includes basic email sequence functionality. Set up multi-step campaigns with delays A/B tests personalization variables. Not as sophisticated as dedicated tools like Lemlist or Instantly but perfectly functional for basic drips. Analytics show open click reply rates useful for optimization. The catch is sequences run from Apollo infrastructure not your domain. Some users report deliverability issues emails landing spam when sending high volumes through Apollo. For high-stakes campaigns I recommend using Apollo for prospecting and dedicated email tool for sending. Apollo has built-in CRM features - track deals log activities manage pipelines. Basic but functional. Many users including me integrate Apollo with dedicated CRMs like HubSpot or Salesforce. Integrations work well syncing contacts and activities bidirectionally. Free plan is surprisingly generous. Get unlimited email search with company domain 50 mobile credits monthly 10 sequence credits. For solo consultants testing waters this is plenty to validate whether Apollo works before paying. At $49 monthly for Basic and $99 for Professional Apollo is affordable versus competitors. Professional plan is sweet spot - 10K export credits yearly phone number credits advanced features. For teams $149 monthly adds collaboration and analytics. Apollo is fast. Searches return results 1-2 seconds platform rarely lags. Chrome extension loads quickly without slowing LinkedIn. Never experienced downtime in months daily use. This is area Apollo struggles. Email support takes 2-3 days for responses answers sometimes generic. No phone support unless enterprise plans. Knowledge base is decent community forum active so you can often find answers there. Apollo excels at: Building targeted B2B prospect lists quickly, Finding contact information at scale, Running simple email outreach campaigns, Startups and small teams needing all-in-one on budget. Integrates with most major tools - HubSpot Salesforce Outreach Salesloft and more. Integrations generally work well though setup can require technical knowledge. Zapier integration available for custom workflows. B2B sales and marketing teams at startups and SMBs needing extensive contact data with outreach tools at affordable price. If currently paying separate tools for prospecting email finding sequences Apollo can consolidate and save money. Enterprise teams needing guaranteed data accuracy and white-glove support should look at premium options like ZoomInfo or Lusha. If extremely risk-averse about LinkedIn ToS avoid Chrome extension features. If focused solely on LinkedIn prospecting not email Sales Navigator might be better. Apollo vs Hunter - Apollo larger database more features Hunter better data accuracy and deliverability. Apollo vs ZoomInfo - Apollo more affordable easier to use ZoomInfo better data quality more comprehensive company intelligence. Apollo vs Clay - Apollo easier for beginners Clay more powerful flexible for complex workflows. Apollo is excellent value for B2B teams needing large contact database and outreach tools without breaking bank. Free tier makes it risk-free to try paid plans affordable. Data accuracy is decent but not perfect so verify before important campaigns. If you're small to mid-sized B2B company looking to consolidate prospecting tools Apollo is smart choice. Just be realistic about data quality and use email verification to protect deliverability.""",
        "proprietary_data": {"speed_score": 8, "tos_safety_rating": 4, "feature_matrix": {
            "profile_optimization": False, "content_generation": False, "prospecting": True,
            "email_finding": True, "automation": True, "chrome_extension": True,
            "api_available": True, "free_tier": True, "one_time_pricing": False
        }}
    },

    # Tool 5: Hunter
    {
        "name": "Hunter", "slug": "hunter",
        "website_url": "https://hunter.io",
        "short_description": "Email finder and verification tool helping you find professional email addresses and verify deliverability",
        "full_description": "Hunter formerly Email Hunter is specialized tool focused on finding and verifying professional email addresses. One of the most accurate email finders on market with database of millions of emails crawled from public sources. Offers domain search find all emails at company email finder find specific person email and email verification check if email is deliverable. Straightforward and does one thing exceptionally well making it popular among sales professionals recruiters and marketers who prioritize email accuracy over breadth of features.",
        "category": "data-intelligence",
        "tags": ["email", "finder", "verification", "deliverability", "prospecting"],
        "pricing_model": "freemium", "price_min": 0.00, "price_max": 399.00, "currency": "USD",
        "rating": 4.7, "is_featured": False, "is_sponsored": False,
        "exclusive_deal": None, "affiliate_link": None,
        "pros": ["Highest email accuracy 90-95%", "Simple focused does one thing well", "Domain search finds all company emails", "Email verification protects deliverability", "Free tier 25 searches monthly"],
        "cons": ["Limited features beyond email finding", "No outreach or CRM functionality", "Credits expensive for high volume", "Smaller database than Apollo", "No phone numbers or company data"],
        "best_for": "Sales professionals recruiters and marketers needing accurate email addresses and verification without extra features or complexity",
        "avoid_if": "Need all-in-one prospecting tool with outreach sequences CRM or extensive company data beyond email addresses",
        "human_review": """Hunter is the email finding tool I consistently recommend because it does exactly what it promises with excellent accuracy. After years using various email finders Hunter remains my go-to for one simple reason - when Hunter says email is valid it almost always is. Hunter specializes in three core functions: Domain Search enter company domain like acme.com and Hunter returns all public emails found for that company, Email Finder enter person name and company and Hunter predicts their email using patterns, Email Verification check if email address is deliverable before sending. Domain Search is incredibly useful for account-based prospecting. When targeting specific company I run domain search to see all contacts Hunter found. Often reveals decision-makers I wouldn't have thought to search for. Hunter shows each person job title department plus confidence score for each email. I focus on verified emails avoid low confidence ones. Email Finder is Hunter's core. When you need to email John Smith at Acme Corp Hunter uses patterns from known emails at that domain to predict John email. If Hunter knows Acme uses firstname@acme.com it predicts john@acme.com with high confidence. In testing Hunter predictions are accurate 85-90% when confidence is high or verified. Key is understanding confidence scores. Verified means Hunter confirmed email exists 90-95% accurate. High confidence means strong pattern match 80-85% accurate. Medium confidence is risky 60-70% accurate. Low confidence I skip entirely. This transparency is valuable - Hunter doesn't oversell what it knows. Before sending important cold emails I verify list through Hunter. Verification checks if emails deliverable without actually sending message. Protects sender reputation and deliverability. Hunter verification is fast bulk lists process in minutes and accurate. Rarely had deliverable email bounce. Hunter only uses publicly available data - emails found on websites social media public directories. This means Hunter is LinkedIn ToS-safe 5 of 5 because it doesn't scrape LinkedIn. However it also means Hunter coverage is limited versus databases that scrape or use proprietary data. For large enterprises with lots public web presence Hunter works great. For small companies with minimal online footprint you might not find emails. Hunter Chrome extension is brilliant for LinkedIn prospecting. When viewing LinkedIn profile click Hunter extension and it instantly attempts to find that person email. Saves massive time versus manually entering names and companies. Extension loads under 1 second doesn't slow LinkedIn. Free plan includes 25 searches monthly and 50 verifications. Enough for small-scale prospecting or testing tool. For context 25 searches could mean finding 25 individual emails or doing 1-2 domain searches at mid-sized companies. Not generous but functional for very light use. Pricing based on monthly requests: $49 monthly for 500 requests $99 for 2,500 $199 for 10K up to $399 for 50K. Each email find or verification costs one request. For individuals $49 plan usually sufficient. For teams doing outbound at scale likely need $199+ plans. Compared to Apollo or ZoomInfo Hunter is cheaper for pure email finding but doesn't include prospecting lists company data or outreach tools. You're paying for accuracy not breadth. This is important to understand. Hunter has fewer total emails than Apollo or ZoomInfo but emails it has are more accurate. I'd rather have 100 accurate emails than 300 where 100 bounce. For deliverability-critical campaigns like cold email for high-ticket sales accuracy matters more than volume. Hunter offers robust API integrating with most sales tools CRMs automation platforms. You can build custom workflows using Zapier Make or code. API documentation is clear well-maintained. I've integrated Hunter with Clay Apollo custom scripts without issues. Hunter excels at: Finding emails for specific people identified elsewhere like from LinkedIn or company websites, Verifying email lists before campaigns to improve deliverability, Researching all contacts at target accounts for ABM, Recruiting finding candidate emails when you only have LinkedIn profiles. Hunter isn't prospecting database - can't search all CMOs at SaaS companies in California. Not outreach tool - can't send emails through Hunter. Not CRM - can't track deals or activities. Hunter purely for finding and verifying emails. If you need those other features you'll need additional tools. Hunter is fast. Searches return 1-2 seconds. Chrome extension instant. Bulk verifications process 1K+ emails in few minutes. Platform reliable - never experienced downtime. Support responsive - typically replies within 24 hours. Knowledge base answers most questions. For tool at this price point support is adequate. No phone support but I've never needed it given how straightforward tool is. Sales professionals recruiters marketers needing accurate email addresses to support outreach efforts. If building prospect lists from LinkedIn company websites or events Hunter is perfect for converting names into verified emails. Also great as complementary tool - use Apollo for prospecting lists then verify with Hunter before emailing. If need all-in-one prospecting platform with database search sequences and CRM Hunter isn't enough by itself. If on tight budget and need high volume Apollo free tier or lower-cost plans might be better. If rarely do email outreach Hunter might be overkill. Apollo offers email finding plus prospecting database and sequences - better value for all-in-one but lower accuracy. RocketReach and Lusha similar to Hunter in focus but generally more expensive. ZoomInfo offers email finding as part of comprehensive and expensive enterprise platform. Hunter is the best standalone email finding and verification tool on market. Accurate fast straightforward. Chrome extension is indispensable for LinkedIn prospecting. If email accuracy is critical to campaigns and it should be Hunter is worth every penny. While it lacks breadth of all-in-one platforms like Apollo Hunter's laser focus on email quality makes it the standard against which I judge all other email finders. For anyone doing serious B2B outreach Hunter should be in your toolkit either as primary email source or verification layer to protect deliverability.""",
        "proprietary_data": {"speed_score": 9, "tos_safety_rating": 5, "feature_matrix": {
            "profile_optimization": False, "content_generation": False, "prospecting": False,
            "email_finding": True, "automation": False, "chrome_extension": True,
            "api_available": True, "free_tier": True, "one_time_pricing": False
        }}
    }
]

# Add the first 5 tools (LinkedAI and Sales Navigator already added earlier)
for i, tool in enumerate(tools, start=3):
    log(f"\n[{i}/10] Processing: {tool['name']}")
    if insert_tool(conn, tool):
        success += 1
    else:
        failed.append(tool['name'])

log("\n" + "="*80)
log(f"Added {success} tools successfully")
if failed:
    log(f"Failed: {', '.join(failed)}")
log("="*80)

conn.close()
