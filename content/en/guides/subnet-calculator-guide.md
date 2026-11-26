---
title: "Subnetting: Dividing the Network"
description: "Learn what subnetting is, how CIDR notation works, why IT administrators divide networks, and use our free Subnet Calculator."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "subnet-calculator"
relatedType: "calculator"
faqs:
  - question: "Why do you subtract 2 when calculating usable host IP addresses in a standard IPv4 subnet?"
    answer: "In standard IPv4 subnets (/30 and larger), the first address (all host bits set to 0) is reserved as the Network Identifier for routing tables, and the last address (all host bits set to 1) is reserved as the Subnet Broadcast Address. Neither address may be assigned to an endpoint interface, leaving 2^h minus 2 usable host IPs."
  - question: "What is the difference between classful addressing and CIDR (Classless Inter-Domain Routing)?"
    answer: "Legacy classful networking locked subnets to fixed 8-bit boundaries—Class A (/8), Class B (/16), and Class C (/24)—which wasted millions of addresses when an organization needed 300 hosts and received a /16 (65,534 hosts). Defined in RFC 4632, CIDR decouples the network prefix from class boundaries, allowing any bit-length mask from /1 to /32."
  - question: "What is VLSM (Variable Length Subnet Masking) and why does it prevent IP address waste?"
    answer: "VLSM lets network architects carve a single parent IP block into subnets of different sizes tailored to each segment—such as a /25 for 100 workstations, a /27 for 25 servers, and a /30 for a 2-host router link. Without VLSM, every link would consume an equally large block, exhausting private and public IP space prematurely."
  - question: "Are /31 and /32 subnets valid in modern IPv4 routing?"
    answer: "Yes. Under RFC 3021, a /31 subnet (2 addresses total) is valid on point-to-point router links because no broadcast address is needed when only two interfaces share a wire, cutting point-to-point IP usage in half compared to /30. A /32 mask specifies a single host route, commonly used for loopback interfaces, firewall rules, and BGP announcements."
  - question: "How does subnetting improve network performance and security segmentation?"
    answer: "Subnets restrict Layer 2 broadcast frames (such as ARP requests and DHCP discovery packets) to a single broadcast domain, preventing noisy devices from saturating large enterprise LANs. At Layer 3, inter-subnet traffic must traverse a router or firewall, enabling VLAN isolation, zero-trust ACLs, and containment of lateral malware movement."
---

**IPv4 subnetting** partitions a large IP address block into smaller, logically isolated networks—called subnets—by shifting the boundary between the **Network Prefix** and the **Host Identifier** inside a 32-bit address. Instead of placing 1,000 endpoints inside one flat broadcast domain where ARP requests and discovery chatter flood every port, administrators split that space into right-sized segments mapped to departments, VLANs, or cloud tiers.

Under **Classless Inter-Domain Routing (CIDR)**, written as `192.168.10.0/24`, the slash prefix specifies how many leading bits belong to the network (`24`) and how many trailing bits identify individual devices (`32 − 24 = 8`). Our [Subnet Calculator](/en/calculators/subnet-calculator) translates CIDR prefixes into dotted-decimal masks, wildcard masks, subnet boundaries, and usable host counts immediately.

## CIDR Architecture, Binary Masks, and Core Formulas

Every IPv4 address consists of `32 bits` grouped into four 8-bit octets (`0–255`). A **subnet mask** mirrors that 32-bit structure with contiguous binary `1`s marking the network portion and contiguous binary `0`s marking the host portion. For example, a `/26` prefix equals `11111111.11111111.11111111.11000000` in binary, or `255.255.255.192` in dotted-decimal.

```text
Host Bits Remaining:
h = 32 − /n

Total Addresses in Subnet:
N_total = 2^h

Usable Host Addresses (for /n ≤ 30):
N_usable = 2^h − 2

Subnets Created by Borrowing b Host Bits:
N_subnets = 2^b

Block Size (Increment in the Interesting Octet):
Block = 256 − Mask_octet
```

In these formulas, `/n` is the CIDR prefix length (`0–32`), `h` is the number of host bits (`32 − n`), `b` is the number of bits borrowed from a parent network prefix, and `Mask_octet` is the first subnet mask octet strictly less than `255` (the "interesting octet"). Subtracting `2` from `2^h` accounts for the reserved Network Address (all host bits `0`) and Directed Broadcast Address (all host bits `1`). Private internal deployments typically carve subnets from **RFC 1918** blocks: `10.0.0.0/8`, `172.16.0.0/12`, or `192.168.0.0/16`.

## Step-by-Step Worked VLSM Subnetting Plan

Suppose a network engineer must divide `192.168.10.0/24` (`256` total addresses) using **Variable Length Subnet Masking (VLSM)** to serve four requirements: Engineering (`100` hosts), Sales (`50` hosts), Security Cameras (`20` hosts), and one Router-to-Firewall transit link (`2` hosts). **Always allocate from largest requirement to smallest** to keep blocks aligned on power-of-two boundaries without overlap.

