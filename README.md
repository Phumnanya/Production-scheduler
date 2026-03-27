# PRODUCTION SCHEDULER!! #

# About #
A Next.js project sourced from the coding canal's coding challenge on github. This is a production scheduler with 3 independent machine resources (CNC machine, Assembly Line A, Assembly Line B) capable of taking orders and producing and recording the inventory.

- Technologies, Libraries and frameworks used includes; Next.js, Typescript, Tailwind CSS, Flask Python, PostgreSQL, Recharts.js, Zod validator, and Tanstack table.

# Home/Landing Page#
* The home page opens with a form where the user enters the details of an order (quantity, date, start time, and end time) for any machine of their choice with the specific task you want it to perform.

* The details of the order is examined by a specified zod validation rule, to ensure that the selected time stamp is not colluding with an already allocated time slot for a running or pending order on the same machine. If there is any collision, the form throws an error and highlights the collision, else it will book the order and route to the daashboard page where the data is statistically displayed for each of the machines.

# Dashboard Page #
* This is the page where the data of number of orders is displayed for each machine individually using Recharts bar chart.

* Recharts pie chart is also deployed to sum up and visualize the total quantities of requests made on each order.

* Finally a tanstack table at the bottom of the page to generally visualize all the records of every order with their full details (inventory)