---
title: "IP Subnetting: Host Ranges and Broadcasts"
description: "Take a deeper dive into IPv4 subnetting. Learn how to calculate network IDs, broadcast addresses, and host ranges using our free IP Subnet Calculator."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ip-subnet-calculator"
relatedType: "calculator"
faqs:
  - question: "How do you find the Network ID and Broadcast Address from an arbitrary IP address and mask?"
    answer: "Perform a bitwise AND between the IP address and the subnet mask to zero out all host bits and obtain the Network Address. Then perform a bitwise OR between the Network Address and the wildcard (inverse) mask to set all host bits to 1, yielding the Broadcast Address. For block boundaries in one octet, divide the IP octet by (256 minus the mask octet), round down, and multiply back by the block size."
  - question: "Can an IP address ending in .0 or .255 ever be a valid usable host address?"
    answer: "Yes, whenever the subnet mask is shorter than /24 (such as /23, /22, or /16). For example, in 10.14.84.0/22 (spanning 10.14.84.0 through 10.14.87.255), only 10.14.84.0 is the Network ID and 10.14.87.255 is the Broadcast Address. Intermediate addresses such as 10.14.85.0 and 10.14.85.255 have mixed host bits and are valid usable host IPs."
  - question: "How does the bitwise AND operation determine whether two devices are on the same local subnet?"
    answer: "When Host A sends a packet to IP B, Host A computes (IP_A AND Mask_A) and (IP_B AND Mask_A). If the two resulting Network IDs match, Host A treats IP B as local and sends an ARP broadcast directly for its MAC address. If the Network IDs differ, Host A forwards the frame to its configured Default Gateway."
  - question: "What is the difference between a directed broadcast and a limited broadcast (255.255.255.255)?"
    answer: "A limited broadcast (255.255.255.255) targets every host on the sender's local Layer 2 segment and is never forwarded by routers—it is used during initial DHCP discovery before a host holds an IP. A directed broadcast targets the all-ones host address of a specific subnet (such as 172.16.45.159 for 172.16.45.128/27) and is blocked at Layer 3 by default under RFC 2644 to prevent Smurf amplification attacks."
  - question: "Why do cloud platforms like AWS and Azure give fewer usable host IPs than 2^h minus 2?"
    answer: "Standard RFC subnetting reserves 2 addresses per subnet (Network ID and Broadcast). Cloud providers reserve additional infrastructure addresses inside every subnet: AWS, Azure, and GCP typically reserve the first four addresses (.0, .1, .2, .3) plus the broadcast address (.255 in a /24), leaving 2^h minus 5 usable endpoints (or 2^h minus 4 in some GCP configurations)."
---

Given an arbitrary host address and mask—such as `172.16.45.138/27` or `10.14.87.200/22`—every operating system kernel, switch, and router resolves the exact boundaries of its subnet using **bitwise boolean logic**. Those calculations establish four immutable boundary addresses: the **Network ID**, the **First Usable Host**, the **Last Usable Host**, and the **Broadcast Address**.

Knowing how to derive those four boundaries prevents misconfigured static gateways, asymmetric routing black holes caused by mismatched masks, and invalid DHCP pool ranges. Our [IP Subnet Calculator](/en/calculators/ip-subnet-calculator) performs the 32-bit binary math instantaneously and reports the complete address range, wildcard mask, and usable host capacity for any IPv4 input.

## Bitwise Logic and the Four Boundaries of Every Subnet

Every standard IPv4 subnet (`/30` and wider) separates its address space into four deterministic components:

- **Network Address (Network ID):** All host bits equal `0`. Identifies the subnet inside routing tables; cannot be assigned to a host interface.
- **First Usable Host:** Equal to `Network Address + 1`. Commonly assigned to the subnet's default gateway router.
- **Last Usable Host:** Equal to `Broadcast Address − 1`. The highest valid endpoint IP in the range.
- **Broadcast Address:** All host bits equal `1`. Frames sent to this address are delivered to every interface on that local subnet; cannot be assigned to an endpoint.

```text
Bitwise Derivation (32-Bit Unsigned Integers):
Wildcard_Mask = 255.255.255.255 XOR Subnet_Mask
Network_ID    = Host_IP AND Subnet_Mask
Broadcast_ID  = Network_ID OR Wildcard_Mask
First_Host    = Network_ID + 1   (for /n ≤ 30)
Last_Host     = Broadcast_ID − 1 (for /n ≤ 30)

Fast Octet Block-Boundary Method (at the Interesting Octet):
Block_Size       = 256 − Mask_octet
Network_octet    = floor(IP_octet / Block_Size) × Block_Size
Broadcast_octet  = Network_octet + Block_Size − 1
```

Whenever the interesting octet (the first mask octet below `255`) is the 2nd or 3rd octet, every octet to its right becomes `0` in the Network ID and `255` in the Broadcast Address.

## Step-by-Step Worked Calculations Across Non-Byte Boundaries

### Example A: Fourth-Octet Boundary (`172.16.45.138/27`)

A `/27` prefix leaves `32 − 27 = 5` host bits and translates to mask `255.255.255.224` (wildcard `0.0.0.31`). The interesting octet is the **4th octet** (`138`), where mask octet `224` sets the block size.

