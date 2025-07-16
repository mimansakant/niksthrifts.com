import pandas as pd
import requests
import time

# Load the CSV
df = pd.read_csv("FINAL WEBSITE THRIFT LIST .xlsx - Sheet1.csv")

# Use your API key
API_KEY = "f17f921fa508415ca854dcf6d9140d55"
GEOCODE_URL = "https://api.geoapify.com/v1/geocode/search"

# Add empty columns for lat/lon if not present
if 'latitude' not in df.columns:
    df['latitude'] = None
if 'longitude' not in df.columns:
    df['longitude'] = None

total = len(df)
for idx, row in df.iterrows():
    address = row['ADDRESS ']  # adjust this if the column is named differently
    params = {
        "text": address,
        "apiKey": API_KEY,
    }

    response = requests.get(GEOCODE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        features = data.get("features")
        if features:
            coords = features[0]["geometry"]["coordinates"]
            df.at[idx, "longitude"] = coords[0]
            df.at[idx, "latitude"] = coords[1]
            print(f"[{idx + 1}/{total}] Geocoded: {address}")
        else:
            print(f"[{idx + 1}/{total}] No result for: {address}")
    else:
        print(f"[{idx + 1}/{total}] Error {response.status_code} for: {address}")

    time.sleep(1)  # avoid rate limits

# Save the new CSV
df.to_csv("geocoded_thrift_stores.csv", index=False)
print("\n✅ Geocoding complete! Saved as geocoded_thrift_stores.csv.")
