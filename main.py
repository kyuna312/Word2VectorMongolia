# -*- coding: utf-8 -*-

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jun 12 13:34:48 2019
@author: hana
"""

import pandas as pd
import numpy as np
import string
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import time
import re



#belen unshuulah datanii heseg mongol ugiig utf8 aar unshuulj bga 
data = pd.read_csv("aaaa.csv",encoding='UTF-8')
class Nana:
    def __init__(self):
        # Файлаас зогсох үг буюу туслах үгнүүдийг унших
        with open('aaaa.csv', 'r') as f:
            self.stopwords = f.read().split('\n')
        # Файлаас залгаваруудыг унших
        with open('aaaa.csv', 'r') as f:
            self.rules = f.read().split('\n')
        # Залгавар үгнүүдийн REGEX үүсгэх 
        self.rulesREGEXP = '$|'.join(self.rules)+'$'

    def parse(self, text):
        text_sentences = text.split('.')
        sentences = []
        for text_sentence in text_sentences:
            # өгүүлбэрийн текстийг үгүүд болгож хувиргах
            tokens = text_sentence.split(' ')
            # том үсгүүдийг болиулах
            tokens = [w.lower() for w in tokens]
            # үг бүрээс тэмдэгтүүдийг хасах
            table = str.maketrans('', '', string.punctuation)
            stripped = [w.translate(table) for w in tokens]
            # текст бус үгүүдийг хасах
            words = [word for word in tokens if word.isalpha()]
            # stopword уудыг хасах
            words = [w for w in words if not w in self.stopwords]
            # stemming
            words = [re.sub(self.rulesREGEXP, '', w) for w in words if len(w) >= 6]
            sentences.append(words)
        return sentences



data = data[['asuult', 'angilal']]


#datanii category nii torluudiig harna
data.angilal.unique()

data.groupby('angilal').describe()




#data end toon utguudiig ogno 
data['NUM_angilal']=data.angilal.map({'Сэргээн санах':0,'Ойлгох':1,'Хэрэглэх':2,'Задлан шинжлэх':3,'Үнэлэх':4, 'Бүтээх':5})
data.head()




#dataset iin huvaaltiin hesguud 
x_train, x_test, y_train, y_test = train_test_split(data.asuult, data.NUM_angilal, random_state=0, test_size=0.2)





#bow iig bigram ruu horvuulj bui heseg 
start = time.clock()

vect = CountVectorizer(ngram_range=(2,2))
x_train = vect.fit_transform(x_train)
#surgaltiin datag toon vectorluu horvuuleha
x_test = vect.transform(x_test)

print (vect)
print (time.clock()-start)











#surgalt

start = time.clock()

mnb = MultinomialNB(alpha =0.2)

mnb.fit(x_train,y_train)

result= mnb.predict(x_test)

print(mnb)
print (time.clock()-start)





#model iin heden huviin biyleltiin onoolt
accuracy_score(result,y_test)
print('accurence')
print(accuracy_score(result,y_test))





#garaltiin utga
def predict_news(news):
    test = vect.transform(news)
    pred= mnb.predict(test)
    if pred  == 0:
         return 'Сэргээн санах' 
    elif pred ==1 :
        return 'Ойлгох'
    elif pred ==2 :
        return 'Хэрэглэх'
    elif pred ==3 :
        return 'Задлан шинжлэх'
    elif pred ==4 : 
        return 'Өргөдөл'
    else : 
        return 'Бүтээх'


    
    



x=["Дугаарлалтанд үсэг-цифрийн форматыгашиглана"]
r = predict_news(x)
print (r)




#taamaglaliin matrix iig hevlene
from sklearn.metrics import confusion_matrix

confusion_matrix(y_test, result)