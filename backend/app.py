from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Dummy data for landmarks
landmarks = [
    {
        "id": "1",
        "name": "Constitution Hill",
        "category": "Historical",
        "description": "Former prison complex turned museum showcasing South Africa's journey to democracy",
        "latitude": -26.1817,
        "longitude": 28.0448,
        "image_url": "https://images.unsplash.com/photo-1584646098378-0874589d76b1",
        "rating": 4.8,
        "distance": 1.2
    },
    {
        "id": "2",
        "name": "Apartheid Museum",
        "category": "Museum",
        "description": "Powerful museum illustrating apartheid and the history of South Africa",
        "latitude": -26.2338,
        "longitude": 28.0098,
        "image_url": "https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f7",
        "rating": 4.9,
        "distance": 2.5
    },
    {
        "id": "3",
        "name": "Gold Reef City",
        "category": "Entertainment",
        "description": "Theme park and entertainment complex built on an old gold mine",
        "latitude": -26.2342,
        "longitude": 28.0105,
        "image_url": "https://images.unsplash.com/photo-1560127452-42c6b00c5c05",
        "rating": 4.5,
        "distance": 3.1
    },
    {
        "id": "4",
        "name": "Johannesburg Botanical Gardens",
        "category": "Nature",
        "description": "Beautiful gardens featuring diverse plant species and walking trails",
        "latitude": -26.1526,
        "longitude": 28.0054,
        "image_url": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
        "rating": 4.6,
        "distance": 4.0
    },
    {
        "id": "5",
        "name": "Sandton City",
        "category": "Shopping",
        "description": "Premier shopping destination with luxury brands and entertainment",
        "latitude": -26.1072,
        "longitude": 28.0569,
        "image_url": "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
        "rating": 4.7,
        "distance": 2.8
    }
]

