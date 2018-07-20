---
layout: post
title: "Dragino LoRa Shield Node Configuration for AU915 (Updated)"
tags:
- IoT
- LoRaWAN
- AU915
thumbnail_path: blog/thumbs/lorawan.png
---

This post summarizes an updated tutorial on how to configure the Dragino LoRa Shield device for the Australian/New Zealand (AU915) frequency using my fork of the MCCI Catena version of the Arduino-LMIC library. 

## Background

I recently wrote a post about [Configuring a Dragino LoRa Shield for use on the AU915 frequency]( {% post_url 2018-07-06-dragino-lorashield-node-configuration-for-AU915 %}) so that the device can be used legally in New Zealand. Specifically, so that the device can operate on the AU915 regional configuration standard. The post linked to one of my GitHub repositories that used a modified version of the original [Arduino-LMIC library](https://github.com/matthijskooijman/arduino-lmic), written by Matthijs Kooijman. However, this library does not support the AU915 frequency out-of-the-box, and my solution was a fork of the original project, followed by quite a _hacky_ fix to define the AU915 frequency range and channel selection. It works, but is not exactly elegant!

It seems that there are so many forks of the same _Arduino-LMIC_ project that finding a reliable and suitable one (for specific devices and frequency requirements) is challenging. I am not complaining about the number of forks, I have a fork of the same library! Well two now... Nevertheless, I discovered a fork authored by the [MCCI Catena Corporation](https://github.com/mcci-catena) on their GitHub site. They had forked it from [The Things Network New York](https://github.com/things-nyc), who forked it from the original Arduino-LMIC library by Matthijs Kooijman. Anyway, the MCCI library appears to be actively developed and provided support for a large number of frequencies (regional configurations), including the well supported EU868 and US915 standards, as well as more recent standardization including AU915, AS923, and IN866. Excellent!

OK, the interesting part. How can the MCCI _Arduino-LMIC_ code be modified to run on a different regional configuration? It is relatively straight-forward and they do provide documentation on how to accomplish this task. However, it still took me a while to understand the most basic modifications required to get the code to run on the AU915 standard. The following sections outline the modifications required to use the AU915 configuration on a Dragino LoRa Shield. 

#### My Arduino-LMIC Library Fork

I have forked the original [MCCI Arduino-LMIC library](https://github.com/mcci-catena/arduino-lmic) and pushed updates to my forked version. My forked version has sketches provided for the Dragino LoRa Shield and Adafruit Feather m0 LoRa boards to operate on AU915 sub-band 2. My forked repository is available from:

- [thomaslaurenson/arduino-lmic](https://github.com/thomaslaurenson/arduino-lmic)

Initially, I didn't want to fork the MCCI Arduino-LMIC library. I feel that there are so many forks, each with changes for: 1) To work on a specific frequency, or 2) To work with a specific device. However, putting all the code in one place seemed like a good solution. The future of my fork will be only to include new sketch files for specific devices or authentication method, and small changes to make the installation process easier for the end-user. I will try to pull updates from MCCI when necessary to keep the fork updated as well. If there is a major problem or changes with the AU915 code, I would rather submit a pull request to the actual MCCI fork of the project - who are doing an excellent job at updating code and fixing community issues. Well done MCCI!

## Quickstart

- Download and install the Arduino IDE
- Add my fork of the MCCI Arduino-LMIC library to the _libraries_ directory of your Arduino IDE installation
    - Option 1: Clone the Arduino-LMIC library into the _libraries_ folder:

{% highlight bash %}
git clone https://github.com/thomaslaurenson/arduino-lmic.git
{% endhighlight %}

    - Option 2: Download the ZIP of the repository and use the  _Add .ZIP Library..._ functionality in the Arduino IDE
- Copy the provided sketch for the Dragino LoRa Shield from the `examples` folder into the Arduino Sketchbook folder
- Open the sketch for your device, change your COM port to the attached device, and _Upload_
- Check the _Serial Monitor_ on baud `115200` to check the device is functioning

If you require further information, please continue reading for a full explanation. 

## Arduino Environment Setup

Make sure you have version 1.6.6 (or above) of the Arduino IDE. The documentation for the MCCI Arduino-LMIC library state that this version is required because it requires C99 mode to be enabled by default.

Now we need to install the Arduino-LMIC library in our Arduino IDE environment. I think the easiest method is to download the GitHub repository as a ZIP file. This can be achieved using the following steps:

- Open a web browser and navigate to the [MCCI Arduino-LMIC library](https://github.com/mcci-catena/arduino-lmic) repository
- Click on the _Clone or Download_ button
- Select _Download ZIP_
- In the Arduino IDE, navigate to _Sketch_, _Include Library_, _Add .ZIP Library..._
- Find the ZIP file, and select _Open_

Make sure you have the correct board selected in the Arduino IDE. If you are using the Dragino LoRa Shield, the board needs to be configured as an Arduino Uno (because the it is a Arduino Uno shield). Make sure you select the correct board from the _Tools_, _Board_ menu and select _Arduino Uno_.

## MCCI Arduino-LMIC Library Configuration

The only modification required to the library itself to use a different frequency is changing the defined regional configuration that the library uses. This step is not required if you used my forked version of the MCCI Arduino-LMIC library, however, I have documented the process I used below to be thorough.

The regional configuration is set in the `lmic_project_config.h` file - found in the root folder of the library repository. The default value is `#define CFG_us915 1`. To modify this value, and replace it with another regional configuration we need to find and modify the `lmic_project_config.h` file. Depending on how you install the library in the Arduino IDE, how your Arduino IDE is configured, and what operating system you are using... this location may vary. The best method to find it is to determine the location using the Arduino IDE itself. The following steps will determine the location of the _Arduino-LMIC_ library and change the regional configuration:

- In the Arduino IDE, navigate to _File_, _Preferences_
- In the _Settings_ tab, find the value of _Sketchbook location_
- Open your file browser (e.g., Windows Explorer, Nautilus)
- Browse to the _Sketchbook location_
- There should be a folder called _libraries_
- You should find the library here, named: `arduino-lmic-master`
- Open the library folder, then open the `project_config` folder
- Open `lmic_project_config.h` in a text editor
- Comment out the `#define CFG_us915 1` line (use a `//`)
- Un-comment any other regional configuration line
- For example: un-comment the  `#define CFG_au921 1` line if you want to use the AU921 configuration
- The final result should look like the code snippet below:

{% highlight c %}
// project-specific definitions
//#define CFG_eu868 1
//#define CFG_us915 1
#define CFG_au921 1
//#define CFG_as923 1
//#define LMIC_COUNTRY_CODE LMIC_COUNTRY_CODE_JP	/* for as923-JP */
//#define CFG_in866 1
#define CFG_sx1276_radio 1
//#define LMIC_USE_INTERRUPTS
{% endhighlight %}

**NOTE:** It is unusual that the MCCI code refers to the AU915 regional configuration as _AU921_. I have never seen the Australian/New Zealand standard referred to using this naming convention. Nevertheless, after reviewing the code, this is the correct setting for configuring a node for use on the AU915 standard.

All done! Compared to other libraries this is a very easy modification for AU915/AU921 support. The only other configuration can be done in the actual Arduino sketch, where we can specify that we want to use the AU915/AU921 channel plan, and can select a specific sub-band as well. Now, we are ready to modify the default sketch provided in the project.

## Sample Dragino LoRa Shield Sketch

Similar to other _Arduino-LMIC_ forks, and the original version, the MCCI fork is shipped with a collection of example scripts. For someone new to LoRaWAN, it can be very difficult to modify these examples to work with a specific device or frequency. This section discusses a specific sketch file I have authored for the Dragino LoRa Shield to operate on the AU915 frequency. The example sketch is located at:

{% highlight bash %}
https://github.com/thomaslaurenson/arduino-lmic/blob/master/examples/ttn-abp-dragino-lorashield-au915/ttn-abp-dragino-lorashield-au915.ino
{% endhighlight %}

This sketch is based on the original sketch named `ttn-abp.ino` which is for use on The Things Network, using Activation by Personalisation, or ABP. The original example is available from the MCCI GitHub repository using this direct link to the [ttn-abp.ino](https://github.com/mcci-catena/arduino-lmic/blob/master/examples/ttn-abp/ttn-abp.ino) file. My sketch is configured for the following:

- Configured for AU915 
- Configured for sub-band 2
- Modified pin mapping for Dragino LoRa Shield
- Configured to authenticate using ABP

#### Adding the Example Sketch 

The example sketch I have authored for the Dragino LoRa Shield is provided in the `examples` directory. The sketch is named:

```
ttn-abp-dragino-lorashield-au915.ino
```

There are many ways to get this sketch imported into the Arduino IDE. You can simple open the file from where ever you download the repository. The best method is to add it to the Arduino IDE sketchbook. Make sure to put the sketch (`.ino` file) into a folder with the same name.

As it is, the sketch is ready to be compiled and uploaded. However, it is prudent to discuss the changes I made to the original sketch and why they were necessary.

#### Frequency Operation Definition

After defining the correct frequency configuration in the `lmic_project_config.h` file, it is set by default in the code. This means any sketch that uses the library will use this frequency. Remember, this was the setting that we configured in the `lmic_project_config.h` file. However, some configuration is still required. I added an else if statement to the existing statements in the `setup` function - which had existing configuration for the EU868 and US915 frequency plans. However, there was no additional code for the AU915 frequency. 

Specifically, the `setup()` function in the sketch performs a check to see what regional configuration is set in the _Arduino-LMIC_ code and performs additional configuration; for example, setting specific channels.  A snippet from the original example sketch is provided below for reference. You can see that only the EU868 and US915 frequencies are further configured here.

{% highlight c %}
void setup() {
    ...
    #if defined(CFG_eu868)
    LMIC_setupChannel(0, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(1, 868300000, DR_RANGE_MAP(DR_SF12, DR_SF7B), BAND_CENTI);      // g-band
    LMIC_setupChannel(2, 868500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(3, 867100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(4, 867300000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(5, 867500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(6, 867700000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(7, 867900000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(8, 868800000, DR_RANGE_MAP(DR_FSK,  DR_FSK),  BAND_MILLI);      // g2-band
    #elif defined(CFG_us915)
    LMIC_selectSubBand(1);
    #endif
    ...
{% endhighlight %}

Note how the US915 frequency is configured to only use sub-band 2. This is configured by the line: `LMIC_selectSubBand(1);`. This is a simple function provided by the library to only enable a specific set of channels, called a sub-band. 

So basically, we need to perform additional configuration of the frequency we have chosen. So far I have been discussing AU915 (or AU921 as MCCI called it). The following code addition, forces only the AU915 sub-band 2 to be specified. This means that only the channels in sub-band 2 will be enabled, and all other channels will be disabled.

{% highlight bash %}
// Modifications to operate on AU915 sub-band 2
#elif defined(CFG_au921)
Serial.println(F("Loading AU915 Configuration..."));
LMIC_selectSubBand(1); // Set to AU915 sub-band 2
{% endhighlight %}

The above code is relatively straight-forward - thanks to MCCI who wrote some nice definitions and methods for the frequency. It is important to note that this function requires the sub-band required to be _one less_ that the actual sub-band required.

NOTE: This modification has already been made in the `Dragino_MCCI_ABP_AU915.ino` sketch file, so no changes are required. 

#### Dragino LoRa Shield Pin Mapping

The pin mapping configuration that was supplied with the original sketch file was for the [Adafruit Feather M0 LoRa](https://www.adafruit.com/products/3178), which is the same configuration used for the [MCCI Catena 4450](https://store.mcci.com/collections/lorawan-iot-and-the-things-network/products/catena-4450-lorawan-iot-device) and [Catena 4460](https://store.mcci.com/collections/lorawan-iot-and-the-things-network/products/catena-4460-sensor-wing-w-bme680) products. However, we want to set the pin mappings for the Dragino LoRa Shield. We need to set the ping mapping to the following values. 

```
// Pin mapping for Dragino LoRa Shield
const lmic_pinmap lmic_pins = {
    .nss = 10,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 9,
    .dio = {2, 6, 7},
};
```

NOTE: This modification has already been made in the `Dragino_MCCI_ABP_AU915.ino` sketch file, so no changes are required. 

#### Setting the ABP Keys and Device Address

Make sure you remember to **change the ABP properties in the sketch file**. You need to replace the `FILLMEIN` placeholders with the network session key, application session key and device address. The block of code is displayed for reference below.

```
// LoRaWAN NwkSKey, network session key
static const PROGMEM u1_t NWKSKEY[16] = { FILLMEIN };

// LoRaWAN AppSKey, application session key
static const u1_t PROGMEM APPSKEY[16] = { FILLMEIN };

// LoRaWAN end-device address (DevAddr)
static const u4_t DEVADDR = FILLMEIN; // <-- Change this address for every node!
```

NOTE: This modification has *not been made* in the `Dragino_MCCI_ABP_AU915.ino` sketch file, so you must make these changes. 

#### Checking Functionality

Now that all the modifications have been made, we can compile and upload the sketch to the Arduino Uno. All you need to do is hit the _Upload_ button in the Arduino IDE to compile, then load the sketch onto the device. Make sure you have the correct COM port selected. The sketch configured that the Serial Monitor is set to `115200`. So open by navigating to _Tools_, _Serial Monitor_ and set the baud to `115200`. You should see output similar to the listing below:

```
Starting
Loading AU915 Configuration...
6853: EV_TXSTART
Packet queued
Sending packet on frequency:917400000
256551: EV_TXCOMPLETE (includes waiting for RX windows)
4006984: EV_TXSTART
Packet queued
Sending packet on frequency:916800000
4277002: EV_TXCOMPLETE (includes waiting for RX windows)
8027439: EV_TXSTART
Packet queued
Sending packet on frequency:917200000
8275202: EV_TXCOMPLETE (includes waiting for RX windows)
```

Notice how we are sending packets on the correct AU915 channels including: `917.4`, `917.2` and `916.8`. I confirmed the device was working correctly by checking our LoRaWAN gateway packet forwarder logs. I also checked that the data was getting to the server, but subscribing to the MQTT topic for the node I added, and could see `SGVsbG8sIHdvcmxkIQ==` in the data fields of the JSON, easily decoded from base64 to: `Hello, world!`, as specified in the sketch file code.

## Conclusion

This post covered another method for getting the Dragino LoRa Shield to work with the Australian and New Zealand LoRaWAN frequency using the MCCI Arudino-LMIC library. I think the library is a good solution, and implements the AU915 (what they call AU921) correctly. It is a much more elegant approach than my _hacky_ fix to the original Arduino-LMIC library, and recommend to anyone who wants to configure a LoRaWAN node on an Arduino-based device such as the Dragino LoRa Shield or similar Arduino-based device.

If you have any feedback or questions please post a comment below. Also, if anyone knows any other Arduino-LMIC or LoRaWAN libraries that they like for LoRaWAN nodes, please feel free to share them below in the comments. Thanks!
