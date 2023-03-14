# My solution for Arithmetic Formatter
# Author: David Pierce
def arithmetic_arranger(problems, solve=False):

  arranged_problems = ""
  problem_spacing = 4
  problem_count = len(problems)

  # Store all values to print row by row later
  row_lengths = []
  num1s = []
  operators = []
  num2s = []

  # Validate 5 or less problems
  if problem_count > 5:
    return "Error: Too many problems."

  # Validate and store each item of a problem
  for problem in problems:

    # Split single problem into component parts
    split = problem.split()
    num1 = split[0]
    operator = split[1]
    num2 = split[2]

    # Validate only + or - operators
    if operator != '+' and operator != '-':
      return "Error: Operator must be '+' or '-'."

    operators.append(operator)

    # Validate only digits
    if num1.isdecimal() == False or num2.isdecimal() == False:
      return "Error: Numbers must only contain digits."

    # Validate numbers are only 4 digits long
    num1_length = len(num1)
    num2_length = len(num2)
    if num1_length > 4 or num2_length > 4:
      return "Error: Numbers cannot be more than four digits."

    num1s.append(num1)
    num2s.append(num2)

    # Store the problem's row length by checking for the biggest number
    row_length = max(num1_length, num2_length) + 2
    row_lengths.append(row_length)

  # Start the first row of the formatted string
  i = 0
  for problem in problems:
    arranged_problems += num1s[i].rjust(row_lengths[i])
    # Add spacing for next problem, only if there is one
    if i < problem_count - 1:
      arranged_problems += " " * problem_spacing
    i += 1

  # Add a newline
  arranged_problems += "\n"

  # Make the second row of the formatted string
  i = 0
  for problem in problems:
    arranged_problems += operators[i] + num2s[i].rjust(row_lengths[i] - 1)
    if i < problem_count - 1:
      arranged_problems += " " * problem_spacing
    i += 1

  # Make the dashes row
  arranged_problems += "\n"
  i = 0
  for problem in problems:
    arranged_problems += "-" * row_lengths[i]
    if i < problem_count - 1:
      arranged_problems += " " * problem_spacing
    i += 1

  # Solve problem if asked to
  if solve == True:
    arranged_problems += "\n"

    # Make the solutions row
    i = 0
    for problem in problems:
      solution = 0
      if operators[i] == '+':
        solution = int(num1s[i]) + int(num2s[i])
      else:
        solution = int(num1s[i]) - int(num2s[i])
      arranged_problems += str(solution).rjust(row_lengths[i])
      if i < problem_count - 1:
        arranged_problems += " " * problem_spacing
      i += 1

  return arranged_problems
