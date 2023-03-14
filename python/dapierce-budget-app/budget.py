# My solution for Budget App
# Author: David Pierce
class Category:

  # Initialization function for Object
  def __init__(self, category_name):
    self.name = category_name
    self.ledger = []
    self.funds = 0.00

  def deposit(self, amount, description=""):
    self.ledger.append({"amount": amount, "description": description})
    self.funds += amount

  def withdraw(self, amount, description=""):
    if self.check_funds(amount) == False:
      return False
    self.ledger.append({"amount": -abs(amount), "description": description})
    self.funds -= amount
    return True

  def get_balance(self):
    return self.funds

  def transfer(self, amount, another_category):
    if self.check_funds(amount) == False:
      return False
    self.ledger.append({
      "amount": -abs(amount),
      "description": "Transfer to " + another_category.name
    })
    self.funds -= amount
    another_category.deposit(amount, "Transfer from " + self.name)
    return True

  def check_funds(self, amount):
    if self.funds < amount:
      return False
    else:
      return True

  # Additional function for use by the spend chart
  def check_withdrawls(self):
    total_withdrawls = 0.00
    for item in self.ledger:
      if item["amount"] < 0:
        total_withdrawls += item["amount"]
    return total_withdrawls

  # String output function for Object
  def __str__(self):
    s = self.name.center(30, "*")
    for item in self.ledger:
      # Format first 23 chars of description + amounts in .00 decimals
      s += "\n{:<23}".format(item["description"][0:23]) + "{:>7}".format(
        '{0:.2f}'.format(item["amount"]))
    s += "\nTotal: " + '{0:.2f}'.format(self.funds)
    return s


def create_spend_chart(categories):

  # Store values for chart
  spend_chart = "Percentage spent by category"
  longest_name = ""
  amount_spent = []
  percentage_spent = []
  total_spent = 0.00
  chart_spacing = 10

  # Determine percentages of spending and longest name
  for category in categories:
    spent = abs(category.check_withdrawls())
    amount_spent.append(spent)
    total_spent += spent
    if len(category.name) > len(longest_name):
      longest_name = category.name
  i = 0
  for category in categories:
    percentage_spent.append((amount_spent[i] / total_spent) * 100)
    i += 1

  # Then print chart, row by row
  i = 0
  for n in range(chart_spacing, -1, -1):
    percent = (chart_spacing - i) * 10
    spend_chart += "\n" + "{:>3}".format(percent) + "|"
    j = 0
    for category in categories:
      if percentage_spent[j] >= n * 10:
        spend_chart += " o "
      else:
        spend_chart += "   "
      j += 1
    spend_chart += " "
    i += 1
  spend_chart += "\n    -"

  for category in categories:
    spend_chart += "---"

  # Then print the labels at the bottom of the chart
  i = 0
  for n in longest_name:
    spend_chart += "\n    "
    for category in categories:
      if len(category.name) > i:
        spend_chart += " " + category.name[i] + " "
      else:
        spend_chart += "   "
    spend_chart += " "
    i += 1

  return spend_chart
