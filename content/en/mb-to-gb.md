---
title: "MB to GB Converter: Exact Decimal (SI) & Binary (IEC) Conversion"
description: "Convert megabytes to gigabytes accurately with SI decimal (÷ 1,000) and IEC binary (÷ 1,024) formulas, worked examples, storage tables, and OS size guides."
faqs:
  - question: "How many megabytes are in a gigabyte?"
    answer: "Under the International System of Units (SI) decimal standard used by SSD manufacturers and telecom carriers, 1 gigabyte (GB) equals exactly 1,000 megabytes (MB). Under the binary IEC standard used by RAM modules and Windows file systems, 1 gibibyte (GiB) equals 1,024 mebibytes (MiB)."
  - question: "Why does my 500 GB SSD only show 465 GB in Windows?"
    answer: "Storage manufacturers label drives in decimal gigabytes (500,000,000,000 bytes), whereas Windows calculates capacity in binary gibibytes (1 GiB = 1,073,741,824 bytes) while still displaying the GB label. Dividing 500 billion bytes by 1,073,741,824 yields 465.66 GiB, which appears as 465 GB."
  - question: "Should I divide MB by 1,000 or 1,024 for mobile data plans?"
    answer: "Always divide by 1,000 when tracking cellular data, broadband caps, and cloud storage billing. Mobile carriers and ISP meters follow SI decimal prefixes, meaning 1,000 MB of data usage equals exactly 1 GB of your monthly allowance."
  - question: "What is the difference between MB/GB and MiB/GiB?"
    answer: "MB and GB are base-10 decimal units defined by powers of 1,000 (10^6 and 10^9 bytes). MiB (mebibyte) and GiB (gibibyte) are base-2 binary units defined by IEC 80000-13 as powers of 1,024 (2^20 and 2^30 bytes)."
  - question: "How do I convert decimal GB to binary GiB quickly?"
    answer: "Multiply the decimal GB value by 0.9313226 (or divide bytes by 1,073,741,824). For example, a 1,000 GB (1 TB) decimal drive equals roughly 931.32 GiB in binary operating-system reporting."
---

To convert megabytes (MB) to gigabytes (GB) under the International System of Units (SI), divide the megabyte value by `1,000`: **`GB = MB ÷ 1,000`**. Because `1 GB` contains `1,000 MB` in base-10 decimal notation, `5,000 MB` equals exactly `5 GB`, and `1 MB` equals `0.001 GB`. This decimal factor is the global standard for solid-state drives (SSDs), hard disk drives, SD cards, mobile data plans, and cloud object storage.

When working with system memory (RAM), virtual machine allocations, or Windows file-size reporting, computing systems instead use base-2 binary prefixes where **`GiB = MiB ÷ 1,024`**. In that binary system, `1 gibibyte (GiB)` equals `1,024 mebibytes (MiB)`, making `16,384 MiB` equal to `16 GiB`. Distinguishing between `÷ 1,000` (SI) and `÷ 1,024` (IEC) prevents capacity miscalculations across hardware, networking, and software environments.

## Exact Conversion Formula & International Standards

Two distinct international standards govern digital information units, and both rely on formal quantity notation outlined in **ISO 80000-2** and **NIST Special Publication 330**. In the SI decimal standard maintained by the Bureau International des Poids et Mesures (BIPM) and NIST, the prefix *mega* (`M`) strictly denotes `10⁶` (`1,000,000`) and *giga* (`G`) strictly denotes `10⁹` (`1,000,000,000`). Consequently, `1 MB = 1,000,000 bytes`, `1 GB = 1,000,000,000 bytes`, and the exact decimal conversion formula is:

`GB = MB ÷ 1,000` (equivalently, `GB = MB × 0.001`)

To resolve historical ambiguity between decimal hardware capacities and binary memory addressing, the International Electrotechnical Commission introduced **IEC 80000-13** (originally IEC 60027-2). This standard defines binary prefixes: *mebi* (`Mi`) for `2²⁰` (`1,048,576` bytes) and *gibi* (`Gi`) for `2³⁰` (`1,073,741,824` bytes). Because `2³⁰ ÷ 2²⁰ = 2¹⁰ = 1,024`, the exact binary conversion formula is:

`GiB = MiB ÷ 1,024` (equivalently, `GiB = MiB × 2⁻¹⁰`)

When translating directly from a decimal `GB` figure to a binary `GiB` reading, you must account for the `7.37%` gap between `10⁹` and `2³⁰`: `1 GB = 1,000,000,000 ÷ 1,073,741,824 ≈ 0.93132 GiB`.

