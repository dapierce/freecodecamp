# My solution for Time Calculator
# Author: David Pierce
def add_time(start, duration, start_day=""):

  # Variables used to calculate time
  new_time = 0
  hours_in_day = 24
  hours_in_midday = 12
  minutes_in_hour = 60
  days_of_week = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday"
  ]

  # Variables used to store time
  total_days = 0
  new_hours = 0
  new_am_pm = "AM"
  start_day_index = None
  new_day_index = None

  # Split up given times into hours, minutes, AM/PM
  start_time = start.split()[0].split(":")
  start_am_pm = start.split()[1]
  duration_time = duration.split(":")

  # Convert start time to 24hr
  start_hour_24hr = int(start_time[0])
  if start_am_pm == "PM":
    start_hour_24hr += hours_in_midday

  # First calculate minutes
  new_minutes = int(start_time[1]) + int(duration_time[1])

  # Calculate extra hours from minutes calculation
  new_hours = int(new_minutes / minutes_in_hour)
  # And subtract an hour from minutes if over an hour
  if new_minutes >= minutes_in_hour:
    new_minutes -= (new_hours * 60)
  # Add hours from duration input
  new_hours += int(duration_time[0])
  total_hours_24hr = start_hour_24hr + new_hours

  # Determine new am/pm
  if ((total_hours_24hr / hours_in_midday) % 2) >= 1:
    new_am_pm = "PM"

  # Check if duration goes from night to next morning
  if start_am_pm == "PM" and new_am_pm == "AM":
    total_days += 1

  # If more than a day, count the number of days
  if total_hours_24hr >= hours_in_day:
    new_hours = new_hours % hours_in_day
    new_hours += start_hour_24hr - hours_in_day
    # Edge case: span a day and end up with negative new_hours
    if new_hours < 0:
      new_hours += hours_in_day

    # Start calculating number of days_of_week
    total_days += int((total_hours_24hr - start_hour_24hr) / hours_in_day)
  else:
    if total_hours_24hr >= hours_in_midday:
      new_hours = new_hours % hours_in_midday
      new_hours += start_hour_24hr - hours_in_midday

  # 12 o'clock edge cases
  if new_hours == 24 or (new_hours == 0 and int(duration_time[1]) != 0):
    new_hours = 12

  # 0 hour edge cases
  if new_hours == 0 and int(duration_time[1]) == 0:
    new_hours = int(start_time[0])

  # Determine the day if day is entered
  if start_day != "":
    i = 0
    for day in days_of_week:
      if start_day.lower() == day.lower():
        start_day_index = i
      i += 1
    # Calculate days
    new_day_index = int((start_day_index + total_days) % len(days_of_week))

  # Format the return string
  new_time = str(new_hours) + ":" + '{0:0{width}}'.format(
    new_minutes, width=2) + " " + str(new_am_pm)
  if start_day_index:
    new_time += ", " + days_of_week[new_day_index]
  if total_days >= 2:
    new_time += " (" + str(total_days) + " days later)"
  if total_days == 1:
    new_time += " (next day)"

  return new_time
