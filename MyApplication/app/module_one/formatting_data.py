

def extract_data_db(conn):

    """this function extract data to db otteo"""

    import json

    data = {}

    for i in range(1,5):

        a = f"""SELECT data FROM otteo WHERE id = {i}"""
        print(a)
        result = conn.execute(a)
        for j in result.fetchall():
            res = j[0]
            print(res)
        if i == 4 or i == 3:
            res = res.replace('[','').replace(']','')\
                    .replace("&","_")\
                    .replace("/", "_")\
                    .split(" ")
            res2 = [k.replace("'", "") for k in res]
            data[str(i)] = res
        else:
            try:

                json_acceptable_string = res.replace("'", "\"")
            
            except json.decoder.JSONDecodeError :
                pass
                #print(r'{}'.format(res))
                #json_acceptable_string = r"""{}""".format(res)
            #d = json.loads(json_acceptable_string)
            #data[str(i)] = d
    
    return 




def formatting_data_boound():

    """ this function put in good format data for boound"""
    return
