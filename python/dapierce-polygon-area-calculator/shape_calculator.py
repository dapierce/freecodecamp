# My solution for Polygon Area Calculator
# Author: David Pierce
class Rectangle:

  def __init__(self, width, height):
    self.set_width(width)
    self.set_height(height)

  def set_width(self, width):
    self.width = width

  def set_height(self, height):
    self.height = height

  def get_area(self):
    return self.width * self.height

  def get_perimeter(self):
    return 2 * self.width + 2 * self.height

  def get_diagonal(self):
    return (self.width**2 + self.height**2)**.5

  def get_picture(self):
    max_size = 50
    if self.width > max_size or self.height > max_size:
      return "Too big for picture."

    picture = ""
    for n in range(self.height):
      picture += "*" * self.width
      picture += "\n"
    return picture

  def get_amount_inside(self, shape):
    # Check if self is smaller
    if self.width < shape.width or self.height < shape.height:
      return 0

    times_width = int(self.width / shape.width)
    times_height = int(self.height / shape.height)

    return times_width * times_height

  def __str__(self):
    return "Rectangle(width=" + str(self.width) + ", height=" + str(
      self.height) + ")"


class Square(Rectangle):

  def __init__(self, side):
    self.set_side(side)

  def set_side(self, side):
    self.width = side
    self.height = side

  def __str__(self):
    return "Square(side=" + str(self.width) + ")"
