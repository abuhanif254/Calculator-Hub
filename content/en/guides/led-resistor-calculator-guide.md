---
title: "LED Resistors: Protecting Your Components"
description: "Learn why LEDs need resistors, how to prevent your Arduino projects from blowing up, and use our free LED Resistor Calculator."
---

# LED Resistors: Protecting Your Components

If you are getting started with Arduino, Raspberry Pi, or general DIY electronics, one of the first things you will try to do is light up a tiny LED. 
If you connect that LED directly to a 9V battery, it will shine incredibly bright for a fraction of a second, make a popping noise, let out some magic smoke, and permanently die.

To prevent this, you **must** use a resistor. In this guide, we will explain the math behind LED circuits and show you how to use our free [LED Resistor Calculator](/en/calculators/led-resistor-calculator) to find the perfect resistor for your project.

---

## 🛑 Why Do LEDs Blow Up?

An LED (Light Emitting Diode) is a very sensitive component. It has two specific ratings you must respect:
1. **Forward Voltage (Vf):** The exact amount of voltage the LED needs to turn on. (Usually around 2V for a red LED, or 3.3V for a blue LED).
2. **Forward Current (If):** The maximum amount of current the LED can safely handle before overheating and melting. (Usually around 20mA, or 0.02 Amps).

When you connect a 2V LED to a 9V battery, there is 7 Volts of *excess pressure* pushing through the LED. This excess pressure forces way too much current (Amps) through the diode, causing it to overheat and explode.

---

## 🛡️ How the Resistor Saves the Day

To fix this, we place a Resistor in the circuit. The resistor's job is to absorb all of that excess voltage, burning it off as a tiny bit of heat, so that the LED only receives exactly the voltage and current it needs.

**The Equation:** *R = (Vs - Vf) / If*

* **R:** The Resistance you need (in Ohms).
* **Vs:** The Source Voltage (e.g., 9V from the battery).
* **Vf:** The LED's Forward Voltage (e.g., 2V).
* **If:** The LED's desired Current (e.g., 20mA or 0.02A).

*(9V - 2V) / 0.02A = 350 Ohms.* 
You need a 350-Ohm resistor to protect this LED!

---

## ⚙️ Using the LED Resistor Calculator

Don't guess which resistor to use. 

1. **Source Voltage:** The voltage of your battery or power supply.
2. **LED Voltage:** Check the data sheet for your LED color.
3. **LED Current:** Usually 20mA for standard 5mm LEDs.
4. **Calculate:** The tool will instantly output the exact Ohms required to protect your circuit!
