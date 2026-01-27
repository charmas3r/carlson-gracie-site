#!/usr/bin/env python3
import markdown
import sys

# Read the markdown file
with open('prd.md', 'r', encoding='utf-8') as f:
    md_content = f.read()

# Convert markdown to HTML
html_content = markdown.markdown(
    md_content,
    extensions=['tables', 'fenced_code', 'codehilite']
)

# Create styled HTML with professional CSS
styled_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Requirements Document - San Diego BJJ Academy</title>
    <style>
        @media print {{
            body {{
                max-width: 100%;
                padding: 0.5in;
            }}
            h1, h2, h3 {{
                page-break-after: avoid;
            }}
            pre, table {{
                page-break-inside: avoid;
            }}
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
            background: #ffffff;
        }}
        
        h1 {{
            color: #782626;
            border-bottom: 3px solid #782626;
            padding-bottom: 0.5rem;
            margin-top: 2rem;
            font-size: 2.5rem;
        }}
        
        h2 {{
            color: #782626;
            border-bottom: 2px solid #d4d4d4;
            padding-bottom: 0.3rem;
            margin-top: 2rem;
            font-size: 2rem;
        }}
        
        h3 {{
            color: #787878;
            margin-top: 1.5rem;
            font-size: 1.5rem;
        }}
        
        h4 {{
            color: #797979;
            margin-top: 1rem;
            font-size: 1.2rem;
        }}
        
        code {{
            background-color: #f6f6f6;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
            color: #782626;
        }}
        
        pre {{
            background-color: #f6f6f6;
            padding: 1rem;
            border-radius: 5px;
            border-left: 4px solid #782626;
            overflow-x: auto;
        }}
        
        pre code {{
            background: none;
            padding: 0;
            color: #333;
        }}
        
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
            font-size: 0.95rem;
        }}
        
        table th {{
            background-color: #782626;
            color: white;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
        }}
        
        table td {{
            border: 1px solid #d4d4d4;
            padding: 0.75rem;
        }}
        
        table tr:nth-child(even) {{
            background-color: #f9f9f9;
        }}
        
        ul, ol {{
            padding-left: 2rem;
        }}
        
        li {{
            margin: 0.5rem 0;
        }}
        
        blockquote {{
            border-left: 4px solid #782626;
            padding-left: 1rem;
            margin-left: 0;
            color: #666;
            font-style: italic;
        }}
        
        hr {{
            border: none;
            border-top: 2px solid #d4d4d4;
            margin: 2rem 0;
        }}
        
        strong {{
            color: #782626;
            font-weight: 600;
        }}
        
        a {{
            color: #782626;
            text-decoration: none;
        }}
        
        a:hover {{
            text-decoration: underline;
        }}
        
        .header-meta {{
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 2rem;
        }}
    </style>
</head>
<body>
    {html_content}
</body>
</html>
"""

# Write the HTML file
with open('prd.html', 'w', encoding='utf-8') as f:
    f.write(styled_html)

print("✅ Successfully created prd.html")
print("\nTo create PDF:")
print("1. Open prd.html in your browser")
print("2. Press Cmd+P (Mac) or Ctrl+P (Windows)")
print("3. Select 'Save as PDF'")
print("4. Save and share!")
