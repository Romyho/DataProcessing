import pandas as pd
import json
import matplotlib.pyplot as plt

#datframe the file
df = pd.read_csv('input.csv', )

for i in df.columns:
    if not (df[i].name == "Population" or df[i].name == "Area (sq. mi.)"):
        df = df.loc[df[i] != 'unknown']

df = df.dropna()

df['Region'] = df['Region'].str.strip()
df['GDP ($ per capita) dollars']= df['GDP ($ per capita) dollars'].str.strip(' dollars')

y = pd.to_numeric(df['GDP ($ per capita) dollars'])
print('Mean GDP ($ per capita) dollars:', y.mean())
print('Median GDP ($ per capita) dollars:', y.median())
print('Mode GDP ($ per capita) dollars:', y.mode())
print('Standard error GDP ($ per capita) dollars:', y.std())
m = y.max()
print('outlier GDP ($ per capita) dollars:', m)

df = df.loc[df['GDP ($ per capita) dollars']!= '400000']

y_no_outliers = pd.to_numeric(df['GDP ($ per capita) dollars'])

df['Infant mortality (per 1000 births)']= df['Infant mortality (per 1000 births)'].str.replace(',', '')
z = df['Infant mortality (per 1000 births)'].astype(float)
print('Minimum infant mortality(per 1000 births):', z.min())
print('Maximum infant mortality(per 1000 births):', z.max())
print('1st, 2nd, 3rd quantile of :Infant mortality (per 1000 births)', z.quantile([0.25,0.5,0.75]))

plt.hist(y_no_outliers)
plt.xlabel("GDP")
plt.tile("Histogram GDP ($ per capita) dollars")
plt.show()
plt.boxplot(z)
plt.show()