# Detailed landmark information
landmark_details = {
    "1": {
        "id": "1",
        "name": "Constitution Hill",
        "category": "Historical",
        "description": "Constitution Hill is a living museum that tells the story of South Africa's journey to democracy. The site is a former prison and military fort that bears testament to South Africa's turbulent past and, today, is home to the country's Constitutional Court, which endorses the rights of all citizens.",
        "audioDescription": "Welcome to Constitution Hill, a living testament to South Africa's journey from apartheid to democracy. This historic site, once a prison complex where both Nelson Mandela and Mahatma Gandhi were held, now stands as a powerful symbol of hope and transformation. As you explore, you'll discover the Old Fort, the Women's Jail, and Number Four prison, each telling compelling stories of struggle and resilience. The site is also home to South Africa's Constitutional Court, housed in a building that artfully incorporates materials from the old prison, symbolizing the transformation of a place of oppression into a beacon of justice and human rights.",
        "history": "The site has a complex history going back to 1892 and was once a notorious prison where many of South Africa's leading political activists were detained. Today, it stands as a beacon of hope and a symbol of South Africa's democratic transition.",
        "latitude": -26.1817,
        "longitude": 28.0448,
        "address": "11 Kotze Street, Braamfontein, Johannesburg, 2017",
        "imageUrl": "https://images.unsplash.com/photo-1584646098378-0874589d76b1",
        "rating": 4.8,
        "websiteUrl": "https://www.constitutionhill.org.za",
        "openingHours": {
            "Monday": "9:00 AM - 5:00 PM",
            "Tuesday": "9:00 AM - 5:00 PM",
            "Wednesday": "9:00 AM - 5:00 PM",
            "Thursday": "9:00 AM - 5:00 PM",
            "Friday": "9:00 AM - 5:00 PM",
            "Saturday": "9:00 AM - 4:00 PM",
            "Sunday": "9:00 AM - 4:00 PM"
        },
        "photos": [
            "https://images.unsplash.com/photo-1584646098378-0874589d76b1",
            "https://images.unsplash.com/photo-1584646098378-0874589d76b2",
            "https://images.unsplash.com/photo-1584646098378-0874589d76b3"
        ],
        "additionalInfo": "Guided tours available. Photography allowed. Wheelchair accessible. On-site café and gift shop available."
    },
    "2": {
        "id": "2",
        "name": "Apartheid Museum",
        "category": "Museum",
        "description": "The Apartheid Museum illustrates the rise and fall of apartheid. A series of 22 individual exhibition areas takes the visitor through a dramatic emotional journey that tells a story of a state-sanctioned system based on racial discrimination.",
        "audioDescription": "Step into the Apartheid Museum, a profound journey through one of the most significant chapters of South African history. Through a series of 22 exhibition areas, you'll experience the emotional story of apartheid, from its implementation to its eventual dismantling. The museum's architecture itself sets the tone, with concrete and steel structures that create a stark, industrial atmosphere. As you move through the exhibits, you'll encounter photographs, artifacts, film footage, and text panels that document the rise and fall of apartheid. The museum experience begins uniquely, with visitors randomly assigned 'white' or 'non-white' tickets, immediately illustrating the arbitrary nature of racial classification under apartheid.",
        "history": "Opened in 2001, the museum is considered the pre-eminent museum dealing with 20th century South Africa, at the heart of which is the apartheid story.",
        "latitude": -26.2338,
        "longitude": 28.0098,
        "address": "Northern Parkway & Gold Reef Rd, Johannesburg, 2001",
        "imageUrl": "https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f7",
        "rating": 4.9,
        "websiteUrl": "https://www.apartheidmuseum.org",
        "openingHours": {
            "Monday": "Closed",
            "Tuesday": "9:00 AM - 5:00 PM",
            "Wednesday": "9:00 AM - 5:00 PM",
            "Thursday": "9:00 AM - 5:00 PM",
            "Friday": "9:00 AM - 5:00 PM",
            "Saturday": "9:00 AM - 5:00 PM",
            "Sunday": "9:00 AM - 5:00 PM"
        },
        "photos": [
            "https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f7",
            "https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f8",
            "https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f9"
        ],
        "additionalInfo": "Audio guides available in multiple languages. No photography allowed inside the museum. Café on premises."
    },
    "3": {
        "id": "3",
        "name": "Gold Reef City",
        "category": "Entertainment",
        "description": "Theme park and entertainment complex built on an old gold mine",
        "audioDescription": "Welcome to Gold Reef City, a unique theme park built on the site of a real 19th-century gold mine. This entertainment complex offers a fascinating blend of history and modern fun. The park recreates the gold rush era of Johannesburg, complete with authentic mine buildings and equipment. You can take an underground mine tour to experience the conditions miners worked in, or enjoy thrilling rides including the Anaconda and Tower of Terror. The complex also features a casino, hotel, and various entertainment venues showcasing South African culture and history.",
        "latitude": -26.2342,
        "longitude": 28.0105,
        "address": "Northern Parkway & Gold Reef Rd, Johannesburg, 2001",
        "imageUrl": "https://images.unsplash.com/photo-1560127452-42c6b00c5c05",
        "rating": 4.5,
        "websiteUrl": "https://www.goldreefcity.co.za",
        "openingHours": {
            "Monday": "9:30 AM - 5:00 PM",
            "Tuesday": "9:30 AM - 5:00 PM",
            "Wednesday": "9:30 AM - 5:00 PM",
            "Thursday": "9:30 AM - 5:00 PM",
            "Friday": "9:30 AM - 5:00 PM",
            "Saturday": "9:30 AM - 5:00 PM",
            "Sunday": "9:30 AM - 5:00 PM"
        },
        "photos": [
            "https://images.unsplash.com/photo-1560127452-42c6b00c5c05",
            "https://images.unsplash.com/photo-1560127452-42c6b00c5c06",
            "https://images.unsplash.com/photo-1560127452-42c6b00c5c07"
        ],
        "additionalInfo": "Wheelchair accessible. On-site restaurants and shops available."
    },
    "4": {
        "id": "4",
        "name": "Johannesburg Botanical Gardens",
        "category": "Nature",
        "description": "Beautiful gardens featuring diverse plant species and walking trails",
        "audioDescription": "Welcome to the Johannesburg Botanical Gardens, a peaceful oasis in the heart of the city. Spanning over 125 hectares, these gardens showcase a diverse collection of plants and themed gardens. As you walk through, you'll discover the Rose Garden with over 4,500 roses, the magnificent Shakespeare Garden, and the peaceful Herb Garden. The gardens are connected to Emmarentia Dam, where you can enjoy water sports or simply relax by the waterside. The well-maintained walking trails offer perfect spots for picnics and bird watching, making it a favorite destination for both nature lovers and families.",
        "latitude": -26.1526,
        "longitude": 28.0054,
        "address": "Olifants Rd, Emmarentia, Johannesburg, 2195",
        "imageUrl": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
        "rating": 4.6,
        "websiteUrl": "https://www.jhbcityparks.com",
        "openingHours": {
            "Monday": "8:00 AM - 6:00 PM",
            "Tuesday": "8:00 AM - 6:00 PM",
            "Wednesday": "8:00 AM - 6:00 PM",
            "Thursday": "8:00 AM - 6:00 PM",
            "Friday": "8:00 AM - 6:00 PM",
            "Saturday": "8:00 AM - 6:00 PM",
            "Sunday": "8:00 AM - 6:00 PM"
        },
        "photos": [
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeaf",
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeag"
        ],
        "additionalInfo": "Wheelchair accessible. Picnic areas available. Guided tours available."
    },
    "5": {
        "id": "5",
        "name": "Sandton City",
        "category": "Shopping",
        "description": "Premier shopping destination with luxury brands and entertainment",
        "audioDescription": "Welcome to Sandton City, one of Africa's leading and most prestigious shopping destinations. This modern complex houses over 300 shops, ranging from international luxury brands to local boutiques. The iconic Nelson Mandela Square, with its 6-meter tall bronze statue of Nelson Mandela, forms part of this shopping paradise. As you explore, you'll find world-class restaurants, entertainment venues, and the famous Diamond Walk, showcasing the finest luxury brands. The complex is also home to the Sandton Convention Centre and several five-star hotels, making it a hub of business and leisure in Johannesburg.",
        "latitude": -26.1072,
        "longitude": 28.0569,
        "address": "Rivonia Rd, Sandhurst, Sandton, 2196",
        "imageUrl": "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
        "rating": 4.7,
        "websiteUrl": "https://www.sandtoncity.co.za",
        "openingHours": {
            "Monday": "9:00 AM - 8:00 PM",
            "Tuesday": "9:00 AM - 8:00 PM",
            "Wednesday": "9:00 AM - 8:00 PM",
            "Thursday": "9:00 AM - 8:00 PM",
            "Friday": "9:00 AM - 8:00 PM",
            "Saturday": "9:00 AM - 8:00 PM",
            "Sunday": "9:00 AM - 8:00 PM"
        },
        "photos": [
            "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
            "https://images.unsplash.com/photo-1581539250439-c96689b516de",
            "https://images.unsplash.com/photo-1581539250439-c96689b516df"
        ],
        "additionalInfo": "Wheelchair accessible. On-site restaurants and shops available. Guided tours available."
    }
}