1. **Compute block size:** `256 − 224 = 32`. Subnets begin on multiples of `32`: `0, 32, 64, 96, 128, 160, 192, 224`.
2. **Locate the enclosing block:** `floor(138 / 32) × 32 = 4 × 32 = 128`. In binary, `138` (`10001010`) `AND` `224` (`11100000`) equals `10000000` (`128`).
3. **Compute the Broadcast octet:** `128 + 32 − 1 = 159`.
4. **Determine the four boundaries:**
   - **Network Address:** `172.16.45.128`
   - **First Usable Host:** `172.16.45.129`
   - **Last Usable Host:** `172.16.45.158`
   - **Broadcast Address:** `172.16.45.159`
   - **Usable Hosts:** `2^5 − 2 = 30` addresses.

### Example B: Third-Octet Supernet Boundary (`10.14.87.200/22`)

A `/22` prefix leaves `32 − 22 = 10` host bits (`255.255.252.0`, wildcard `0.0.3.255`). Here the interesting octet is the **3rd octet** (`87`).

1. **Compute block size:** `256 − 252 = 4`. Blocks advance by `4` in the 3rd octet (`0, 4, 8, ..., 80, 84, 88`).
2. **Locate the enclosing block:** `floor(87 / 4) × 4 = 21 × 4 = 84`. Set the 4th octet to `0` for the Network ID.
3. **Compute the Broadcast boundaries:** `84 + 4 − 1 = 87` in the 3rd octet, and `255` in the 4th octet.
4. **Determine the four boundaries:**
   - **Network Address:** `10.14.84.0`
   - **First Usable Host:** `10.14.84.1`
   - **Last Usable Host:** `10.14.87.254`
   - **Broadcast Address:** `10.14.87.255`
   - **Usable Hosts:** `2^10 − 2 = 1,022` addresses. Crucially, `10.14.85.0`, `10.14.85.255`, and `10.14.86.0` sit inside the middle of the block and are **100% valid host IPs**.

## Host Range and Boundary Reference by Mask

The table below demonstrates exact boundary calculations across seven arbitrary IP/CIDR pairs spanning `/21` through `/30`.

| Input IP / CIDR | Subnet Mask | Network ID | Usable Host Range | Broadcast IP | Usable Hosts |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `10.20.19.44/21` | `255.255.248.0` | `10.20.16.0` | `10.20.16.1 – 10.20.23.254` | `10.20.23.255` | `2,046` |
| `10.14.87.200/22` | `255.255.252.0` | `10.14.84.0` | `10.14.84.1 – 10.14.87.254` | `10.14.87.255` | `1,022` |
| `192.168.50.190/25` | `255.255.255.128` | `192.168.50.128` | `192.168.50.129 – 192.168.50.254` | `192.168.50.255` | `126` |
| `172.16.12.77/26` | `255.255.255.192` | `172.16.12.64` | `172.16.12.65 – 172.16.12.126` | `172.16.12.127` | `62` |
| `172.16.45.138/27` | `255.255.255.224` | `172.16.45.128` | `172.16.45.129 – 172.16.45.158` | `172.16.45.159` | `30` |
| `192.168.8.105/28` | `255.255.255.240` | `192.168.8.96` | `192.168.8.97 – 192.168.8.110` | `192.168.8.111` | `14` |
| `203.0.113.10/30` | `255.255.255.252` | `203.0.113.8` | `203.0.113.9 – 203.0.113.10` | `203.0.113.11` | `2` |

## Operational Use Cases, Misconfigurations, and Protocol Caveats

### Diagnosing Mask Mismatches and Configuring DHCP Exclusions

Mismatched subnet masks on the same VLAN trigger one-way connectivity bugs that look like firewall failures. If Host A (`192.168.50.20/24`) sends traffic to Host B (`192.168.50.190/25`), Host A's bitwise `AND` places `.190` on its local subnet and broadcasts an ARP request directly. Host B's `/25` mask places `.20` outside `192.168.50.128/25`, so Host B routes replies to its default gateway instead—breaking TCP handshakes unless Proxy ARP masks the misconfiguration.

When provisioning DHCP servers, always exclude static infrastructure addresses (gateway `.1` or `.254`, access points, printers) from the dynamic lease pool, and verify that the Network ID and Broadcast IP are never typed into static server configurations.

### Wildcard ACLs, Broadcast Security, and Cloud Caveats

Enterprise router access-control lists (ACLs) and OSPF `network` statements use the **wildcard mask** (`0.0.0.31` for `/27`) rather than the subnet mask, where `0` means "match this bit exactly" and `1` means "ignore this bit." Separately, modern routers disable forwarded **directed broadcasts** (`no ip directed-broadcast`) in compliance with **RFC 2644** because forged ICMP echo packets sent to a remote subnet's broadcast address historically enabled **Smurf DDoS amplification attacks**. Finally, remember that cloud VPCs reserve extra addresses beyond `.0` and broadcast (`2^h − 5` usable in AWS and Azure), requiring careful boundary verification before deploying auto-scaling clusters.
