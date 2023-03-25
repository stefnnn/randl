from tinydb import TinyDB, Query

articles_db = TinyDB('./data/articles.json')
Article = Query()

languages = [{'code': 'de', 'name': 'German', 'flag': '🇩🇪'}, {'code': 'fr', 'name': 'French', 'flag': '🇫🇷'}, {'code': 'es', 'name': 'Spanish', 'flag': '🇪🇸'}, {'code': 'uk', 'name': 'Ukranian', 'flag': '🇪🇺'}]
topics = ["Sports", "Music", "Economy", "Science", "Metaverse", "Veganism", "Cryptocurrency", "Mental Health", "Self-Care", "Gaming", "Artificial Intelligence",
  "Fashion", "Travel", "Cybersecurity", "Sustainability", "Mindfulness", "Diversity", "LGBTQ", "Renewable Energy",
  "Space Exploration", "Ed Sheeran", "Billie Eilish", "Cardi B", "Drake", "Football", "Justin Bieber", "Tennis" 
]

class DB:
  def get_languages(self):
    return languages

  def get_topics(self):
    return topics

  def get_articles(self, language, topic):
    articles = articles_db.search((Article.language == language) & (Article.topics.any(topic)) )
    return articles
  
  def find_article(self, url):
    return articles_db.search(Article.url == url)[0]
  
  def update_article(self, article):
    articles_db.update(article, doc_ids=[article.doc_id])
    
db = DB()