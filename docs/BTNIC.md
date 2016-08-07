# I2C Ethernet Module/Onboard Ethernet

## Overview

The I2C Ethernet module is a board that you can use to link your BrewTroller to the outside world.  
![](http://www.brewtroller.org/images/I2CEthernetPhoto.jpg)

## Specifications

*   Board Size: H 1.7" X W 2.2"
*   Power Input: 12v 1A

# **Initial Setup**

1.  ﻿Connect your BrewTroller or I2CETH to your network via the Ethernet Jack
2.  By Default, BrewTroller will use DHCP to get an ip address.  You can use a tool like Fing (android) or nmap/zenmap (PC/Mac/Linux) or the [Mirochip Discovery Tool](http://www.brewtroller.org/customIDE/Microchip%20Ethernet%20Discoverer.exe) to find the IP Address
3.  Put the IP Address into a browser address bar
4.  On the page that comes up click "Configuration/Diagnostics"
5.  The default user/pass is admin/password
6.  IF you want to change to a static IP, do it in the Network Configuration
7.  Click on Web Server Configuration
8.  Uncheck "Require Authentication for Data Requests"
9.  Change the URL in the address bar to [http://www.brewtroller.org/webapp](http://www.brewtroller.org/webapp)
10.  Click the gear icon, and put in your BrewTroller's IP Address
11.  Uncheck "Use Authentication"
12.  Click Connect
13.  You should now be connected to your BrewTroller

# BrewTroller Network Command Reference

## Overview

This document describes the BTnic protocol for communication with BrewTroller over Serial or I2C.

1.  The BTnic serial protocol is available in BrewTroller 2.1 Build 572 and above
2.  The BTnic I2C protocol is available in BrewTroller 2.3 and above. However, only BrewTroller 2.4 and above is recommended for use with BTnic over I2C (BTNIC_EMBEDDED support)
3.  The BTnic protocol is non-broadcasting so log messages are sent only upon request
4.  Messages from BrewTroller are terminated with a carriage return character (ASCII 13, or '\r') and a newline character (ASCII 10, or '\n').
5.  Commands to BrewTroller are terminated with a carriage return character (\r or ASCII 13).
6.  Message and Command fields are TAB delimited.
7.  There is no limit on the number of fields or characters per field but the total message length is currently limited to 256 chars (increased to 1024 in BrewTroller 2.6)
8.  BTnic uses short one-byte command codes allowing for significant code savings by checking byte values instead of performing string comparisons
9.  BTnic command codes align with ASCII values for A-Z,a-z to make testing in terminal programs easier
10.  The BTnic command field includes a command index if appropriate for the command. For example, to get the current setpoint of a vessel the command field includes the command code ('t') followed by the vessel index ('0' for HLT, '1' for Mash, '2' for Kettle, etc.). The entire command to request the HLT setpoint would be: 't0'. To set a setpoint you must use the set setpoint command code and include the new setpoint as a second parameter: 'X0 180'
11.  All commands result in a response message
12.  A successful response will include a command code field followed by any command specific response fields
13.  A successful command to set a value will return the equivalent command response to get that value. This is done to allow for future caching of responses. Changing a value would force the cache to be updated for future get requests.
14.  An unsuccessful response consists of a timestamp field, one of the following error code fields and the rejected command code:
    1.  (!) Invalid command
    2.  ($) Invalid command index
    3.  (#) Invalid command parameter(s)

## BTnic Function Reference

The following reference is valid for BrewTroller 2.6 Build 1.

### Set Program Settings ('?', 63, 0x3F)

1.  Description: Sets the specified saved program's settings
2.  Command Code: '?' (ASCII), 63 (Decimal), 0x3F (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters:
    1.  Program Name
    2.  Batch Volume (thousandths of gal/l)
    3.  Grain Weight (thousandths of lb/kg)
    4.  Mash Ratio (hundreths of lbs/kg per qt/l, 0 = No Sparge)
    5.  Dough In Temperature
    6.  Dough in Minutes
    7.  Acid Temperature
    8.  Acid Minutes
    9.  Protein Temperature
    10.  Protein Minutes
    11.  Sacch Temperature
    12.  Sacch Minutes
    13.  Sacch2 Temperature
    14.  Sacch2 Minutes
    15.  Mashout Temperature
    16.  Mashout Minutes
    17.  Sparge Temp
    18.  HLT Setpoint
    19.  Boil Mins
    20.  Pitch Temp
    21.  Boil Additions (Bit Mask)
    22.  Mash Liquor Heat Source (0=HLT, 1=Mash)
5.  Response Code: '@' (ASCII), 64 (Decimal), 0x40 (Hex)
6.  Response Parameters:
    1.  Program Name
    2.  Batch Volume (thousandths of gal/l)
    3.  Grain Weight (thousandths of lb/kg)
    4.  Mash Ratio (hundreths of lbs/kg per qt/l, 0 = No Sparge)
    5.  Dough In Temperature
    6.  Dough in Minutes
    7.  Acid Temperature
    8.  Acid Minutes
    9.  Protein Temperature
    10.  Protein Minutes
    11.  Sacch Temperature
    12.  Sacch Minutes
    13.  Sacch2 Temperature
    14.  Sacch2 Minutes
    15.  Mashout Temperature
    16.  Mashout Minutes
    17.  Sparge Temp
    18.  HLT Setpoint
    19.  Boil Mins
    20.  Pitch Temp
    21.  Boil Additions (Bit Mask)
    22.  Mash Liquor Heat Source (0=HLT, 1=Mash)

### Get Program Settings (@, 64, 0x40)

1.  Description: Returns the specified saved program's settings
2.  Command Code: '@' (ASCII), 64 (Decimal), 0x40 (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters: N/A
5.  Response Code: '@' (ASCII), 64 (Decimal), 0x40 (Hex)
6.  Response Parameters:
    1.  Program Name
    2.  Batch Volume (thousandths of gal/l)
    3.  Grain Weight (thousandths of lb/kg)
    4.  Mash Ratio (hundreths of lbs/kg per qt/l, 0 = No Sparge)
    5.  Dough In Temperature
    6.  Dough in Minutes
    7.  Acid Temperature
    8.  Acid Minutes
    9.  Protein Temperature
    10.  Protein Minutes
    11.  Sacch Temperature
    12.  Sacch Minutes
    13.  Sacch2 Temperature
    14.  Sacch2 Minutes
    15.  Mashout Temperature
    16.  Mashout Minutes
    17.  Sparge Temp
    18.  HLT Setpoint
    19.  Boil Mins
    20.  Pitch Temp
    21.  Boil Additions (Bit Mask)
    22.  Mash Liquor Heat Source (0=HLT, 1=Mash)

### Get Boil Temperature (A, 65, 0x41)

1.  Description: Requests the system boil temperature
2.  Command Code: A (ASCII), 65 (Decimal), 0x41 (Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Response Code: A (ASCII), 65 (Decimal), 0x41 (Hex)
6.  Response Parameters:
    1.  Boil Temperature

### Get Volume Calibrations (B, 66, 0x42)

1.  Description: Requests the calibration values and volumes for a specific vessel.
2.  Command Code: B (ASCII), 66 (Decimal), 0x42 (Hex)
3.  Command Index: Vessel+Slot (0-9=HLT, 10-19=Mash, 20-29=Kettle)
4.  Command Parameters: N/A
5.  Response Code: B (ASCII), 66 (Decimal), 0x42 (Hex)
6.  Response Parameters:
    1.  Volume
    2.  Value

### Get Evaporation Rate (C, 67, 0x43)

1.  Description: Requests the system evaporate rate setting
2.  Command Code: C (ASCII), 67 (Decimal), 0x43 (Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Response Code: C (ASCII), 67 (Decimal), 0x43 (Hex)
6.  Response Parameters:
    1.  Rate (Percentage per hour 0-100)

### Get Output Settings (D, 68, 0x44)

1.  Description: Requests the output settings for a specified heat output
2.  Command Code: D (ASCII), 68 (Decimal), 0x44 (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle, 3=Steam)
4.  Command Parameters: N/A
5.  Response Code: D (ASCII), 68 (Decimal), 0x44 (Hex)
6.  Response Parameters:
    1.  Mode (0=On/Off, 1=PID)
    2.  PID Cycle (In seconds)
    3.  PID P Gain (0-255)
    4.  PID I Gain (0-255)
    5.  PID D Gain (0-255)
    6.  Hysteresis (In tenths of degrees) if Vessel = 0-2 or Steam Zero if Vessel = 3
    7.  Steam Target Pressure (Vessel = 3 Only; Otherwise blank)
    8.  Steam Pressure Sensor Sensitivity (Vessel = 3 Only; Otherwise blank)

### Get Temperature Sensor Address (F, 70, 0x46)

1.  Description: Requests the address of the specified temperature sensor
2.  Command Code: F (ASCII), 70 (Decimal), 0x46 (Hex)
3.  Command Index: Sensor (0=HLT, 1=Mash, 2=Kettle, 3=H2O In, 4=H2O Out, 5=Beer Out, 6=AUX1, 7=AUX2, 8=AUX3)
4.  Command Parameters: N/A
5.  Response Code: F (ASCII), 70 (Decimal), 0x46 (Hex)
6.  Response Parameters:
    1.  Byte 0 (0-255)
    2.  Byte 1 (0-255)
    3.  Byte 2 (0-255)
    4.  Byte 3 (0-255)
    5.  Byte 4 (0-255)
    6.  Byte 5 (0-255)
    7.  Byte 6 (0-255)
    8.  Byte 7 (0-255)

### Get Version Information (G, 71, 0x47)

1.  Description: BrewTroller Firmware Version and Build Information. Called during setup() initialization
2.  Command Code: G (ASCII), 71 (Decimal), 0x47 (Hex)
3.  Command index: N/A
4.  Command Parameters: N/A
5.  Response Code: G (ASCII), 71 (Decimal), 0x47 (Hex)
6.  Response Parameters:
    1.  Version String
    2.  Build Number

### Get Volume Settings (H, 72, 0x48)

1.  Description: Requests the volume settings for specified vessel
2.  Command Code: H(ASCII), 72 (Decimal), 0x48 (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle)
4.  Command Parameters: N/A
5.  Response Code: H(ASCII), 72 (Decimal), 0x48 (Hex)
6.  Response Parameters:
    1.  Capacity (In thousandths of Gallons/Litres)
    2.  Dead Space (In thousandths of Gallons/Litres)

### Initialize EEPROM (I, 73, 0x49)

1.  Description: Initialiazes BrewTroller EEPROM (Settings) to “factory defaults”
2.  Command Code: I (ASCII), 73 (Decimal), 0x49 (Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Response Code: I (ASCII), 73 (Decimal), 0x49 (Hex)
6.  Response Parameters: N/A

### Scan for Temperature Sensor (J, 74, 0x4A)

1.  Description: Returns the first unassigned temperature sensor address found
2.  Command Code: J (ASCII), 74 (Decimal), 0x4A (Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Response Code: J (ASCII), 74 (Decimal), 0x4A (Hex)
6.  Response Parameters:
    1.  Byte 1 (0-255)
    2.  Byte 2 (0-255)
    3.  Byte 3 (0-255)
    4.  Byte 4 (0-255)
    5.  Byte 5 (0-255)
    6.  Byte 6 (0-255)
    7.  Byte 7 (0-255)
    8.  Byte 8 (0-255)

### Set Boil Temperature (K, 75, 0x4B)

1.  Description: Sets the system boil temperature
2.  Command Code: K (ASCII), 75 (Decimal), 0x4B (Hex)
3.  Command Index: N/A
4.  Command Parameters
    1.  Temperature (In Degrees)
5.  Response Code: A (ASCII), 65 (Decimal), 41 (Hex)
6.  Response Parameters:
    1.  Temperature (In Degrees)

### Set Volume Calibration (L, 76, 0x4C)

1.  Description: Sets the calibration values and volumes for a specific vessel
2.  Command Code: L (ASCII), 76 (Decimal), 0x4C (Hex)
3.  Command Index: Vessel+Slot (0-9=HLT, 10-19=Mash, 20-29=Kettle)
4.  Command Parameters:
    1.  Calibration Volume
    2.  Calibration Value
5.  Response Code: B (ASCII), 66 (Decimal), 0x42 (Hex)
6.  Response Parameters:
    1.  Calibration Volume
    2.  Calibration Value

### Set Evaporation Rate (M, 77, 0x4D)

1.  Description: Sets the system evaporation rate setting
2.  Command Code: M (ASCII), 77 (Decimal), 0x4D (Hex)
3.  Command Index: N/A
4.  Command Parameters:
    1.  Rate (Percentage per hour 0-100)
5.  Response Code: C (ASCII), 67 (Decimal), 0x43 (Hex)
6.  Response Parameters:
    1.  Rate (Percentage per hour 0-100)
7.  Example:

### Set Output Settings (N, 78, 0x4E)

1.  Description: Sets the output settings for a specified heat output
2.  Command Code: N (ASCII), 78 (Decimal), 0x4E (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle, 3=Steam)
4.  Command Parameters:
    1.  Mode (0=On/Off, 1=PID)
    2.  PID Cycle (In seconds)
    3.  PID P Gain (0-255)
    4.  PID I Gain (0-255)
    5.  PID D Gain (0-255)
    6.  Hysteresis (In tenths of degrees) if Vessel = 0-2 or Steam Zero if Vessel = 3
    7.  Steam Target Pressure (Vessel = 3 Only; Otherwise blank)
    8.  Steam Pressure Sensor Sensitivity (Vessel = 3 Only; Otherwise blank)
5.  Response Code: D (ASCII), 68 (Decimal), 0x44 (Hex)
6.  Response Parameters:
    1.  Mode (0=On/Off, 1=PID)
    2.  PID Cycle (In seconds)
    3.  PID P Gain (0-255)
    4.  PID I Gain (0-255)
    5.  PID D Gain (0-255)
    6.  Hysteresis (In tenths of degrees) if Vessel = 0-2 or Steam Zero if Vessel = 3
    7.  Steam Target Pressure (Vessel = 3 Only; Otherwise blank)
    8.  Steam Pressure Sensor Sensitivity (Vessel = 3 Only; Otherwise blank)
7.  Example:

### Set Temperature Sensor (P, 80, 0x50)

1.  Description: Sets the address of the specified Temperature Sensor
2.  Command Code: P (ASCII), 80 (Decimal), 0x50 (Hex)
3.  Command Index: Sensor (0=HLT, 1=Mash, 2=Kettle, 3=H2O In, 4=H2O Out, 5=Beer Out, 6=AUX1, 7=AUX2, 8=AUX3)
4.  Command Parameters:
    1.  Byte 0 (0-255)
    2.  Byte 1 (0-255)
    3.  Byte 2 (0-255)
    4.  Byte 3 (0-255)
    5.  Byte 4 (0-255)
    6.  Byte 5 (0-255)
    7.  Byte 6 (0-255)
    8.  Byte 7 (0-255)
5.  Response Code: F (ASCII), 70 (Decimal), 0x46 (Hex)
6.  Response Parameters:
    1.  Byte 0 (0-255)
    2.  Byte 1 (0-255)
    3.  Byte 2 (0-255)
    4.  Byte 3 (0-255)
    5.  Byte 4 (0-255)
    6.  Byte 5 (0-255)
    7.  Byte 6 (0-255)
    8.  Byte 7 (0-255)

### Set Valve Profile Configuration (Q, 81, 0x51)

1.  Description: Sets the specified valve profile configuration
2.  Command Code: Q (ASCII), 81 (Decimal), 0x51 (Hex)
3.  Command Index: Profile
    1.  0: Fill HLT
    2.  1: Fill Mash
    3.  2: Add Grain
    4.  3: Mash Heat
    5.  4: Mash Idle
    6.  5: Sparge In
    7.  6: Sparge Out
    8.  7: Boil Additions
    9.  8: Kettle Lid
    10.  9: Chiller H2O
    11.  10: Chiller Beer
    12.  11: Boil Recirc
    13.  12: Drain
    14.  13: HLT Heat
    15.  14: HLT Idle
    16.  15: Kettle Heat
    17.  16: Kettle Idle
    18.  17: User 1
    19.  18: User 2
    20.  19: User 3
4.  Command Parameters:
    1.  Valve Bits (Decimal value representing a 32-bit mask representing the On/Off values of each valve in the profile)
5.  Response Code: d (ASCII), 100 (Decimal), 64 (Hex)
6.  Response Parameters:
    1.  Valve Bits (Decimal value representing a 32-bit mask representing the On/Off values of each valve in the profile)

### Set Volume Settings (R, 82, 0x52)

1.  Description: Sets the volume settings for specified vessel
2.  Command Code: R (ASCII), 82 (Decimal), 0x52 (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle)
4.  Command Parameters:
    1.  Capacity (In thousandths of Gallons/Litres)
    2.  Dead Space (In thousandths of Gallons/Litres)
5.  Response Code: H (ASCII), 72 (Decimal), 0x48 (Hex)
6.  Response Parameters:
    1.  Capacity (In thousandths of Gallons/Litres)
    2.  Dead Space (In thousandths of Gallons/Litres)

### Advance Step (S, 83, 0x53) Command

1.  Description: Advances the specified step to the next brew step
2.  Command Code: S (ASCII), 83 (Decimal), 0x53 (Hex)
3.  Command Index: Brew Step
    1.  0: Fill
    2.  1: Delay
    3.  2: Preheat
    4.  3: Grain In
    5.  4: Refill
    6.  5: Dough In
    7.  6: Acid
    8.  7: Protein
    9.  8: Sacch
    10.  9: Sacch2
    11.  10: Mash Out
    12.  11: Mash Hold
    13.  12: Sparge
    14.  13: Boil
    15.  14: Chill
4.  Command Parameters: N/A
5.  Response Code: n (ASCII), 111 (Decimal), 0x6E (Hex)
6.  Response Parameters:
    1.  Fill (Active Program ID or 255 = Not Active)
    2.  Delay (Active Program ID or 255 = Not Active)
    3.  Preheat (Active Program ID or 255 = Not Active)
    4.  Grain In (Active Program ID or 255 = Not Active)
    5.  Refill (Active Program ID or 255 = Not Active)
    6.  Dough In (Active Program ID or 255 = Not Active)
    7.  Acid (Active Program ID or 255 = Not Active)
    8.  Protein (Active Program ID or 255 = Not Active)
    9.  Sacch (Active Program ID or 255 = Not Active)
    10.  Sacch2 (Active Program ID or 255 = Not Active)
    11.  Mash Out (Active Program ID or 255 = Not Active)
    12.  Mash Hold (Active Program ID or 255 = Not Active)
    13.  Sparge (Active Program ID or 255 = Not Active)
    14.  Boil (Active Program ID or 255 = Not Active)
    15.  Chill (Active Program ID or 255 = Not Active)

### Exit Step (T, 84, 0x54)

1.  Description: Exits the specified step without advancing to the next step
2.  Command Code: T (ASCII), 84 (Decimal), 0x54 (Hex)
3.  Command Index: Brew Step
    *   0: Fill
    *   1: Delay
    *   2: Preheat
    *   3: Grain In
    *   4: Refill
    *   5: Dough In
    *   6: Acid
    *   7: Protein
    *   8: Sacch
    *   9: Sacch2
    *   10: Mash Out
    *   11: Mash Hold
    *   12: Sparge
    *   13: Boil
    *   14: Chill
4.  Response Code: n (ASCII), 111 (Decimal), 0x6E (Hex)
5.  Response Parameters:
    1.  Fill (Active Program ID or 255 = Not Active)
    2.  Delay (Active Program ID or 255 = Not Active)
    3.  Preheat (Active Program ID or 255 = Not Active)
    4.  Grain In (Active Program ID or 255 = Not Active)
    5.  Refill (Active Program ID or 255 = Not Active)
    6.  Dough In (Active Program ID or 255 = Not Active)
    7.  Acid (Active Program ID or 255 = Not Active)
    8.  Protein (Active Program ID or 255 = Not Active)
    9.  Sacch (Active Program ID or 255 = Not Active)
    10.  Sacch2 (Active Program ID or 255 = Not Active)
    11.  Mash Out (Active Program ID or 255 = Not Active)
    12.  Mash Hold (Active Program ID or 255 = Not Active)
    13.  Sparge (Active Program ID or 255 = Not Active)
    14.  Boil (Active Program ID or 255 = Not Active)
    15.  Chill (Active Program ID or 255 = Not Active)

### Start Step (U, 85, 0x55)

1.  Description: Starts the specified step with the specified program number
2.  Command Code: U (ASCII), 85 (Decimal), 0x55 (Hex)
3.  Command Index: Brew Step
    *   0: Fill
    *   1: Delay
    *   2: Preheat
    *   3: Grain In
    *   4: Refill
    *   5: Dough In
    *   6: Acid
    *   7: Protein
    *   8: Sacch
    *   9: Sacch2
    *   10: Mash Out
    *   11: Mash Hold
    *   12: Sparge
    *   13: Boil
    *   14: Chill
4.  Command Parameters:
    1.  Program ID (0-19)
5.  Response Code: n (ASCII), 111 (Decimal), 0x6E (Hex)
6.  Response Parameters:
    1.  Fill (Active Program ID or 255 = Not Active)
    2.  Delay (Active Program ID or 255 = Not Active)
    3.  Preheat (Active Program ID or 255 = Not Active)
    4.  Grain In (Active Program ID or 255 = Not Active)
    5.  Refill (Active Program ID or 255 = Not Active)
    6.  Dough In (Active Program ID or 255 = Not Active)
    7.  Acid (Active Program ID or 255 = Not Active)
    8.  Protein (Active Program ID or 255 = Not Active)
    9.  Sacch (Active Program ID or 255 = Not Active)
    10.  Sacch2 (Active Program ID or 255 = Not Active)
    11.  Mash Out (Active Program ID or 255 = Not Active)
    12.  Mash Hold (Active Program ID or 255 = Not Active)
    13.  Sparge (Active Program ID or 255 = Not Active)
    14.  Boil (Active Program ID or 255 = Not Active)
    15.  Chill (Active Program ID or 255 = Not Active)

### Set Alarm Status (V, 86, 0x56)

1.  Description: Sets the alarm status
2.  Command Code: V (ASCII), 86(Decimal), 0x56(Hex)
3.  Command Index: N/A
4.  Command Parameters:
    1.  Status (0=Off, 1=On)
5.  Response Code: e (ASCII), 101(Decimal), 0x65(Hex)
6.  Response Parameters
    1.  Status (0=Off, 1=On)

### Set Auto-Valve Status (W, 87, 0x57)

1.  Description: Sets the current state of auto valve control
2.  Command Code: W (ASCII), 87 (Decimal), 0x57 (Hex)
3.  Command Index: N/A
4.  Command Parameters:
    1.  Autovalve Bitmask (Decimal value representing active autovalve logic)
        1.  1: Auto Fill
        2.  2: Auto Mash
        3.  4: Auto Sparge [Not Implemented]
        4.  8: Auto Chill
5.  Response Code: u (ASCII), 117 (Decimal), 0x75 (Hex)
6.  Response Parameters:
    1.  Autovalve Bitmask (Decimal value representing active autovalve logic)
        1.  1: Auto Fill
        2.  2: Auto Mash
        3.  4: Auto Sparge In
        4.  8: Auto Sparge Out
        5.  16: Auto Fly Sparge
        6.  32: Auto Chill

### Set Setpoint (X, 88, 0x58)

1.  Description: Sets the setpoint of the specified Vessel (BrewTroller) or Zone (FermTroller)
2.  Command Code: X (ASCII), 88 (Decimal), 0x58 (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle) / Zone (0 = Zone 1, 1 = Zone 2, …)
4.  Command Parameters:
    1.  Setpoint (C/F)
5.  Response Code: t
6.  Response Parameters:
    1.  Setpoint (C/F)

### Set Timer Status (Y, 89, 0x59)

1.  Description: Sets the timer status
2.  Command Code: Y (ASCII), 89 (Decimal), 0x59 (Hex)
3.  Command Index: Timer ID (0=Mash, 1=Boil)
4.  Command Parameters:
    1.  Status (0=Paused, 1=Active)
5.  Response Code: o
6.  Response Parameters:
    1.  Timer Value
    2.  Timer Status (0=Paused, 1=Active)

### Set Timer Value (Z, 90, 0x5A)

1.  Description: Sets the timer value in milliseconds
2.  Command Code: Z (ASCII), 90 (Decimal), 0x5A (Hex)
3.  Command Index: Timer ID (0=Mash, 1=Boil)
4.  Command Parameters
    1.  Timer Value (ms)
5.  Response Code: o
6.  Response Paramters:
    1.  Timer Value (ms)
    2.  Timer Status (0 = Paused, 1 = Active)

### Get Status (a, 97, 0x61)

1.  Description: Enables/disables the specified valve profiles
2.  Command Code: a (ASCII), 97 (Decimal), 0x61 (Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Response Code: a (ASCII), 97 (Decimal), 0x61 (Hex)
6.  Response Parameters:
    1.  Alarm Status
    2.  AutoValve Status Bitmask
        1.  1: Auto Fill
        2.  2: Auto Mash
        3.  4: Auto Sparge [Not Implemented]
        4.  8: Auto Chill
    3.  Active Valve Profiles Bitmask
        1.  1: Fill HLT
        2.  2: Fill Mash
        3.  4: Add Grain
        4.  8: Mash Heat
        5.  16: Mash Idle
        6.  32: Sparge In
        7.  64: Sparge Out
        8.  128: Boil Additions
        9.  256: Kettle Lid
        10.  512: Chiller H2O
        11.  1024: Chiller Beer
        12.  2048: Boil Recirc
        13.  4096: Drain
        14.  8192: HLT Heat
        15.  16384: HLT Idle
        16.  32768: Kettle Heat
        17.  65536: Kettle Idle
        18.  131072: User 1
        19.  262144: User 2
        20.  524288: User 3
    4.  Active Valve Outputs Bitmask
    5.  HLT Setpoint
    6.  HLT Temperature
    7.  HLT Heat Power
    8.  HLT Target Volume
    9.  HLT Volume
    10.  HLT Flowrate
    11.  Mash Setpoint
    12.  Mash Temperature
    13.  Mash Heat Power
    14.  Mash Target Volume
    15.  Mash Volume
    16.  Mash Flowrate
    17.  Kettle Setpoint
    18.  Kettle Temperature
    19.  Kettle Heat Power
    20.  Kettle Target Volume
    21.  Kettle Volume
    22.  Kettle Flowrate
    23.  Mash Timer Value
    24.  Mash Timer Status
    25.  Boil Timer Value
    26.  Boil Timer Status
    27.  Boil Control State
        1.  Kettle Off (0)
        2.  Auto Boil (1)
        3.  Manual Boil (2)
    28.  Mash Zone Active Program Step
        1.  Fill (0)
        2.  Delay (1)
        3.  Preheat (2)
        4.  Grain In (3)
        5.  Refill (4)
        6.  Dough In (5)
        7.  Acid (6)
        8.  Protein (7)
        9.  Sacch (8)
        10.  Sacch2 (9)
        11.  Mash Out (10)
        12.  Mash Hold (11)
        13.  Sparge (12)
        14.  Idle (255)
    29.  Mash Zone Active Program Recipe (0-19, 255 = Idle)
    30.  Boil Zone Active Program Step
        1.  Boil (13)
        2.  Chill (14)
        3.  Idle (255)
    31.  Boil Zone Active Program Recipe (0-19, 255 = Idle)

### Set Valve Profile Status (b, 98, 0x62)

1.  Description: Enables/disables the specified valve profiles
2.  Command Code: b (ASCII), 98 (Decimal), 0x62 (Hex)
3.  Command Index: N/A
4.  Command Parameters
    1.  Profile Bitmask (Decimal value representing valve profiles to enable/disable)
        1.  1: Fill HLT
        2.  2: Fill Mash
        3.  4: Add Grain
        4.  8: Mash Heat
        5.  16: Mash Idle
        6.  32: Sparge In
        7.  64: Sparge Out
        8.  128: Boil Additions
        9.  256: Kettle Lid
        10.  512: Chiller H2O
        11.  1024: Chiller Beer
        12.  2048: Boil Recirc
        13.  4096: Drain
        14.  8192: HLT Heat
        15.  16384: HLT Idle
        16.  32768: Kettle Heat
        17.  65536: Kettle Idle
        18.  131072: User 1
        19.  262144: User 2
        20.  524288: User 3
    2.  Value (0=Off/1=On)
5.  Response Code: w (ASCII), 119 (Decimal), 0x77 (Hex)
6.  Response Parameters:
    1.  Profile Bitmask (Decimal value representing active valve profiles)
        1.  1: Fill HLT
        2.  2: Fill Mash
        3.  4: Add Grain
        4.  8: Mash Heat
        5.  16: Mash Idle
        6.  32: Sparge In
        7.  64: Sparge Out
        8.  128: Boil Additions
        9.  256: Kettle Lid
        10.  512: Chiller H2O
        11.  1024: Chiller Beer
        12.  2048: Boil Recirc
        13.  4096: Drain
        14.  8192: HLT Heat
        15.  16384: HLT Idle
        16.  32768: Kettle Heat
        17.  65536: Kettle Idle
        18.  131072: User 1
        19.  262144: User 2
        20.  524288: User 3

### Reset (c, 99, 0x63)

1.  Description: Performs the specified level of reset
2.  Command Code: c (ASCII), 99 (Decimal), 0x63 (Hex)
3.  Command Index: Reset Level
    1.  0: Reset Programs, Setpoints and Outputs
    2.  1: Perform a Soft Reboot
4.  Command Parameters: N/A
5.  Response Code: c (ASCII), 99 (Decimal), 0x63 (Hex)
    1.  Note: Command code c1 (Soft Reboot) will not return a response
6.  Response Parameters: N/A

### Get Valve Profile Configuration (d, 100, 0x64)

1.  Description: Requests the specified valve profile
2.  Command Code: d (ASCII), 100 (Decimal), 0x64 (Hex)
3.  Index: Profile
    1.  0: Fill HLT
    2.  1: Fill Mash
    3.  2: Add Grain
    4.  3: Mash Heat
    5.  4: Mash Idle
    6.  5: Sparge In
    7.  6: Sparge Out
    8.  7: Boil Additions
    9.  8: Kettle Lid
    10.  9: Chiller H2O
    11.  10: Chiller Beer
    12.  11: Boil Recirc
    13.  12: Drain
    14.  13: HLT Heat
    15.  14: HLT Idle
    16.  15: Kettle Heat
    17.  16: Kettle Idle
    18.  17: User 1
    19.  18: User 2
    20.  19: User 3

1.  Command Parameters: N/A
2.  Response Code: d (ASCII), 100 (Decimal), 0x64 (Hex)
3.  Response Parameters:
    1.  Bitmask (4-Byte) representing Valves 1 - 32

### Get Alarm Status (e, 101, 0x65)

1.  Description: Indicates the current alarm state
2.  Command Code: e (ASCII), 101 (Decimal), 0x65 (Hex)
3.  Command Index: N/A
4.  Command Parameters:
    1.  Value (0=Off, 1=On)
5.  Response Code: e (ASCII), 101 (Decimal), 0x65 (Hex)
6.  Response Parameters:
    1.  Value (0=Off, 1=On)

### Get Active Programs (n, 110, 0x6E)

1.  Description: Indicates the active program for each brewstep or 255 if step is not active
2.  Command Code: n (ASCII), 110 (Decimal), 0x6E (Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Respose Code: n (ASCII), 110 (Decimal), 0x6E (Hex)
6.  Response Parameters:
    1.  Program 1 Active Step
        1.  Fill (0)
        2.  Delay (1)
        3.  Preheat (2)
        4.  Grain In (3)
        5.  Refill (4)
        6.  Dough In (5)
        7.  Acid (6)
        8.  Protein (7)
        9.  Sacch (8)
        10.  Sacch2 (9)
        11.  Mash Out (10)
        12.  Mash Hold (11)
        13.  Sparge (12)
        14.  Boil (13)
        15.  Chill (14)
        16.  Idle (255)
    2.  Program 1 Active Program (0-19)
    3.  Program 2 Active Step (see Step 1 detail above)
    4.  Program 2 Active Program (0-19)

### Get Timer Status (o, 111, 0x6F)

1.  Description: Indicates the remaining timer value in milliseconds
2.  Command Code: o (ASCII), 111 (Decimal), 0x6F (Hex)
3.  Command Index: Timer ID (0=Mash, 1=Boil)
4.  Command parameters: N/A
5.  Response Code: o (ASCII), 111 (Decimal), 0x6F (Hex)
6.  Response Parameters:
    1.  Timer Value (Time remaining in ms)
    2.  Timer Status (0=Stopped, 1=Running)

### Get Volume (p, 112, 0x70)

1.  Description: Current volume of the specified vessel
2.  Command Code: p (ASCII), 112 (Decimal) , 0x70 (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle)
4.  Command Parameters: N/A
    1.  Value (Gallons/Litre)
    2.  Flow rate (Gallons or litres per minute)
5.  Response Code: p (ASCII), 112 (Decimal) , 0x70 (Hex)
6.  Response Paramaters:
    1.  Value (Gallons/Litre)
    2.  Flow rate (Gallons or litres per minute)

### Get Temperature (q, 113, 0x71)

1.  Description: Current temperature of specified temperature sensor
2.  Command Code: q (ASCII), 113 (Decimal), 0x71 (Hex)
3.  Command Index: Sensor (0=HLT, 1=Mash, 2=Kettle, 3=H2O In, 4=H2O Out, 5=Beer Out, 6=AUX1, 7=AUX2, 8=AUX3)
4.  Command Parameters: N/A
5.  Response Code: q (ASCII), 113 (Decimal), 0x71 (Hex)
6.  Response Parameters:
    1.  Value

### Get Heat Output Status (s, 115, 0x73)

1.  Description: Indicates the current state of heat outputs
2.  Command Code: s (ASCII), 115 (Decimal), 0x73 (Hex)
3.  Command Index: Output Number
    1.  0: HLT
    2.  1: Mash
    3.  2: Kettle
    4.  3: Steam
4.  Command Parameters: N/A
5.  Response Code: s (ASCII), 115 (Decimal), 0x73 (Hex)
6.  Response Parameters:
    1.  Output Percentage (0=Off, 1-99=Variable, 100=On

### Get Setpoint (t, 116, 0x74)

1.  Description: Indicates the current set point for a vessel
2.  Command Code: t (ASCII), 116 (Decimal), 0x74 (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle)
4.  Response Code: t (ASCII), 116 (Decimal), 0x74 (Hex)
5.  Response Parameters:
    1.  Setpoint

### Get Auto-Valve Status (u, 117, 0x75)

1.  Description: Indicates the current state of auto valve control
2.  Command Code: u (ASCII), 117 (Decimal), 0x75(Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Response Code: u (ASCII), 117 (Decimal), 0x75 (Hex)
6.  Response Parameters:
    1.  Autovalve Bitmask (Decimal value representing active autovalve logic)
        1.  1: Auto Fill
        2.  2: Auto Mash
        3.  4: Auto Sparge In
        4.  8: Auto Sparge Out
        5.  16: Auto Fly Sparge
        6.  32: Auto Chill

### Get Valve Output Status (v, 118, 0x76)

1.  Description: Current status of each valve output
2.  Command Code: v (ASCII), 118 (Decimal), 0x76 (Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Response Code: v (ASCII), 118 (Decimal), 0x76 (Hex)
6.  Response Parameters:
    1.  Value (Bit mask representing valves 1-32)

### Get Valve Profile Status (w, 119, 0x77)

1.  Description: Indicates active valve profile(s)
2.  Command Code: w (ASCII), 119 (Decimal), 0x77 (Hex)
3.  Command Index: N/A
4.  Command parameters: N/A
5.  Response Code: w (ASCII), 119 (Decimal), 0x77 (Hex)
6.  Response Parameters:
    1.  Profile Bitmask (Decimal value representing active valve profiles)
        1.  1: Fill HLT
        2.  2: Fill Mash
        3.  4: Add Grain
        4.  8: Mash Heat
        5.  16: Mash Idle
        6.  32: Sparge In
        7.  64: Sparge Out
        8.  128: Boil Additions
        9.  256: Kettle Lid
        10.  512: Chiller H2O
        11.  1024: Chiller Beer
        12.  2048: Boil Recirc
        13.  4096: Drain
        14.  8192: HLT Heat
        15.  16384: HLT Idle
        16.  32768: Kettle Heat
        17.  65536: Kettle Idle
        18.  131072: User 1
        19.  262144: User 2
        20.  524288: User 3

Set Target Volume ('{', 123, 0x7B)

1.  Description: Sets vessel target volume
2.  Command Code: '{' (ASCII), 123 (Decimal), 0x7B (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle)
4.  Command parameters:
    1.  Target volume
5.  Response Code: '|' (ASCII), 124 (Decimal), 0x7C (Hex)
6.  Response Parameters:
    1.  Target volume

### Get Target Volume ('|', 124, 0x7C)

1.  Description: Returns vessel target volume
2.  Command Code: '|' (ASCII), 124 (Decimal), 0x7C (Hex)
3.  Command Index: Vessel (0=HLT, 1=Mash, 2=Kettle)
4.  Command parameters: N/A
5.  Response Code: '|' (ASCII), 124 (Decimal), 0x7C (Hex)
6.  Response Parameters:
    1.  Target volume

### Set Boil Control ('}', 125, 0x7D)

1.  Description: Sets boil control mode (Kettle disabled, Auto Boil, Manual)
2.  Command Code: '}' (ASCII), 125 (Decimal), 0x7D (Hex)
3.  Command Index: N/A
4.  Command parameters:
    1.  Boil Control Mode
        1.  Kettle Off (0)
        2.  Auto Boil (1)
        3.  Manual Boil (2)
5.  Response Code: '~' (ASCII), 126 (Decimal), 0x7E (Hex)
6.  Response Parameters:
    1.  Boil Control Mode
        1.  Kettle Off (0)
        2.  Auto Boil (1)
        3.  Manual Boil (2)

### Get Boil Control ('~', 126, 0x7E) 

1.  Description: Returns boil control mode (Kettle disabled, Auto Boil, Manual)
2.  Command Code: '~' (ASCII), 126 (Decimal), 0x7E (Hex)
3.  Command Index: N/A
4.  Command parameters: N/A
5.  Response Code: '~' (ASCII), 126 (Decimal), 0x7E (Hex)
6.  Response Parameters:
    1.  Boil Control Mode
        1.  Kettle Off (0)
        2.  Auto Boil (1)
        3.  Manual Boil (2)

## Depreciated Commands

The following commands are available in current releases but will be removed in a future release. These commands should not be used in new development.

### Get Program Settings (Partial) (E, 69, 0x45)  _Depreciated_

1.  Description: Returns the specified saved program's settings
2.  Command Code: E (ASCII), 69 (Decimal), 0x45 (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters: N/A
5.  Response Code: E (ASCII), 69 (Decimal), 0x45 (Hex)
6.  Response Parameters:
    1.  Sparge Temp
    2.  HLT Setpoint
    3.  Boil Mins
    4.  Pitch Temp
    5.  Boil Additions (Bit Mask)
    6.  Mash Liquor Heat Source (0=HLT, 1=Mash)

### Set Program Settings (Partial) (O, 79, 0x4F)  _Depreciated_

1.  Description: Sets the specified saved program's settings
2.  Command Code: O (ASCII), 79 (Decimal), 0x4E (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters:
    1.  Sparge Temp
    2.  HLT Setpoint
    3.  Boil Mins
    4.  Pitch Temp
    5.  Boil Additions (Bit Mask)
    6.  Mash Liquor Heat Source (0=HLT, 1=Mash)
5.  Response Code: E (ASCII), 69 (Decimal), 0x45 (Hex)
6.  Response Parameters:
    1.  Sparge Temp
    2.  HLT Setpoint
    3.  Boil Mins
    4.  Pitch Temp
    5.  Boil Additions (Bit Mask)
    6.  Mash Liquor Heat Source (0=HLT, 1=Mash)

### Get Program Name ('[', 91, 0x5B)  _Depreciated_

1.  Description: Returns the specified saved program's name
2.  Command Code: '[' (ASCII), 91 (Decimal), 0x5B (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters: N/A
5.  Response Code: '[' (ASCII), 91 (Decimal), 0x5B (Hex)
6.  Response Parameters:
    1.  Program name

### Set Program Name ('\', 92, 0x5C)  _Depreciated_

1.  Description: Sets the specified saved program's name
2.  Command Code: '\' (ASCII), 92 (Decimal), 0x5C (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters:
    1.  Program name
5.  Response Code: '[' (ASCII), 91 (Decimal), 0x5B (Hex)
6.  Response Parameters:
    1.  Program name

### Get Program Mash Temps (']', 93, 0x5D)  _Depreciated_

1.  Description: Returns the specified saved program's mash temperatures
2.  Command Code: ']' (ASCII), 93 (Decimal), 0x5D (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters: N/A
5.  Response Code: ']' (ASCII), 93 (Decimal), 0x5D (Hex)
6.  Response Parameters:
    1.  Dough In Temp
    2.  Acid Temp
    3.  Protein Temp
    4.  Sacch Temp
    5.  Sacch2 Temp
    6.  Mash Out Temp

### Set Program Mash Temps ('\', 94, 0x5E)  _Depreciated_

1.  Description: Sets the specified saved program's mash temperatures
2.  Command Code: '\' (ASCII), 92 (Decimal), 0x5C (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters:
    1.  Dough In Temp
    2.  Acid Temp
    3.  Protein Temp
    4.  Sacch Temp
    5.  Sacch2 Temp
    6.  Mash Out Temp
5.  Response Code: '>' (ASCII), 62 (Decimal), 0x3E (Hex)
6.  Response Parameters:
    1.  Dough In Temp
    2.  Acid Temp
    3.  Protein Temp
    4.  Sacch Temp
    5.  Sacch2 Temp
    6.  Mash Out Temp

### Get Program Mash Mins ('_', 95, 0x5F)  _Depreciated_

1.  Description: Returns the specified saved program's mash minutes
2.  Command Code: '_' (ASCII), 95 (Decimal), 0x5F (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters: N/A
5.  Response Code: '_' (ASCII), 95 (Decimal), 0x5F (Hex)
6.  Response Parameters:
    1.  Dough In Mins
    2.  Acid Mins
    3.  Protein Mins
    4.  Sacch Mins
    5.  Sacch2 Mins
    6.  Mash Out Mins

### Set Program Mash Mins ('`', 96, 0x60)  _Depreciated_

1.  Description: Sets the specified saved program's mash minutes
2.  Command Code: '`' (ASCII), 96 (Decimal), 0x60 (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters:
    1.  Dough In Mins
    2.  Acid Mins
    3.  Protein Mins
    4.  Sacch Mins
    5.  Sacch2 Mins
    6.  Mash Out Mins
5.  Response Code: '_' (ASCII), 95 (Decimal), 0x5F (Hex)
6.  Response Parameters:
    1.  Dough In Mins
    2.  Acid Mins
    3.  Protein Mins
    4.  Sacch Mins
    5.  Sacch2 Mins
    6.  Mash Out Mins

### Get Steam Pressure (r, 114, 0x72)  _Depreciated_

1.  Description: Current pressure of steam boiler
2.  Command Code: r (ASCII), 114 (Decimal), 0x72 (Hex)
3.  Command Index: N/A
4.  Command Parameters: N/A
5.  Response Code: r (ASCII), 114 (Decimal), 0x72 (Hex)
6.  Response Parameters:
    1.  Value (Decimal value representing psi/kPA)

### Get Program Volumes (x, 120, 0x78)  _Depreciated_

1.  Description: Returns the specified saved program's volumes
2.  Command Code: x (ASCII), 120 (Decimal), 0x78 (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters: N/A
5.  Response Code: x (ASCII), 120 (Decimal), 0x78 (Hex)
6.  Response Parameters:
    1.  Batch volume (thousandths of l/gal)
    2.  Grain weight (thousandths of kg/lb)
    3.  Mash ratio (hundreths of kg/lb per l/qt)

### Set Program Volumes (y, 121, 0x79)  _Depreciated_

1.  Description: Sets the specified saved program's volumes
2.  Command Code: y (ASCII), 121 (Decimal), 0x79 (Hex)
3.  Command Index: Program Number (0-19)
4.  Command Parameters:
    1.  Batch volume (thousandths of l/gal)
    2.  Grain weight (thousandths of kg/lb)
    3.  Mash ratio (hundreths of kg/lb per l/qt)
5.  Response Code: x (ASCII), 120 (Decimal), 0x78 (Hex)
6.  Response Parameters:
    1.  Batch volume (thousandths of l/gal)
    2.  Grain weight (thousandths of kg/lb)
    3.  Mash ratio (hundreths of kg/lb per l/qt)

## BTnic.cgi Web Service

The BTnic.cgi web service accepts <acronym title="Hyper Text Transfer Protocol">HTTP</acronym> GET requests from a client, sends the request to a BrewTroller using the BTnic protocol and returns the response as a simple JSON array.

### GET Request URI

<pre class="code">http://HOST_OR_IP/BTnic.cgi?CMD_CODE&PARAM1&Param2...&PARAMn</pre>

Where:

*   HOST_OR_IP: Host name or IP Address of the Ethernet interface
*   CMD_CODE: Command code and index (if applicable) of the command to execute. Command codes can be:
    *   ASCII character (ie. 'm' or 'G')
    *   Encoded Decimal Value (ie. '&#109;' or '&#71;')
    *   Encoded Hexidecimal Value (ie. '%6D' or '%47')
*   PARAM1, PARAM2, PARAMn: Command parameters

### JSON Response

<pre class="code">["RSP_CODE","PARAM1", "PARAM2"...,"PARAMn"]</pre>

Where:

*   RSP_CODE: Response Code
*   PARAM1, PARAM2, PARAMn: Response parametersd
