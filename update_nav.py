import os
import re

directory = '.'
html_files = [f for f in os.listdir(directory) if f.endswith('.html') and f != 'dashboard.html']

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # The original navbar format is:
    #     <nav class="navbar">
    #         <div class="container">
    #             <a href="index.html" class="navbar-brand"><i class="ph ph-taxi"></i> LOCAL TAXI</a>
    # 
    #             <div class="nav-links d-none d-lg-flex">
    
    # We want to replace <nav class="navbar"> with <nav class="navbar navbar-expand-xl">
    # We want to add the toggler button after the brand
    # We want to wrap the rest in <div class="collapse navbar-collapse" id="mainNav">
    # And change the inner classes to work in mobile
    
    # Let's do regex replacements
    content = content.replace('<nav class="navbar">', '<nav class="navbar navbar-expand-xl">')
    
    content = content.replace('<a href="index.html" class="navbar-brand"><i class="ph ph-taxi"></i> LOCAL TAXI</a>',
        '<a href="index.html" class="navbar-brand"><i class="ph ph-taxi"></i> LOCAL TAXI</a>\n' +
        '            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" style="border:none; outline:none; box-shadow:none;">\n' +
        '                <i class="ph ph-list" style="font-size: 28px; color: var(--text-primary);"></i>\n' +
        '            </button>\n' +
        '            <div class="collapse navbar-collapse justify-content-end" id="mainNav">')
    
    content = content.replace('<div class="nav-links d-none d-lg-flex">',
        '<div class="nav-links d-flex flex-column flex-xl-row align-items-center mt-4 mt-xl-0 gap-3 gap-xl-4 text-center">')
    
    content = content.replace('<div class="nav-links d-none d-xl-flex align-items-center">',
        '<div class="nav-links d-flex flex-column flex-xl-row align-items-center mt-4 mt-xl-0 ms-xl-4 gap-3 justify-content-center">')
    
    # We need to close the collapse div right before </div>\n    </nav>
    content = content.replace('            </div>\n        </div>\n    </nav>', '            </div>\n            </div>\n        </div>\n    </nav>')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Navbar updated in HTML files")
