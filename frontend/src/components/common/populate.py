from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb")
db=client.foods
# Issue the serverStatus command and print the results
objs=[
    {
        "name":"panner","price":359,"type":"veg","item":"pizzas","pic":"pizzas.jpg"
    },
    {
        "name":"Aloo samosa","price":15,"type":"veg","item":"samosas","pic":"samosajpg"
    },
    {
        "name":"double cheese","price":229,"type":"veg","item":"pizzas","pic":"pizza.jpg"
    },
    {
        "name":"spiced chicken meatballs","price":479,"type":"non-veg","item":"pizzas","pic":"pizza.jpg"
    },
    {
        "name":"Onion samosa","price":10,"type":"veg","item":"samosas","pic":"samosa.jpg"
    },
    {
        "name":"corn samosa","price":15,"type":"veg","item":"samosa","pic":"samosa.jpg"
    },
     {
        "name":"McAloo Tikki Burger","price":46,"type":"veg","item":"burgers","pic":"burger.jpg"
    },
    {
        "name":"McSpicy Chicken Burger","price":163,"type":"non-veg","item":"burgers","pic":"burger.jpg"
    },
     {
        "name":"veg-maggi","price":30,"type":"veg","item":"maggi","pic":"maggi.jpg"
    }
    ,
     {
        "name":"cheese-maggi","price":40,"type":"veg","item":"maggi","pic":"maggi.jpg"
    },
     {
        "name":"egg-maggi","price":50,"type":"non-veg","item":"maggi","pic":"maggi.jpg"
    }
]
for i in range(len(objs)):
    db.items.insert_one(objs[i])