1. **Engineering (100 hosts needed):** Find the smallest `h` where `2^h − 2 ≥ 100`. Since `2^6 − 2 = 62` is too small and `2^7 − 2 = 126` fits, set `h = 7`, giving prefix `32 − 7 = /25` (`255.255.255.128`, block size `128`).
   - Allocation: `192.168.10.0/25` | Usable: `.1 – .126` | Broadcast: `.127`
2. **Sales (50 hosts needed):** Set `h = 6` (`2^6 − 2 = 62 ≥ 50`), giving prefix `32 − 6 = /26` (`255.255.255.192`, block size `64`). Start immediately after `.127` at `.128`.
   - Allocation: `192.168.10.128/26` | Usable: `.129 – .190` | Broadcast: `.191`
3. **Security Cameras (20 hosts needed):** Set `h = 5` (`2^5 − 2 = 30 ≥ 20`), giving prefix `32 − 5 = /27` (`255.255.255.224`, block size `32`). Start immediately after `.191` at `.192`.
   - Allocation: `192.168.10.192/27` | Usable: `.193 – .222` | Broadcast: `.223`
4. **Router-to-Firewall Link (2 hosts needed):** Set `h = 2` (`2^2 − 2 = 2`), giving prefix `32 − 2 = /30` (`255.255.255.252`, block size `4`). Start at `.224`.
   - Allocation: `192.168.10.224/30` | Usable: `.225 – .226` | Broadcast: `.227`

Addresses `.228` through `.255` (`28` IPs) remain unallocated and contiguous for future expansion—such as a `/28` (`16` IPs at `.240–.255`), a `/29` (`8` IPs at `.232–.239`), and another `/30` (`.228–.231`).

## IPv4 CIDR Prefix Reference Table

The benchmark table below summarizes seven frequently deployed IPv4 CIDR sizes across enterprise campuses, cloud VPCs, and point-to-point links.

| CIDR Prefix | Dotted-Decimal Mask | Wildcard Mask | Block Size | Total IPs (`2^h`) | Usable Hosts | Typical Deployment |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/22` | `255.255.252.0` | `0.0.3.255` | `4` (3rd octet) | `1,024` | `1,022` | High-density campus Wi-Fi or large VPC tier |
| `/24` | `255.255.255.0` | `0.0.0.255` | `1` (3rd) / `256` (4th) | `256` | `254` | Standard office LAN, branch VLAN, or home network |
| `/25` | `255.255.255.128` | `0.0.0.127` | `128` (4th octet) | `128` | `126` | Mid-sized department or staging server pool |
| `/26` | `255.255.255.192` | `0.0.0.63` | `64` (4th octet) | `64` | `62` | Small office floor, printer VLAN, or Kubernetes nodes |
| `/27` | `255.255.255.224` | `0.0.0.31` | `32` (4th octet) | `32` | `30` | Management out-of-band VLAN or DMZ perimeter |
| `/28` | `255.255.255.240` | `0.0.0.15` | `16` (4th octet) | `16` | `14` | Small server cluster or cloud NAT/bastion subnet |
| `/30` | `255.255.255.252` | `0.0.0.3` | `4` (4th octet) | `4` | `2` | Traditional point-to-point WAN or router transit link |

## Real-World Architecture, Common Errors, and Routing Caveats

### Operational Use Cases and Cloud Reservations

In enterprise switching, subnetting establishes a clean **1:1 mapping between Layer 2 VLANs and Layer 3 IP prefixes**, allowing firewalls to inspect and filter traffic between guest Wi-Fi, VoIP phones, and internal databases. In routing protocols like OSPF and BGP, **route summarization (supernetting)** collapses dozens of contiguous `/24` subnets (such as `10.10.0.0/24` through `10.10.3.0/24`) into a single `10.10.0.0/22` summary route, shrinking routing tables and stabilizing convergence.

Public cloud platforms impose stricter host limits than standard RFC calculations. In Amazon Web Services (AWS) VPCs and Microsoft Azure VNets, the cloud fabric reserves **5 IP addresses** per subnet (network ID, virtual router, internal DNS, future use, and broadcast), reducing usable hosts to `2^h − 5`. A cloud `/28` yields `11` usable IPs rather than `14`, and `/29` is the smallest supported AWS subnet (`3` usable IPs).

### Common Pitfalls and Protocol Limits

Three mistakes frequently break rollouts: allocating small subnets before large ones (causing overlapping blocks), deploying `192.168.1.0/24` or `192.168.0.0/24` on corporate LANs (which collides with home routers over VPNs), and omitting DHCP headroom for device growth. Finally, **non-contiguous subnet masks** (such as `255.255.255.130`) violate RFC 950 and fail validation on modern IP stacks, while IPv6 replaces variable host-conservation masks with standard `/64` LAN prefixes and Neighbor Discovery instead of broadcasts.
