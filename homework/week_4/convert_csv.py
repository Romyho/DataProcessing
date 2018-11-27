import json
import pandas as pd
import csv
import sys


def convert():

    # Read csv file
    # print(csv_name)
    df = pd.read_csv('EDU_ENRL_FIELD_26112018115055911.csv')
    df1 = df[['Country',"Field of education", 'Value']]
    df1 = df1.dropna()

    # Make dictionary, write to json structure
    data = df1.to_dict('response')
    # print(data)

    # print(json.dumps(data, indent=4))
    # Write json file
    with open('data.json', 'w') as outfile:
        json.dump(data, outfile, indent=4)



if __name__ == "__main__":

    # Convert csv file to json
    convert()
