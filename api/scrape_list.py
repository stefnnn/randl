#!/usr/bin/env python3

from scrape import extract

language = "de"
topics = {
    "billy eilish": ["https://www.20min.ch/story/billie-eilish-zeigt-erstmals-ihr-zuhause-481572927457", "https://www.blick.ch/people-tv/international/zehn-fakten-zu-billie-eilish-bieber-vogelspinne-und-tourette-syndrom-id17626842.html", "https://www.nau.ch/people/welt/billie-eilish-karriere-und-erfolge-der-us-sangerin-66361302"],
    "sustainability": ["https://www.srf.ch/bnf/rss/19920002"],
    "economy": ["https://www.srf.ch/news/bnf/rss/1926"],
    "crypto": ["https://www.20min.ch/story/jetzt-gibts-bitcoin-gutscheinkarten-in-schweizer-laeden-472773446523", "https://www.20min.ch/story/bitcoin-geht-durch-die-decke-starker-januar-fuer-kryptowaehrungen-351308378636", "https://www.srf.ch/news/wirtschaft/grosse-verluste-die-krypto-krise-trifft-auch-die-schweiz-aber-nicht-alle-gleich"],
    "artificial intelligence": ["https://www.20min.ch/story/ki-schreibt-matura-und-masterarbeiten-schulen-und-unis-sind-ratlos-598415459344", "https://www.srf.ch/news/gesellschaft/experte-ordnet-ein-kuenstliche-intelligenz-wann-uebernehmen-die-roboter", "https://www.srf.ch/wissen/technik/kuenstliche-intelligenz-die-schweiz-im-sog-der-algorithmen"],
    "diversity": ["https://www.20min.ch/story/lgbt-nachhilfe-fuer-zuercher-polizisten-kommission-fordert-regelmaessige-kurse-669013082538", "https://www.20min.ch/story/homosexualitaet-neues-gesetz-in-uganda-sorgt-fuer-haertere-starfen-sogar-gefaengnisstrafen-441073168409", "https://www.srf.ch/news/international/lgbtqi-fluechtlinge-in-kenia-eine-temporaere-heimat-in-einem-feindlichen-land"]
}

for topic in topics:
  for url in topics[topic]:
    extract(url, language=language, topic=topic, num=3)