#!/usr/bin/env python
# Name:Romy Ho
# Student number:11007303
"""
This script visualizes data obtained from a .csv file and writes json file
"""


import pandas as pd
import json
import matplotlib.pyplot as plt

# Dataframe the data, index by countries
df = pd.read_csv('input.csv',index_col='Country')

# Delete rows with 'unknown' values
for i in df.columns:
    # Not in the integer columns
    if not (df[i].name == "Population" or df[i].name == "Area (sq. mi.)"):
        df = df.loc[df[i] != 'unknown']

# Delete rows with missing values
df = df.dropna()

# Remove spaces and 'dollars'
df['Region'] = df['Region'].str.strip()
df['GDP ($ per capita) dollars']= df['GDP ($ per capita) dollars'].str.strip(' dollars')

# Make a numeric column and calculate: mean, median and mode
gdp = pd.to_numeric(df['GDP ($ per capita) dollars'])
gdp.mean()
gdp.median()
gdp.mode()

# Find outlier
gdp.max()

# Delete outlier
df = df.loc[df['GDP ($ per capita) dollars']!= '400000']

new_gdp = pd.to_numeric(df['GDP ($ per capita) dollars'])

# Make floats of column by replacing ','
df['Infant mortality (per 1000 births)']= df['Infant mortality (per 1000 births)'].str.replace(',', '')
inf_mort = df['Infant mortality (per 1000 births)'].astype(float)

# Calculate minimum, maximum and 1st, 2nd and 3rd quantile
inf_mort.min()
inf_mort.max()
inf_mort.quantile([0.25,0.5,0.75])

# Plot a histogram of GDP and a boxplot of infant mortality
plt.hist(new_gdp)
plt.xlabel("GDP")
plt.title("Histogram GDP ($ per capita) dollars")
plt.show()
plt.boxplot(inf_mort)
plt.ylabel('Infant mortality (per 1000 births)')
plt.title('Boxplot infant mortality')
plt.show()

# Make a dataframe with the necessary variables
df1 = df[['Region', 'Pop. Density (per sq. mi.)', 'Infant mortality (per 1000 births)', 'GDP ($ per capita) dollars' ]]

# Make a dictionary, with the index as key
data = df1.to_dict('index')

# Write dictionary to json file
with open('eda.json', 'w') as outfile:
    j= json.dumps(data, indent=4)
    json.dump(j, outfile)