## Step-by-Step Worked Practical Examples

### 1. Mobile Data Plan Usage (SI Decimal)
Suppose you download `4,750 MB` of offline navigation maps, podcasts, and system updates over a 5G cellular plan billed in SI decimal units.
1. Apply the SI formula: `GB = 4,750 ÷ 1,000`.
2. Calculate the result: `4.75 GB`.
3. Subtract from a `15 GB` monthly cap: `15 - 4.75 = 10.25 GB` (`10,250 MB`) remaining.

### 2. Cloud Server & RAM Allocation (IEC Binary)
A DevOps engineer configures a Linux container host and allocates `24,576 MiB` of RAM for an in-memory Redis cluster.
1. Apply the binary IEC formula: `GiB = 24,576 ÷ 1,024`.
2. Calculate the result: `24 GiB`.
3. Verify byte alignment: `24 × 1,073,741,824 = 25,769,803,776 bytes`.

### 3. SSD Capacity Check in Windows vs. macOS
A workstation ships with a `500 GB` (`500,000 MB`) NVMe SSD. Why do operating systems report different totals?
1. Compute raw decimal capacity in bytes: `500,000 × 1,000,000 = 500,000,000,000 bytes`.
2. In macOS (Finder uses SI decimal since OS X 10.6): `500,000,000,000 ÷ 1,000,000,000 = 500 GB`.
3. In Windows File Explorer (calculates binary GiB but displays the `GB` unit): `500,000,000,000 ÷ 1,073,741,824 = 465.66 GiB`. Formatted file-system overhead reduces usable space slightly further.

## Quick Reference Conversion Table

The table below compares common megabyte values converted under both the decimal SI standard (`÷ 1,000`) and the binary IEC standard (`÷ 1,024`).

| Megabytes (MB / MiB) | Decimal SI (`GB = MB ÷ 1,000`) | Binary IEC (`GiB = MiB ÷ 1,024`) | Practical Context |
| :--- | :--- | :--- | :--- |
| 100 | 0.1 GB | 0.0977 GiB | High-res photo batch / mobile app installer |
| 256 | 0.256 GB | 0.25 GiB | Quarter-gibibyte embedded cache allocation |
| 500 | 0.5 GB | 0.4883 GiB | Half-gigabyte cloud backup snapshot |
| 512 | 0.512 GB | 0.5 GiB | Half-gibibyte GPU frame buffer / swap partition |
| 1,000 | 1 GB | 0.9766 GiB | Standard 1 GB cellular data increment |
| 1,024 | 1.024 GB | 1 GiB | Exact 1 GiB RAM or container memory block |
| 2,048 | 2.048 GB | 2 GiB | Entry smartphone / IoT RAM allocation |
| 4,096 | 4.096 GB | 4 GiB | Max file size on legacy FAT32 file systems |
| 10,000 | 10 GB | 9.7656 GiB | Monthly 10 GB cloud or cellular tier |
| 16,384 | 16.384 GB | 16 GiB | Standard workstation 16 GiB DDR5 kit |

## Industry Use Cases, Regional Pitfalls & Common Mistakes

Storage engineers, web developers, and procurement teams encounter conversion errors whenever decimal and binary domains intersect without explicit unit labels.

- **Mixing Bits and Bytes in Networking:** Internet providers advertise speeds in **megabits per second (Mbps)** and **gigabits per second (Gbps)**, not megabytes. Because `1 byte = 8 bits`, a `1,000 Mbps` (`1 Gbps`) fiber line transfers at most `125 MB/s` (`0.125 GB/s`) before TCP/IP overhead. Never divide megabits directly by `1,000` expecting gigabytes.
- **Operating System Reporting Differences:** Windows uses `KB`, `MB`, and `GB` labels for binary powers of `1,024`, whereas macOS and Ubuntu Linux display decimal SI `GB` for disk storage and `GiB` for memory. Always inspect raw byte counts when auditing storage quotas across mixed-OS environments.
- **Cloud Storage Billing Mismatches:** AWS S3, Google Cloud Storage, and Azure Blob Storage price capacity in decimal GB (`1,000³` bytes) or binary GiB (`1,024³` bytes) depending on the service SKU. Applying `÷ 1,024` to a decimal invoice introduces a `2.4%` error per prefix tier—compounding to `7.37%` for gigabytes and nearly `10%` for terabytes.
- **FAT32 File Size Limits:** Legacy FAT32 partitions cap single files at `4 GiB - 1 byte` (`4,096 MiB - 1 byte`, or `4.2949 GB`), so a `4.1 GB` video fits while a `4.5 GB` ISO fails even with free space remaining.
