#!/usr/bin/env python3
"""
LinkedIn Lead Generation Tools - Complete Tier 1 Import Script
Adds all 10 must-have tools with complete proprietary data
"""

import psycopg2
import json
from datetime import datetime
import sys

# Database connection
DB_CONFIG = {
    'host': 'localhost',
    'port': '5432',
    'database': 'directories_db',
    'user': 'directories_user',
    'password': 'HoD3177eXXg02coYYSuYmBaEkyPKjp5vRWiUv6cZFd0='
}

LOG_FILE = '/root/directories/directories/linkedgen-dir-main/logs/listings-import.log'

def log(message):
    """Log message to file and console"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_msg = f"[{timestamp}] {message}"
    print(log_msg)
    with open(LOG_FILE, 'a') as f:
        f.write(log_msg + '\n')

def get_db_connection():
    """Create database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        log("Database connection established")
        return conn
    except Exception as e:
        log(f"ERROR: Database connection failed: {e}")
        sys.exit(1)

def insert_listing(conn, tool_data):
    """Insert a single tool into the listings table"""
    try:
        cursor = conn.cursor()

        insert_query = """
        INSERT INTO listings (
            directory_id, name, slug, website_url, short_description, full_description,
            category, tags, pricing_model, price_min, price_max, currency,
            proprietary_data, rating, human_review, pros, cons, best_for, avoid_if,
            exclusive_deal, affiliate_link, is_featured, is_sponsored, created_by
        ) VALUES (
            'linkedgen-dir-main', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'listings-automation-agent'
        )
        RETURNING id, name;
        """

        cursor.execute(insert_query, (
            tool_data['name'],
            tool_data['slug'],
            tool_data['website_url'],
            tool_data['short_description'],
            tool_data['full_description'],
            tool_data['category'],
            tool_data['tags'],
            tool_data['pricing_model'],
            tool_data['price_min'],
            tool_data['price_max'],
            tool_data['currency'],
            json.dumps(tool_data['proprietary_data']),
            tool_data['rating'],
            tool_data['human_review'],
            tool_data['pros'],
            tool_data['cons'],
            tool_data['best_for'],
            tool_data['avoid_if'],
            tool_data.get('exclusive_deal'),
            tool_data.get('affiliate_link'),
            tool_data['is_featured'],
            tool_data['is_sponsored']
        ))

        result = cursor.fetchone()
        conn.commit()

        log(f"SUCCESS: Added '{tool_data['name']}' (ID: {result[0]})")
        return True

    except Exception as e:
        conn.rollback()
        log(f"ERROR: Failed to add '{tool_data['name']}': {e}")
        return False

# Continue reading tools from the separate JSON file
def load_tools_data():
    """Load tools data from JSON file"""
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_file = os.path.join(script_dir, 'tier1_tools_data.json')

    with open(json_file, 'r') as f:
        return json.load(f)

def main():
    """Main import process"""
    log("=" * 80)
    log("LinkedIn Lead Generation Tools - Tier 1 Import")
    log("Starting import of 10 must-have tools")
    log("=" * 80)

    conn = get_db_connection()

    tools = load_tools_data()

    success_count = 0
    failed_tools = []

    for i, tool in enumerate(tools, 1):
        log(f"\n[{i}/{len(tools)}] Processing: {tool['name']}")
        log(f"  Category: {tool['category']}")
        log(f"  Pricing: {tool['pricing_model']} - ${tool['price_min']}")
        log(f"  ToS Safety: {tool['proprietary_data']['tos_safety_rating']}/5")
        log(f"  Speed Score: {tool['proprietary_data']['speed_score']}/10")

        if insert_listing(conn, tool):
            success_count += 1
        else:
            failed_tools.append(tool['name'])

    conn.close()

    # Summary
    log("\n" + "=" * 80)
    log("IMPORT COMPLETE - Tier 1 Summary")
    log("=" * 80)
    log(f"Tools processed: {len(tools)}")
    log(f"Successfully added: {success_count}")
    log(f"Failed: {len(failed_tools)}")

    if failed_tools:
        log(f"\nFailed tools: {', '.join(failed_tools)}")

    log("\nNext steps:")
    log("1. Review the tools in the admin panel")
    log("2. Continue with Tier 2 (25 tools)")
    log("3. Proceed to Tier 3 (45 tools)")
    log("=" * 80)

if __name__ == "__main__":
    main()
