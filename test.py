import os
import sys
import time
import json
import requests
import re
import argparse
import urllib.parse
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# crawl product list from amazon
def crawl_category_product_list(category_name):
        # set up webdriver
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--disable-extensions')
    options.add_argument('--disable-infobars')
    options.add_argument('--disable-notifications')
    options.add_argument('--disable-extensions')
    options.add_argument('--disable-application-cache')
    options.add_argument('--disable-cache')
    options.add_argument('--disable-setuid-sandbox')
    options.add_argument('--no-proxy-server')
    driver = webdriver.Chrome(options=options)
    driver.set_window_size(1120, 550)
    driver.get("https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=" + category_name)
    # wait for webdriver to load
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "a-section a-spacing-medium")))
    # get product list
    product_list = []
    product_list_soup = BeautifulSoup(driver.page_source, 'html.parser')
    product_list_div = product_list_soup.find('div', class_='a-section a-spacing-medium')
    product_list_div_ul = product_list_div.find('ul', class_='s-result-list s-search-results sg-row')
    product_list_div_li = product_list_div_ul.find_all('li', class_='s-result-item celwidget')
    for product_li in product_list_div_li:
        product_url = product_li.find('a', class_='a-link-normal s-access-detail-page  a-text-normal')['href']
        product_title = product_li.find('h2', class_='a-size-medium s-inline s-access-title a-text-normal').text
        product_price = product_li.find('span', class_='a-offscreen').text
        product_list.append({
            'url': product_url,
            'title': product_title,
            'price': product_price
        })
    return product_list
