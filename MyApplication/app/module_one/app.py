import os
import ast
import json
import requests
import json2html
from .formatting_data import extract_data_db
from .estimation import *
import requests
from werkzeug.middleware.dispatcher import DispatcherMiddleware # use to combine each Flask app into a larger one that is dispatched based on prefix

import werkzeug
from flask import (
    Flask,
    request,
    render_template,
    url_for,
    abort,
    redirect
)

from flask_mail import (Mail, Message)
import stripe


baseurl=os.getcwd()

template_dir = '/home/princeobiang/nancy_creation/MyApplication/app/templates/'
static_dir = '/home/princeobiang/nancy_creation/MyApplication/app/static/'
images = '/home/princeobiang/nancy_creation/MyApplication/app/images/'

app = Flask(__name__, template_folder = template_dir,  static_folder=static_dir
                        )
app.config['STRIPE_PUBLIC_KEY'] = 'pk_test_51ML83GGkR2DegpH1QL2mvNrUnTXdjKPTKagEgGMyI81TwUFs3n9LkmGSuk63BOiMr87HxKVPtZqdqtwhr5UwSEwC00BODG8H5b'
app.config['STRIPE_SECRET_KEY'] = 'sk_test_51ML83GGkR2DegpH1WfxUl9WIatZ1dvnQjNveZlzJwViZQeWXWsC3px5RVyVdPlHBgGZMmXpouklAayDr9pZ5WYHd009XNdKVUi'
app.config["MAIL_SERVER"]= "smtp.gmail.com"
app.config["MAIL_PORT"]= 465
app.config["MAIL_USE_TLS"]= False
app.config["MAIL_USE_SSL"]= True
app.config["MAIL_USERNAME"]= "yannobiang3@gmail.com"
app.config["MAIL_PASSWORD"]= "hklggfqntjaaktpo"
stripe.api_key = app.config['STRIPE_SECRET_KEY']
mail = Mail(app)

@app.route('/', methods=['GET','POST'])

def home():

    """the home page of our site"""
    
    url_image =  'new_logo.jpg' #static_dir
    title = "Gabontransmoney"

    if request.method == "POST":
        data = json.dumps(request.form)
        print(data)
        return ('25')
        if data is not None :
        #dict_file = data.getlist("montPays")
            popo = json.loads(data).keys()
            popo_list = list(popo)
            #print(popo_list[0])
        #return redirect(url_for('confirmation'))
        
        
    return render_template(
        'module_one/index.html',
        url_image = url_image
                            )


@app.route('/gabontransmoney/')
def gabontransmoney():

    return redirect(url_for('home'))


#@app.route('/confirmation de choix', methods = ['GET', 'POST'])
#def confirmation():

#    render_template('module_one/confirmation.html')
    
# Ajout de la partie trouvée sur internet ici 

@app.route('/confirmation_de_choix', methods=['GET','POST'])
def confirmation():
    dict_table = {"popo": "france",
                  "montant": 212
                  }
    max_valu = 254
    #dict_table = dict(json.loads(os.environ['table']))
    #max_valu = float(os.environ['max_valu'])
    
    data = request.args
    print(request.args)
    return render_template('module_one/confirmation.html',
                            dict_table = dict_table,
                            max_valu = max_valu,
                            key=app.config['STRIPE_PUBLIC_KEY'])



@app.route('/charge', methods=['GET','POST'])
def charge():
    # Amount in cents
    amount = 500

    customer = stripe.Customer.create(
        email='bermudezjoseline00@gmail.com',
        source=request.form['stripeToken']
    )

    charge = stripe.Charge.create(
        customer=customer.id,
        amount=amount,
        currency='eur',
        description='Flask Charge'
    )
    if request.method == 'POST':
        
        msg = Message('Bonjour cher', sender = 'yannobiang3@gmail.com', recipients = ['enguienancy@gmail.com',
        'bermudezjoseline00@gmail.com'])
        msg.body = "Hey Paul, sending you this email from my Flask app, lmk if it works"
        mail.send(msg)
        return "sent email"
    return render_template('charge.html', amount=amount)

# fin de la partie trouvé sur internet ici.

@app.route('/nancyservices/', methods=['GET', 'POST'])
def nancyservices():

    
    title = "La révédélice"
    if request.method == "POST":
        data = request.form
        print(data)
        
    return render_template('module_two/index.html', title = title)


@app.route('/tarifs en Euro/', methods=['GET', 'POST'])
def grille_euro():

    
    # Opening JSON file
    file = os.path.join(static_dir,'myJSON2.json') 
    url_image =  'new_logo.jpg'
    f = open(file)
    
    # returns JSON object as 
    # a dictionary
    data_table1 = json.load(f)
    print(type(data_table1))
    table1 = json2html.json2html.convert(data_table1)
    
    return render_template('module_four/tarif_eur.html', 
                            table1 = table1,
                            url_image =  url_image)




@app.route('/tarifs en Franc/', methods=['GET', 'POST'])
def grille_cfa():


    file = os.path.join(static_dir,'myJSON1.json')
    url_image =  'new_logo.jpg' 

    f = open(file)
    
    # returns JSON object as 
    # a dictionary
    data_table2 = json.load(f)
    
    table2 = json2html.json2html.convert(data_table2)

    return render_template('module_four/tarif_cfa.html', table2 = table2,
                            url_image = url_image
                            )

@app.route('/support/', methods=['GET', 'POST'])
def support():

    if request.method == "POST":
        data = request.form
        print(data)

    return render_template('module_three/index.html')

@app.route('/transfert/succes')
def succes():
    return render_template('payements/succes.html')


@app.route('/transfert/cancel')
def echec():
    return render_template('payements/echec.html')

