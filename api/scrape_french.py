#!/usr/bin/env python3

from scrape import extract

language = "fr"
topics = {
    "music": ["https://www.ouest-france.fr/normandie/coutances-50200/le-theatre-municipal-de-coutances-a-vibre-avec-une-soiree-hip-hop-et-break-dance-2b7c18b8-ca82-11ed-b7fc-1e26ef906907", "https://www.rtl.fr/actu/les-annees-80-quand-le-hip-hop-debarquait-en-france-7900243950", "https://www.francetvinfo.fr/culture/spectacles/danse/paris-fete-cette-semaine-les-50-ans-du-hip-hop-et-du-breakdance-nouvelle-discipline-olympique-aux-jo-2024_5695739.html", "https://tetu.com/2023/03/24/danse-hip-hop-inclusivite-difficile-danseur-danseuses-gay-queer-lesbienne-break-dance/", "https://www.redbull.com/ca-fr/danse-de-rue-guide-essentiel"],
    "sustainability": ["https://www.contrepoints.org/2022/10/22/441005-de-greta-a-just-stop-oil-lecologisme-en-pleine-crise-dadolescence", "https://www.revue-ballast.fr/animalisme-et-ecologie-une-discussion-critique/", "https://www.lematin.ch/story/lalimentation-seule-pourrait-rechauffer-le-climat-de-pres-de-1-c-dici-a-2100-190787246289"],
    "artificial intelligence": ["https://www.liberation.fr/economie/economie-numerique/litalie-bloque-le-robot-conversationnel-chatgpt-20230331_4CERH7Q7EVC2PH5PWMAIBK3S7E/", "https://www.rts.ch/info/sciences-tech/13909896-une-radio-100-virtuelle-avec-chatgpt.html", "https://www.blogdumoderateur.com/blagues-premier-avril-chatgpt/"],
    "diversity": ["https://hitek.fr/actualite/daniel-radcliffe-harry-potter-animation-projet-lgbt-youtube_41309"],
    "veganism": ["https://frapp.ch/fr/articles/stories/fermeture-bliss", "https://www.reussir.fr/lait/produits-laitiers-vers-une-nouvelle-certification-vegane-de-lalimentation-des-vaches", "https://www.pressesante.com/quelle-difference-entre-un-regime-vegan-et-un-regime-vegetarien/"]
}

for topic in topics:
  for url in topics[topic]:
    extract(url, language=language, topic=topic, max=3)