# Script to move generated images to the public folder
$brainDir = "C:\Users\sahil\.gemini\antigravity\brain\5832c506-a933-494b-b082-0b158c214c51"
$publicDir = "c:\Users\sahil\OneDrive\Desktop\FREE CODEBASE\Interior Design\WeDesign\public\img\generated"

# Create directory if it doesn't exist
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir
}

# Copy files
Copy-Item "$brainDir\port_living_indian_modern_1777699957625.png" "$publicDir\port_living_modern.png" -Force
Copy-Item "$brainDir\port_bedroom_indian_modern_1777699979099.png" "$publicDir\port_bedroom_modern.png" -Force
Copy-Item "$brainDir\port_bathroom_indian_modern_1777699999479.png" "$publicDir\port_bathroom_modern.png" -Force

# New Living Images
Copy-Item "$brainDir\living_minimalist_zen_1777700335801.png" "$publicDir\port_liv_minimalist.png" -Force
Copy-Item "$brainDir\living_industrial_modern_1777700357277.png" "$publicDir\port_liv_industrial.png" -Force
Copy-Item "$brainDir\living_royal_traditional_1777700379750.png" "$publicDir\port_liv_royal.png" -Force
Copy-Item "$brainDir\living_bohemian_modern_1777700401591.png" "$publicDir\port_liv_boho.png" -Force

# New Bedroom Images
Copy-Item "$brainDir\bedroom_skyline_view_1777700423039.png" "$publicDir\port_bed_skyline.png" -Force
Copy-Item "$brainDir\bedroom_cozy_traditional_1777700446480.png" "$publicDir\port_bed_cozy.png" -Force
Copy-Item "$brainDir\bedroom_sleek_monochrome_1777700470333.png" "$publicDir\port_bed_monochrome.png" -Force
Copy-Item "$brainDir\bedroom_art_deco_1777700493824.png" "$publicDir\port_bed_artdeco.png" -Force

# New Bathroom Images
Copy-Item "$brainDir\bathroom_spa_style_1777700518292.png" "$publicDir\port_bath_spa.png" -Force
Copy-Item "$brainDir\bathroom_ultra_modern_1777700543841.png" "$publicDir\port_bath_ultra.png" -Force
Copy-Item "$brainDir\bathroom_marble_gold_classic_1777700561712.png" "$publicDir\port_bath_marble.png" -Force
Copy-Item "$brainDir\bathroom_vintage_modern_1777700583240.png" "$publicDir\port_bath_vintage.png" -Force

Write-Host "Images moved successfully!"
