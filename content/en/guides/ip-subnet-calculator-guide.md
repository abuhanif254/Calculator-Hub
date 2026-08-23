---
title: "IP Subnetting: Host Ranges and Broadcasts"
description: "Take a deeper dive into IPv4 subnetting. Learn how to calculate network IDs, broadcast addresses, and host ranges using our free IP Subnet Calculator."
---

# IP Subnetting: Host Ranges and Broadcasts

In our basic subnetting guide, we explained *why* IT administrators divide networks (to reduce noise and increase security). In this guide, we are going to look under the hood and explain *how* the numbers actually work.

If you are a system administrator or studying for your CCNA, you must understand how to find the first and last usable IP address in any subnet. Let's break down the math, and show you how to skip the tedious binary conversions using our free [IP Subnet Calculator](/en/calculators/ip-subnet-calculator).

---

## 🌐 The 4 Parts of a Subnet

When you carve out a subnet from a larger IP block, you are creating a specific, mathematical range of IP addresses. Every single subnet in the world has four critical parts:

**1. The Network Address (The Name tag):** 
This is the very first IP address in the subnet. It acts as the identifier for the entire network. *You cannot assign this IP to a computer.*

**2. The First Usable Host:** 
This is the Network Address + 1. This is the first IP you can assign to a router or a PC.

**3. The Last Usable Host:** 
This is the highest IP you can assign to a PC.

**4. The Broadcast Address (The Megaphone):** 
This is the very last IP address in the subnet. If a computer sends a message to this specific IP, the network switch will copy the message and yell it to every single computer in the subnet simultaneously. *You cannot assign this IP to a computer.*

---

## 📝 Example: A /24 Network

Let's look at a standard home network: `192.168.1.0 /24`.
A `/24` mask means the network holds 256 total addresses. 

* **Network Address:** `192.168.1.0` *(Cannot be used)*
* **First Usable Host:** `192.168.1.1` *(Usually your home Wi-Fi router)*
* **Last Usable Host:** `192.168.1.254` *(The highest IP your PC can get)*
* **Broadcast Address:** `192.168.1.255` *(Cannot be used)*

Because we lose the first IP (Network) and the last IP (Broadcast), a `/24` subnet has exactly **254 usable IPs** for laptops, phones, and TVs. 

---

## ⚙️ Using the IP Subnet Calculator

If you are dealing with weird subnets like a `/27` or a `/22`, doing the binary math by hand takes forever. 

1. **Enter IP Address:** Type in any IPv4 address (e.g., 10.0.5.50).
2. **Select CIDR Mask:** Choose your subnet size (e.g., /26).
3. **Calculate:** The tool will instantly do the binary math and output your exact Network Address, Broadcast Address, and your range of Usable Hosts!