@app.route('/api/nearby-landmarks', methods=['POST'])
def get_nearby_landmarks():
    data = request.get_json()
    user_lat = data.get('latitude', -26.2041)  # Default to Johannesburg coordinates
    user_lng = data.get('longitude', 28.0473)
    
    # In a real app, we would calculate actual distances and filter based on radius
    return jsonify(landmarks)

@app.route('/api/landmark-details/<landmark_id>', methods=['GET'])
def get_landmark_details(landmark_id):
    # Get detailed information for a specific landmark
    details = landmark_details.get(landmark_id)
    if details:
        return jsonify(details)
    else:
        # If landmark not found in detailed data, return basic info
        basic_info = next((l for l in landmarks if l["id"] == landmark_id), None)
        if basic_info:
            # Create a default detailed view from basic info
            return jsonify({
                **basic_info,
                "address": "Address information not available",
                "history": "Historical information not available",
                "websiteUrl": "#",
                "openingHours": {
                    "Monday": "9:00 AM - 5:00 PM",
                    "Tuesday": "9:00 AM - 5:00 PM",
                    "Wednesday": "9:00 AM - 5:00 PM",
                    "Thursday": "9:00 AM - 5:00 PM",
                    "Friday": "9:00 AM - 5:00 PM",
                    "Saturday": "9:00 AM - 4:00 PM",
                    "Sunday": "Closed"
                },
                "photos": [basic_info["image_url"]],
                "additionalInfo": "Additional information not available"
            })
        return jsonify({"error": "Landmark not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
