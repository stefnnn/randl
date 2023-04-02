from tinydb import TinyDB, Query
import shutil

articles_db = TinyDB('./data/articles.json')
Article = Query()

languages = [{'code': 'de', 'name': 'German', 'flag': '🇩🇪'}, {'code': 'fr', 'name': 'French', 'flag': '🇫🇷'}]
topics = ["music", "economy", "veganism", "artificial intelligence",
  "sustainability", "diversity", "ed sheeran", "billie eilish",
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

  def delete_article(self, url):
    article = self.find_article(url)
    if "audio" in article:
      shutil.rmtree("./data/"+article['audio'])
    articles_db.remove(Article.url == url)
    
db = DB()