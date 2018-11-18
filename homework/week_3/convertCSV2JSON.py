import json
import pandas as pd
import csv
import sys


def convert(file_name):

    # Read csv file
    csv_name = file_name[0]
    df = pd.read_csv(csv_name, index_col="Time")

    # Select name for json file
    outfile_name =csv_name.split('.')[0] +".json"

    # Make dictionary, write to json structure
    data = df.to_dict('index')
    j = json.dumps(data, indent=4)

    # Write json file
    with open(outfile_name, 'w') as outfile:
        json.dump(j, outfile)





if __name__ == "__main__":

    # Convert csv file to json
     convert(sys.argv[1:])
