# Bytes, bits, binaries

By convention, 1 byte is 8 bits (in hexadecimal notation, where each element after the 0x is a 4-bit sequence), so `0x80` is an 8-bit sequence. It uses all 8 bits positions, with only the leftmost bit set to `1`.

---

## Bitwise operators and logical operators

> A bitwise operator is an operator that operate on individual bits.

`& AND`, `| OR`, `^ XOR`, `~ NOT`, `<< left side`, `>> right side`

When we do `>>` or `<<`, right or left numbers are discarded when they 'fall off'. However, **signed** or **unsigned** values are different. Positive numbers, zeros are always added on the left when right shifting. For negative numbers, Python does an "arithmetic shift" (it fills with `1s` to preserve the sign). In most cases with bit manipulation, you're working with positive values, so zeros are added.

> Logical operators are those that operate on boolean values

`and`, `or`, `not`

### Most Significant Bit (MSB) and Least Significant Bit (LSB). Binaries

You have to think like decimal numbers:

Decimal number `1234`, the 1 is the MSB as it places the thousand number, where 4 is the lST ad it has the smallest value.
In binary, this would be the exactly the same (MSB and LSB) (0x80 = 128 which is the MSB, being 2^7 = 128 in decimal. the last one on the right is the least significant bit being 2^0 = 1. So it would have 128, 64, 32, 16, 8, 4, 2, 1 values there) 

### Binaries

> the binary notation can be seen as, for example 11010110 (`0b11010110`)

It is called binary since the values are either 0 and 1. We can translate binaries into decimals

1000 -> (1*2^3 + 0*2^2 + 0*2^1 + 0*2^0) - 8

### Decimals

It is named as decimal since the base goes from 0 to 9 (so 10 different categories lets say) and its placeholder in a composed number is up to 10^1

- 124 ( 1*10^2 + 2*10^1 + 4*10^0 )

### Hexadecimals

> The notation is `0xD6` for a 8-bit data representation

**The numbers are stored in packets of 4 bits**, where you go from 0-9 and then A (10), B (11), C (12), D (13), E (14), F (15)

### Octal

> The notation is 0o326 (3*8^2 + 2*8^1 + 6*8^0)

Numerical system of base 8 that only uses 8 digits (0,1,2,3,4,5,6,7). **The information is stored in packets of 3 bits.** to also avoid the use of letters.

---

## Mask

> A mask is a value that selects and filter out values from a sequence. In a binary, is a combination that selects or isolate specific bits from another value **bit a bit**


1 1 0 1 0 1 1 0 -> data to inspect
0 0 1 0 0 0 0 0 -> hole at position 5
--------------- -> **AND** operation
0 0 0 0 0 0 0 0 -> (bit 5 was 0)

The and `&` operator only lets pass through the bits where the mask are 1

```python
mask = 0x80 # this would be amazing as we only have to remember 2 blocks of 4 bits.
mask_2 = 0x80 >> 2 # this would shift all the bits two positions. 
```
### Comparison

In Python, the representation of numbers generally are all in the same format, meaning that:

```python
0
0b0
0b00000000
0x0
0x00
```
**They are all the same!!**
We can check binaries against some form of representation (can we check for example that 0x80 is == 8? )