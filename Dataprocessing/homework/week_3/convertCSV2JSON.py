import json
import pandas as pd
import csv
import sys


def convert(file_name):

    # Read csv file
    csv_name = file_name[0]
    df = pd.read_csv(csv_name)

    df1 = df[['Country', 'TIME', 'Value']]
    # df1 = df1.set_index('T)

    # Make dictionary, write to json structure
    data = df1.to_dict('response')
    print(data)

    # Json file name
    json_name = csv_name.split(".csv")[0]+".json"

    print(json.dumps(data, indent=4))
    # Write json file
    with open(json_name, 'w') as outfile:
        json.dump(data, outfile, indent=4)



if __name__ == "__main__":

    # Convert csv file to json
    convert(sys.argv[1:])
