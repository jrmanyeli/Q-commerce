import csv
import re

input_file = '/Users/jrmanyeli/_Development/catalog_products.csv'
output_file = '/Users/jrmanyeli/_Development/Q-commerce/backend/medusa_import_products_final.csv'

# Define collection mapping
collection_map = {
    'NASTY DISPENSARY': 'nasty',
    'MOTI DISPENSARY': 'moti',
    'ELFBAR DISPENSARY': 'elfbar',
    'CANNABIS DISPENSARY': 'cannabis',
    'LIQUOR DISPENSARY': 'liquor',
    'BUGATTI DISPENSARY': 'bugatti'
}

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

with open(input_file, mode='r', encoding='utf-8-sig') as infile:
    reader = csv.DictReader(infile)
    products = []
    
    for row in reader:
        handle = slugify(row['name'])
        collection_raw = row['collection']
        collection_handle = collection_map.get(collection_raw, '')
        
        # Medusa 2.0 CSV Import Headers
        product_data = {
            'Product Handle': handle,
            'Product Title': row['name'],
            'Product Subtitle': '',
            'Product Description': row['description'],
            'Product Status': 'published',
            'Product Thumbnail': f"https://static.wixstatic.com/media/{row['productImageUrl']}" if row['productImageUrl'] and not row['productImageUrl'].startswith('http') else row['productImageUrl'],
            'Product Weight': row.get('weight', ''),
            'Product Length': '',
            'Product Width': '',
            'Product Height': '',
            'Product HS Code': '',
            'Product Origin Country': '',
            'Product MID Code': '',
            'Product Material': '',
            'Shipping Profile Id': '', # Will use default
            'Product Sales Channel 1': 'Quick Dose (Pty) Ltd',
            'Product Collection Id': collection_handle,
            'Product Type Id': '',
            'Product Tag 1': '',
            'Product Discountable': 'TRUE',
            'Product External Id': row['handleId'],
            'Variant Title': 'Default',
            'Variant SKU': row['sku'],
            'Variant Barcode': '',
            'Variant Allow Backorder': 'TRUE',
            'Variant Manage Inventory': 'FALSE',
            'Variant Weight': row.get('weight', ''),
            'Variant Length': '',
            'Variant Width': '',
            'Variant Height': '',
            'Variant HS Code': '',
            'Variant Origin Country': '',
            'Variant MID Code': '',
            'Variant Material': '',
            'Variant Price ZAR': row['price'],
            'Variant Option 1 Name': 'Option',
            'Variant Option 1 Value': 'Default',
            'Product Image 1 Url': f"https://static.wixstatic.com/media/{row['productImageUrl']}" if row['productImageUrl'] and not row['productImageUrl'].startswith('http') else row['productImageUrl'],
        }
        products.append(product_data)

# Write to output file
if products:
    with open(output_file, mode='w', encoding='utf-8', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=products[0].keys())
        writer.writeheader()
        writer.writerows(products)
    print(f"Transformed {len(products)} products to {output_file}")
else:
    print("No products found to transform.")
