---
title: "Subnetting: Dividing the Network"
description: "Learn what subnetting is, how CIDR notation works, why IT administrators divide networks, and use our free Subnet Calculator."
---

# Subnetting: Dividing the Network

If you work in IT or study for network certifications (like CompTIA Network+ or CCNA), you will inevitably run into Subnetting. For many beginners, it is the most confusing topic in all of networking.

In this guide, we will break down the concept of Subnets without the complicated math, explain why we use them, and show you how to use our free [Subnet Calculator](/en/calculators/subnet-calculator).

---

## 🏢 The Office Building Analogy

Imagine a massive office building with 1,000 employees. If all 1,000 employees sat in one giant, open-concept room and tried to talk to each other at the same time, the noise would be deafening. Nobody could get any work done. 

This is exactly what happens on a computer network. Devices are constantly "shouting" background broadcast messages to each other. If you put 1,000 computers on the exact same network, the broadcast traffic will overwhelm the network and crash it.

**The Solution?** Build walls. 
You divide the massive 1,000-person room into smaller, isolated departments (HR, Sales, IT, etc.). In networking, we take one massive IP address range and divide it into smaller, isolated networks. We call these **Subnets**. 

By subnetting, the HR computers can only "shout" at other HR computers, keeping the overall network fast and secure.

---

## 📝 Subnet Masks and CIDR Notation

To tell a computer how big its specific "room" (subnet) is, we use a **Subnet Mask**. 

You will often see an IP address written like this: `192.168.1.50 /24`. 
That `/24` at the end is called **CIDR Notation**. It is a shorthand way of writing the Subnet Mask. 

The `/24` means that the first 24 bits of the IP address are locked in as the "Network ID" (the name of the room), and the remaining 8 bits are left open for the "Host ID" (the specific computers in the room). 
A `/24` network can hold exactly **254 usable computers**. 

If we needed a smaller room for just 14 computers, we could use a `/28` subnet mask instead!

---

## ⚙️ Using the Subnet Calculator

Subnet math involves converting IP addresses into binary (1s and 0s) and doing bitwise calculations. It is tedious and error-prone. In the real world, IT professionals use calculators.

1. **Enter IP Address:** A standard IPv4 address.
2. **Select Subnet Mask / CIDR:** Choose how big you want the network to be.
3. **Calculate:** The tool will instantly calculate the Network Address, Broadcast Address, and the exact range of usable IPs for your computers!
