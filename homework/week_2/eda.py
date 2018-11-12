import pandas as pd
import numpy as np

#datframe the file
df = pd.read_csv('input.csv', sep = ',')

for i in df.columns:
    df[i] = df[i].replace('unknown',' ')
df = df.dropna()

df['Region'] = df['Region'].str.strip()
df['GDP ($ per capita) dollars']= df['GDP ($ per capita) dollars'].str.strip('dollars')

print(df['GDP ($ per capita) dollars'])
# print(df['GDP ($ per capita) dollars'].mean())
# print(df['GDP ($ per capita) dollars'].median())
# print(df['GDP ($ per capita) dollars'].mean())















    #df.shape
    # print(df.head())
    # print(df.tail())
    # print(df.columns)
    # print(df.shape)
# mean, median and mode
    #     df[i] = df[i].astype()
    # print(df[i])
# print(df.isnull())
# for line in df:
#     print(line)
#     gdpp = line('GDP ($ per capita) dollars')
    # gdpp = gdpp.str.strip('dollars')
    # GDP.append(int(gdpp))

# df['GDP ($ per capita) dollars'] = GDP
# for i in df['GDP ($ per capita) dollars']:
#     df['GDP ($ per capita) dollars']= int('GDP ($ per capita) dollars')
# print(df.dtypes)
