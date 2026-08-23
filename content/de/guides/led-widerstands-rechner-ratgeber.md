---
title: "LED-Vorwiderstand: Bauteile schützen"
description: "Lernen Sie, warum LEDs Vorwiderstände brauchen, wie Sie Ihre Arduino-Projekte schützen und unseren LED-Widerstands-Rechner nutzen."
---

# LED-Vorwiderstand: Bauteile schützen

Schließen Sie eine LED direkt an eine 9V-Batterie an, leuchtet sie kurz hell auf, raucht und ist kaputt. Sie **müssen** einen Vorwiderstand verwenden. Wir erklären die Mathematik dahinter und unseren [LED-Widerstands-Rechner](/de/rechner/led-widerstands-rechner).

---

## 🛑 Warum brennen LEDs durch?

Eine LED hat zwei Limits:
1. **Durchlassspannung (Vf):** Die benötigte Spannung (z.B. 2V für rot).
2. **Durchlassstrom (If):** Der maximale Strom (meist 20mA).
Eine 9V-Batterie an einer 2V-LED bedeutet 7V Überschuss. Dieser Druck zwingt zu viel Strom durch die LED, sie brennt durch.

---

## 🛡️ Die Lösung: Der Vorwiderstand

Der Widerstand baut die überschüssige Spannung ab.
**Die Gleichung:** *R = (Vs - Vf) / If*
* **Vs:** Quellspannung (z.B. 9V).
* **Vf:** LED-Spannung (z.B. 2V).
* **If:** LED-Strom (z.B. 0,02A).
*(9V - 2V) / 0,02A = 350 Ohm.*

---

## ⚙️ Nutzung des Rechners

1. **Quellspannung:** Batterie oder Netzteil.
2. **LED-Spannung:** Abhängig von der Farbe.
3. **LED-Strom:** Meistens 20mA.
4. **Berechnen:** Das Tool berechnet sofort den exakten Vorwiderstand in Ohm!
