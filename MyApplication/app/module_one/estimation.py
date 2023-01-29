import math

class Estimation():

    """
        Cette classe calcule l'estimation de l'envoie
        en foncton du pays et du montant qu'on lui donne
    """
    euro = 656

    def __init__(self, montant, pays):

        self.montant = montant
        self.pays = pays

    def comAirtel(self):
        
        if self.pays == "gabon":

            if self.montant >= 300 and self.montant <= 5000 :
                commmission = 60
            elif self.montant > 5000 and self.montant <= 10000 :
                commmission = 110
            elif self.montant > 10000 and self.montant <= 20000:
                commmission = 210
            elif self.montant > 20000 and self.montant <= 30000 :
                commmission = 310
            elif self.montant > 30000 and self.montant <= 40000:
                commmission = 410
            elif self.montant > 40000 and self.montant <= 60000:
                commmission = 610
            elif self.montant > 60000 and self.montant <= 100000 :
                commmission = 810
            elif self.montant > 100000 and self.montant <= 500000 :
                commmission = 1550
            elif self.montant > 500000 and self.montant <= 1000000 :
                commmission = 2600
            elif self.montant > 1000000 and self.montant <= 5000000:
                commmission = 3400

        elif self.pays == "france":
            
            if self.montant >= 300/self.euro and self.montant <= 5000/self.euro :
                commmission = 60/self.euro
            elif self.montant > 5000/self.euro and self.montant <= 10000/self.euro :
                commmission = 110/self.euro
            elif self.montant > 10000/self.euro and self.montant <= 20000/self.euro:
                commmission = 210/self.euro
            elif self.montant > 20000/self.euro and self.montant <= 30000/self.euro :
                commmission = 310/self.euro
            elif self.montant > 30000/self.euro and self.montant <= 40000/self.euro:
                commmission = 410/self.euro
            elif self.montant > 40000/self.euro and self.montant <= 60000/self.euro:
                commmission = 610/self.euro
            elif self.montant > 60000/self.euro and self.montant <= 100000/self.euro :
                commmission = 810/self.euro
            elif self.montant > 100000/self.euro and self.montant <= 500000/self.euro :
                commmission = 1550/self.euro
            elif self.montant > 500000/self.euro and self.montant <= 1000000/self.euro :
                commmission = 2600/self.euro
            elif self.montant > 1000000/self.euro and self.montant <= 5000000/self.euro:
                commmission = 3400/self.euro
            
        
        return commmission

    def comTransfert(self):

        if self.pays == 'gabon':
            if self.montant > 0 and self.montant <= 100000 :
                comTrans = 3000
            elif self.montant > 100000 :
                comTrans = (math.floor(self.montant/100000) * 1500) + 3000
            
        elif self.pays == 'france':
            if self.montant > 0 and self.montant <= 9.14 :
                comTrans = (500/self.euro)
            elif self.montant > 9.14:
                comTrans =  round(((self.montant /4.57) * (45/self.euro)) + (500/self.euro),2)
       
        return comTrans

    def send(self):

       
        if self.pays == 'gabon':
            
            data = {
                'envoieAirtel': self.comTransfert() + self.comAirtel() + self.montant ,
                'envoieSansAirtel': self.comTransfert() + self.montant,
                'airtelCom': self.comAirtel(),
                'comTransfert': self.comTransfert()
            
            }
        elif self.pays == 'france':
            data = {
                'envoieAirtel': self.comTransfert() + round((self.comAirtel()/self.euro) + 0.25, 2) + self.montant ,
                'envoieSansAirtel': self.comTransfert() + self.montant,
                'airtelCom': round((self.comAirtel()/self.euro) + 0.25, 2),
                'comTransfert': self.comTransfert()
            
            }
        return data

