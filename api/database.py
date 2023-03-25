languages = [{'code': 'de', 'name': 'German'}, {'code': 'fr', 'name': 'French'}, {'code': 'es', 'name': 'Spanish'}, {'code': 'uk', 'name': 'Ukranian'}]
topics = ["Sports", "Metaverse", "Veganism", "Cryptocurrency", "Mental Health", "Self-Care", "Gaming", "Artificial Intelligence",
  "Fashion", "Travel", "Cybersecurity", "Sustainability", "Mindfulness", "Diversity", "LGBTQ", "Renewable Energy",
  "Space Exploration", "Football", "Ed Sheeran", "Billie Eilish", "Cardi B", "Drake", "Football", "Justin Bieber", "Tennis" 
]

class DB:
  def get_languages(self):
    return languages

  def get_topics(self):
    return topics

db = DB()