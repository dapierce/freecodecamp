# My solution for Probability Calculator
# Author: David Pierce
import copy
import random
# Consider using the modules imported above.


class Hat:

  def __init__(self, **kwargs):
    self.contents = []
    for item in kwargs.items():
      for n in range(0, item[1]):
        self.contents.append(item[0])

  def draw(self, number):
    drawn_items = []

    # Retrun all if number exeeds contents
    if number >= len(self.contents):
      drawn_items = self.contents.copy()
      self.contents = []
      return drawn_items

    # Otherwise, remove by random number
    for n in range(0, number):
      drawn_items.append(
        self.contents.pop(random.randint(0,
                                         len(self.contents) - 1)))
    return drawn_items


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  count_success = 0

  for n in range(0, int(num_experiments)):
    # Make a new, completely separate hat each experiment and draw from it
    test_hat = copy.deepcopy(hat)
    test_draw = test_hat.draw(num_balls_drawn)

    # Check each expected ball to the drawn object
    test_expected = copy.copy(expected_balls)
    matches = 0
    for item in test_draw:
      # Check for a matching color, and check if there's any left
      if item in test_expected and test_expected[item] > 0:
        # This ball has a matching one, remove it from the expected pool
        matches += 1
        test_expected[item] -= 1
    # The whole draw was a match!
    if matches == sum(expected_balls.values()):
      count_success += 1

  return count_success / num_experiments
