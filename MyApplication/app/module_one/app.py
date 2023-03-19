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
import paypalrestsdk as paypal


baseurl=os.getcwd()

template_dir = '/home/princeobiang/nancy_creation/MyApplication/app/templates/'
static_dir = '/home/princeobiang/nancy_creation/MyApplication/app/static/'
images = '/home/princeobiang/nancy_creation/MyApplication/app/images/'

paypal.configure({
    "mode": "sandbox",  # sandbox or live
    "client_id": "AUAtWnVEcSTDEvBI0B6ADtITPY5H4vJs38eA8so7TXvZBdRLhyz2qCTOi8FIa4cQOs9t5yGIACbU7Vz3",
    "client_secret": "EIXdzjoDrkk3yJS4JgsXBNhwx9SDzBV2O6-MEMkLuF7zueT9dEFGka3tF-lw1EbDhat40A0UbFWuvl8P"
    })

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
        data = request.form.to_dict(flat= True)
        return json.dumps(data)
        
    return render_template(
        'module_one/index.html',
        url_image = url_image
                            )


@app.route('/gabontransmoney/')
def gabontransmoney():

    return redirect(url_for('home'))

@app.route('/validation', methods=['GET','POST'])
def validation():
    url_image =  'new_logo.jpg'
    data = json.loads(request.args.get('montant'))
    choix = data["transfert"]
    return render_template("module_one/validation.html",
                            url_image = url_image,
                            data = data,
                            choix = choix
                            )

@app.route('/verify', methods = ['GET', 'POST'])
def verify():
    if request.method == "POST":
        data = request.form.to_dict()
    
        if data["transfert"] == "paypal":
            montant = data['montant']
            return redirect(f"/paypal_payment/{montant}")
        elif data["transfert"] == "cartevisa":
            try :
                data = {i: j for i, j in data.items() if i not in ['x', 'y']}
                
            except:
                pass
            
            data_string = json.dumps(data)
            

            return redirect(f"/confirmation_de_choix/{data_string}")

    return abort("Bad request contact support")


##################################### Paypal payement #####################################################

@app.route('/paypal_Return', methods=['GET'])
def paypal_Return():
    # ID of the payment. This ID is provided when creating payment.
    paymentId = request.args['paymentId']
    payer_id = request.args['PayerID']
    payment = paypal.Payment.find(paymentId)

    # PayerID is required to approve the payment.
    if payment.execute({"payer_id": payer_id}):  # return True or False
        print("Payment[%s] execute successfully" % (payment.id))
        return 'Payment execute successfully!' + payment.id
    else:
        print(payment.error)
        return 'Payment execute ERROR!'


@app.route('/paypal_payment/<montant>', methods=['GET'])
def paypal_payment(montant):
    # Payment
    # A Payment Resource; create one using
    # the above types and intent as 'sale'
    payment = paypal.Payment({
        "intent": "sale",

        # Payer
        # A resource representing a Payer that funds a payment
        # Payment Method as 'paypal'
        "payer": {
            "payment_method": "paypal"},

        # Redirect URLs
        "redirect_urls": {
            "return_url": url_for("succes"),
            "cancel_url": url_for("echec")
            },

        # Transaction
        # A transaction defines the contract of a
        # payment - what is the payment for and who
        # is fulfilling it.
        "transactions": [{

            # ItemList
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": f"{montant}",
                    "currency": "EUR",
                    "quantity": 1}]},

            # Amount
            # Let's you specify a payment amount.
            "amount": {
                "total": f"{montant}",
                "currency": "EUR"},
            "description": "test 123 This is the payment transaction description."}]})

    # Create Payment and return status
    if payment.create():
        print("Payment[%s] created successfully" % (payment.id))
        # Redirect the user to given approval url
        for link in payment.links:
            if link.method == "REDIRECT":
                # Convert to str to avoid google appengine unicode issue
                # https://github.com/paypal/rest-api-sdk-python/pull/58
                redirect_url = str(link.href)
                print("Redirect for approval: %s" % (redirect_url))
                return redirect(redirect_url)
    else:
        print("Error while creating payment:")
        print(payment.error)
        return "Error while creating payment"


##################################### stripe payement #####################################################

@app.route('/confirmation_de_choix/<data>', methods=['GET','POST'])
def confirmation(data):
    #data = json.loads(request.args.get('montant'))
    data_dict = json.loads(data)
    url_image =  'new_logo.jpg'
    max_valu = 300
    email = data_dict["email"]
    #email = request.args.get('email')
    #dict_table = dict(json.loads(os.environ['table']))
    #max_valu = float(os.environ['max_valu'])
    return render_template('module_one/confirmation.html',
                            url_image = url_image,
                            data = data_dict,
                            max_valu = max_valu,
                            email = email,
                            key=app.config['STRIPE_PUBLIC_KEY'])



@app.route('/charge', methods=['GET','POST'])
def charge():
    # Amount in cents
    data = request.form
    print(request.args)
    # Amount in cents
    amount = request.args.get('ammount')

    customer = stripe.Customer.create(
        email=request.form['stripeEmail'],
        source=request.form['stripeToken']
    )

    charge = stripe.Charge.create(
        customer=customer.id,
        amount=amount,
        currency='eur',
        description='transfert argent via Gabontransmoney'
    )

    if request.method == 'POST':
        
        try :
            msg = Message('Bonjour cher', sender = 'yannobiang3@gmail.com', recipients = ['enguienancy@gmail.com',
            'bermudezjoseline00@gmail.com'])
            msg.body = "Hey Paul, sending you this email from my Flask app, lmk if it works"
            mail.send(msg)
            return "sent email"
        except :
            print("le quota de mail journalier a été dépassé.")
            return "Vous devriez être informer de la transaction dans 3 minutes"
        
    return redirect(url_for('succes'))

# fin de la partie trouvé sur internet ici.

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

@app.route('/succes')
def succes():
    return render_template('payements/succes.html')


@app.route('/echec')
def echec():
    return render_template('payements/echec.html')

