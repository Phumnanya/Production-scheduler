from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Base WHO API URL
BASE_URL = "https://ghoapi.azureedge.net/api"

# Updated indicator codes (sample placeholders — replace with actual indicators as needed)
INDICATORS = {
    "hepatitis_b": "SDGHEPHBSAGPRV",
    "hiv": "HIV_0000000026",
    "malaria": "MALARIA_EST_INCIDENCE",
    "yellow_fever": "WHS3_50",
    "tuberculosis": "MDG_0000000020"
}

# Focused countries
COUNTRIES = ["UGA", "KEN", "COD"]  # Uganda, Kenya, DR Congo

# Function to fetch data
def fetch_data(indicator, country, start_year, end_year):
    url = f"{BASE_URL}/{indicator}?$filter=SpatialDim eq '{country}' and TimeDim ge {start_year} and TimeDim le {end_year}"
    try:
        res = requests.get(url)
        res.raise_for_status()
        return res.json().get("value", [])
    except requests.RequestException as e:
        print(f"⚠️ Error fetching {indicator} for {country}: {e}")
        return []

@app.route("/fetch-data")
def fetch_all():
    # Query params or defaults
    start_year = request.args.get("start_year", default=2020, type=int)
    end_year = request.args.get("end_year", default=2024, type=int)

    results = []

    for disease, indicator_code in INDICATORS.items():
        for country in COUNTRIES:
            case_data = fetch_data(indicator_code, country, start_year, end_year)

            results.append({
                "disease": disease,
                "country": country,
                "start_year": start_year,
                "end_year": end_year,
                "cases": case_data
            })

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)



#https://ghoapi.azureedge.net/api/WHS3_62?$filter=SpatialDim%20eq%20%27NGA%27%20and%20TimeDim%20ge%202020%20and%20TimeDim%20le%202024
#https://ghoapi.azureedge.net/api/Indicator?$filter=contains(IndicatorName,'meningitis')
#https://ghoapi.azureedge.net/api/WHS3_62?$filter=SpatialDim eq 'NGA' and TimeDim ge 2020 and TimeDim le 2024
#PRISON_D3_DEATHS_COVID_MRATE
#PRISON_D4_COVID_TOT
#WHS3_50 yellow
