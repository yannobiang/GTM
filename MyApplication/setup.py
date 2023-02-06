from flask import (
    Flask,
    request,
    render_template,
    url_for,
    abort,
    redirect
)
from flask_mail import (Mail, Message)
import os
import stripe

app = Flask(__name__, template_folder = 'C://Users//Projet//GTM//MyApplication//app//templates//'
                     )

app.config['STRIPE_PUBLIC_KEY'] = 'pk_test_51ML83GGkR2DegpH1QL2mvNrUnTXdjKPTKagEgGMyI81TwUFs3n9LkmGSuk63BOiMr87HxKVPtZqdqtwhr5UwSEwC00BODG8H5b'
app.config['STRIPE_SECRET_KEY'] = 'sk_test_51ML83GGkR2DegpH1WfxUl9WIatZ1dvnQjNveZlzJwViZQeWXWsC3px5RVyVdPlHBgGZMmXpouklAayDr9pZ5WYHd009XNdKVUi'

app.config["MAIL_SERVER"]= "smtp.gmail.com"
app.config["MAIL_PORT"]= 465
app.config["MAIL_USE_TLS"]= False
app.config["MAIL_USE_SSL"]= True
app.config["MAIL_USERNAME"]= "yannobiang3@gmail.com"
app.config["MAIL_PASSWORD"]= "hklggfqntjaaktpo"

mail = Mail(app) 

stripe.api_key = app.config['STRIPE_SECRET_KEY']


@app.route('/')
def index():
    return render_template('test_stripe.html', key=app.config['STRIPE_PUBLIC_KEY'])

@app.route('/charge', methods=['POST'])
def charge():
    # Amount in cents
    amount = 800

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
    #if request.method == 'POST':
        
    msg = Message('Transfert', sender = 'yannobiang3@gmail.com', recipients = ['enguienancy@gmail.com',
    'bermudezjoseline00@gmail.com'])
    msg.body = "Bonjour madame, monsieur Gabontransmoney vous remercie pour votre transfert."
    msg.html = f"""Bonjour madame, monsieur <br> Vous avez envoyer un montant {amount}. <br>
        Vous pouvez dès à présent contacter le +33 0752457181 si vous êtes en France. <br>
        Si vous êtes au Gabon +241 066 245681 pour la récupération en main propre. <br>
        Gabontransmoney vous remercie pour votre fidélité. <br>
        <br>
        <br>
        <strong>Votre bonheur est notre priorité</strong><br>
        <strong>Votre bonheur c'est notre efficacité</strong>
    """
    mail.send(msg)
       # return "sent email"
    return render_template('charge.html', amount=amount)

if __name__ == '__main__':
    app.run(debug=True)