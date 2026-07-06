import os
import re
import yaml

content_dir = r"c:\nexus\Calculator-Hub\content"

def fix_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = content
    
    # 1. Fix "- answer:" to "answer:"
    new_content = re.sub(r'(\n\s+)- answer: ', r'\1answer: ', new_content)
    
    # 2. Fix missing "question:" in pdf-to-jpg de
    new_content = re.sub(r'(\n\s+)- ("[^"]+")(\n\s+answer:)', r'\1- question: \2\3', new_content)
    
    # 3. Fix unescaped quotes in image-to-base64
    new_content = new_content.replace('`<img src="...">`', "`<img src='...'>`")
    
    # 4. In pdf-to-jpg de, lines 24 and 26 might be very long because of 'asombrosamente'.
    # If the regex doesn't catch them, we'll manually replace them just in case.
    if "pdf-to-jpg.md" in path and "de" in path:
        new_content = new_content.replace('\n  - "Funktioniert', '\n  - question: "Funktioniert')
        new_content = new_content.replace('\n  - "Gibt', '\n  - question: "Gibt')
    
    if new_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Fixed {path}")
        
    # Validate YAML
    if new_content.startswith("---"):
        end_idx = new_content.find("---", 3)
        if end_idx != -1:
            yaml_str = new_content[3:end_idx]
            try:
                yaml.safe_load(yaml_str)
            except Exception as e:
                print(f"YAML Error in {path}: {e}")

for root, dirs, files in os.walk(content_dir):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            fix_file(path)
