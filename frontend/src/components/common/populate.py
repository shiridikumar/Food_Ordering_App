from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb")
db=client.vnu
# Issue the serverStatus command and print the results
"""objs=[
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
]"""



"""ne={"name":"pavbhaji","price":"40","type":"veg","item":"others","pic":"others.jpg"}
vendors=[
    {"manager_name":"bob","shop_name":"JC","password":"jc","email":"bob@gmail.com","phone":1234567890,"items":
    [
        {"name":"Aloo Samosa","type":"veg","item":"samosas","pic":"samosas.jpg","rating":0,"price":15},{"name":"Egg Maggi","type":"non-veg","item":"maggi","pic":"maggi.jpg","rating":0,"price":40},
        {"name":"Veg Burger","type":"veg","item":"burgers","pic":"burgers.jpg","rating":0,"price":50}
    ],"time":"","rating":4.8,"pic":"jc.jpg"},


    {"manager_name":"Ben","shop_name":"BBC","password":"bbc","email":"ben@gmail.com","phone":1111111110,"items":[
        {"name":"Double cheese pizza","type":"veg","item":"pizzas","pic":"pizzas.jpg","rating":0,"price":249},
        {"name":"spiced chicken pizza","type":"non-veg","item":"pizzas","pic":"pizzas.jpg","rating":0,"price":329},{"name":"Mc spicy chicken burger","type":"non-veg","item":"burgers","pic":"burgers.jpg","rating":0,"price":156}
        ],"time":"","rating":4.2,"pic":"bbc.jpg"},


    {"manager_name":"john","shop_name":"VC","password":"vc","email":"john@gmail.com","phone":2222222220,"items":[
        {"name":"Cheese maggi","type":"veg","item":"maggi","pic":"maggi.jpg","rating":0,"price":50},
        {"name":"Veg burger","type":"veg","item":"burgers","pic":"burgers.jpg","rating":0,"price":45},{"name":"Veg sandwich","type":"veg","item":"sandwich","pic":"no.jpg","rating":0,"price":45}
    ],"time":"","rating":4.7,"pic":"vc.jpg"},


    {"manager_name":"alice","shop_name":"New canteen","password":"nc","email":"alice@gmail.com","phone":3333333330,"items":[
        {"name":"Corn Samosa","type":"veg","item":"samosas","pic":"samosas.jpg","rating":0,"price":12},
        {"name":"veg maggi","type":"veg","item":"maggi","pic":"maggi.jpg","rating":0,"price":30},{"name":"french fries","type":"veg","item":"burgers","pic":"no.png","rating":0,"price":60}
        ],"time":"","rating":3.6,"pic":"nc.jpg"}
]

db.vendors.update_one({"item":"samosas"},{"$set":{"pic":"samosas.jpg"}})
db.vendors.update_one({"item":"pizzas"},{"$set":{"pic":"pizzas.jpg"}})
db.vendors.update_one({"item":"burgers"},{"$set":{"pic":"burgers.jpg"}})
db.vendors.update_one({"item":"maggi"},{"$set":{"pic":"maggi.jpg"}})


addons=[{"name":"potato chips","price":40},{"name":"250ml coke","price":50}]
a=db.vendors.find({"shop_name":"BBC"})[0]
b=a["items"]
for i in range(len(b)):
    b[i].update({"add_ons":addons})
print(b)


db.vendors.update_one({"shop_name":"BBC"},{"$set":{"items":b}})"""

nowdb=db.food_items.find()
for i in nowdb:
    print(i)
"""for i in nowdb:
    item=i["items"]
    for j in item:
        req=j;j["shop_name"]=i["shop_name"]
        db.food_items.insert_one(req)"""

        











