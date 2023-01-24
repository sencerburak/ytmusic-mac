rm Icon.icns
rm iconTemplate.png
rm iconTemplate@2x.png

mkdir Icon.iconset
sips -z 16 16 icon_512x512.png --out Icon.iconset/icon_16x16.png
sips -z 32 32 icon_512x512.png --out Icon.iconset/icon_16x16@2x.png
sips -z 32 32 icon_512x512.png --out Icon.iconset/icon_32x32.png
sips -z 64 64 icon_512x512.png --out Icon.iconset/icon_32x32@2x.png
sips -z 64 64 icon_512x512.png --out Icon.iconset/icon_64x64.png
sips -z 128 128 icon_512x512.png --out Icon.iconset/icon_128x128.png
sips -z 256 256 icon_512x512.png --out Icon.iconset/icon_256x256.png
sips -z 512 512 icon_512x512.png --out Icon.iconset/icon_512x512.png

cp Icon.iconset/icon_16x16.png iconTemplate.png
cp Icon.iconset/icon_16x16@2x.png iconTemplate@2x.png

iconutil -c icns Icon.iconset

rm -r Icon.iconset