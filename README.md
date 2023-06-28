# Penucia
A simple front-end app that tells us where we are, where we'd like to be regarding our penuciary lives. 

## This front-end website hopes to:
1. Catalogue information regarding finances, such as 
	1. (Almost) every transaction from all bank accounts
	2. Budget plans for the following year
and display them in a visual manner, for the following goals

	1. Have a clear purpose for all money.
	2. Enable systematic money allotment, saving and spending

2. Commodity Pricing
	1. To be thought about later...


	
## Developers' Setup
To get this set up on your computer, do 3 things:

1. Clone this onto your computer
There are multiple ways: You'll have to figure out what's easiest/best for you. Then you cd into your program 

```bash
cd penucia
# 2. Install the dependencies
npm install
# 3. Start the server and open the app in a new browser tab
npm run dev -- --open
```



# brainstorming area 
### (not important! just my thoughts someplace)
- How budget may work
	- put down future transactions that could happen
- Data that we need to see
	- how much money do I have to spend?

(eg) 
weekly income = 100 apr-dec 2023
weekly groceries = 30 apr-dec 2023
monthly electricity bill = 80 apr-dec 2023
weekly tithe = 10 apr-dec 2023
weekly capital = 40 apr-dec 2023

----
apr week one
income = 100
groceries = 30
electricity = 20
tithe = 10
capital = 40

spent
groceries 20
electricity 0 
tithe 10
capital 30
---
end of week one saved 10 on groceries, 30 on electricity
---
apr week two 
income = 100
groceries = 30
electricity = 20
tithe = 10
capital = 40

spent
groceries 20
electricity 0 
tithe 10
capital 30
---
 
apr week three 
income = 100
groceries = 30
electricity = 20
tithe = 10
capital = 40

spent
groceries 20
electricity 0 
tithe 10
capital 30
---

apr week four
income = 100
groceries = 30
electricity = 20
tithe = 10
capital = 40

spent
groceries 20
electricity 0 
tithe 10
capital 30
---

week 5
income = 100 
groceries = 30
electricity = 20
tithe = 10
capital = 40

amount left to spend 
groceries=(30*4) - (20*4) = 40 + 30 = 70
electricity = (20*4) = 80 + 20 = 100
tithe = 10*4 - 10*4 = 0 + 10 = 19
capital = 30*4 - 40*4 = 120 - 160 = -40 +30 = -10

now if i move the money from my surplus in groceries to capital, just to balance things out, how will I work that out?

1. I'll have to re-adjust the budget for one day to spend $10 less groceries and $10 more on capital
2. I could just in the budget area, add a one-time budget transaction from groceries to capital
3. 

