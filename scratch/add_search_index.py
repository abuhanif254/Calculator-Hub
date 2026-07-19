import json
import datetime

file_path = "c:/nexus/Calculator-Hub/public/search-index.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# check if already exists
exists = any(tool["slug"] == "tip-calculator" for tool in data["tools"])

if not exists:
    new_tool = {
        "objectID": "tip-calculator",
        "slug": "tip-calculator",
        "title": "Tip Calculator",
        "description": "Calculate standard tips, service charges, discounts, sales taxes, and split restaurant bills instantly across multiple currencies and international customs.",
        "type": "calculator",
        "category": "Financial",
        "categoryId": "financial",
        "keywords": [
            "tip calculator",
            "bill splitter",
            "split bill",
            "restaurant tip",
            "gratuity calculator",
            "calculate tip",
            "tip splitting",
            "international tipping",
            "dining calculator"
        ],
        "href": "/calculators/tip-calculator"
    }
    data["tools"].append(new_tool)
    data["totalTools"] = len(data["tools"])
    data["updatedAt"] = datetime.datetime.utcnow().isoformat() + "Z"
    
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, separators=(',', ':'), ensure_ascii=False)
    print("Tip Calculator successfully added to search-index.json")
else:
    print("Tip Calculator already exists in search-index.json")
