import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    changed = False

    for i, line in enumerate(lines):
        if 'x-axis' in line and '[' in line and ']' in line:
            match = re.search(r'\[(.*?)\]', line)
            if match:
                inner = match.group(1)
                parts = inner.split(',')
                new_parts = []
                for p in parts:
                    p = p.strip()
                    if not p:
                        continue
                    if p.startswith('"') and p.endswith('"'):
                        new_parts.append(p)
                    else:
                        is_num = False
                        try:
                            float(p)
                            is_num = True
                        except ValueError:
                            pass
                        
                        if is_num:
                            new_parts.append(p)
                        else:
                            new_parts.append(f'"{p}"')
                
                new_inner = ", ".join(new_parts)
                new_line = line[:match.start()] + '[' + new_inner + ']' + line[match.end():]
                if new_line != line:
                    lines[i] = new_line
                    changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        print(f"Fixed: {filepath}")

for root, dirs, files in os.walk('C:\\nexus\\Calculator-Hub\\content'):
    for file in files:
        if file.endswith('.md'):
            fix_file(os.path.join(root, file))
print("Done!")
