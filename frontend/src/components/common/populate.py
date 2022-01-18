from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb")
db=client.foods
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



ne={"name":"pavbhaji","price":"40","type":"veg","item":"others","pic":"others.jpg"}
vendors=[
    {"manager_name":"bob","shop_name":"JC","email":"bob@gmail.com","phone":1234567890,"items":
    [
        {"name":"Aloo Samosa","type":"veg","item":"samosas","pic":"","rating":0,"price":15},{"name":"Egg Maggi","type":"non-veg","item":"maggi","pic":"","rating":0,"price":40},
        {"name":"Veg Burger","type":"veg","item":"burgers","pic":"","rating":0,"price":50}
    ],"time":"","rating":4.8},


    {"manager_name":"Ben","shop_name":"BBC","email":"ben@gmail.com","phone":1111111110,"items":[
        {"name":"Double cheese pizza","type":"veg","item":"pizzas","pic":"","rating":0,"price":249},
        {"name":"spiced chicken pizza","type":"non-veg","item":"pizzas","pic":"","rating":0,"price":329},{"name":"Mc spicy chicken burger","type":"non-veg","item":"burgers","pic":"","rating":0,"price":156}
        ],"time":"","rating":4.2},


    {"manager_name":"john","shop_name":"VC","email":"john@gmail.com","phone":2222222220,"items":[
        {"name":"Cheese maggi","type":"veg","item":"maggi","pic":"","rating":0,"price":50},
        {"name":"Veg burger","type":"veg","item":"burgers","pic":"","rating":0,"price":45},{"name":"Veg sandwich","type":"veg","item":"sandwich","pic":"","rating":0,"price":45}
    ],"time":"","rating":4.7},


    {"manager_name":"alice","shop_name":"New canteen","email":"alice@gmail.com","phone":3333333330,"items":[
        {"name":"Corn Samosa","type":"veg","item":"samosas","pic":"","rating":0,"price":12},
        {"name":"veg maggi","type":"veg","item":"maggi","pic":"","rating":0,"price":30},{"name":"french fries","type":"veg","item":"burgers","pic":"","rating":0,"price":60}
        ],"time":"","rating":3.6}
]






