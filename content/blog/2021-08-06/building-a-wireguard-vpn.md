---
title: Building a WireGuard VPN
description: Tutorial of how I built a WireGuard VPN to get a static IP, and for anonymous Internet access.
tags: ["WireGuard", "VPN", "Linux"]
thumbnail: wireguard.png
date: 2021-08-06
---

Recently I had to set up a VPN for doing a pentest engagement. The main reason was I needed a static IP - something that I have to pay for from my lackluster ISP. Instead, I set up a WireGuard VPN on a cloud VPS - based on advice from a SysAdmin friend. This blog post documents my process on setting up WireGuard on a fresh Digital Ocean Droplet (VPS) and covers some things I didn't find in some other tutorials.

The main difference between other tutorials I read - I wanted a VPN for internet access only! I didn't care about having a VPN to get a secure connection to an internal network - such as a cloud VPC. Read on if you want the same thing!

## Contents

```toc
```

## Initial VPS Configuration

I use Digital Ocean for VPS hosting. It is simple and cheap, and the pricing plans are no-nonsense. I picked a VPS, or what they call _Droplets_, with the following configuration:

- Image: Ubuntu 20.04 LTS x64
- Plan: Basic > Regular Intel with SSD, $5 / month
- Datacenter: Choose the best option based on my location and target location

It makes sense to do an initial server configuration, mainly some hardening and security best practices. Digital Ocean recommends it, and so do I! There is even an [Initial Server Setup with Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04) provided by Digital Ocean. My usual setup is generally the same, with a couple of quirks.

Start by logging in with `root` and providing the SSH key you used during Droplet creation.

```none
ssh -i ssh_key root@droplet_public_ip
```

Firsts things first... do an update.

```none
sudo apt update
sudo apt upgrade
```

The next thing I do is set up an `iptables` firewall. Digital Ocean recommends using `uwf`. It might be good?! I have never used it. Anyway, I usually do a simple configuration to start with:

```none
sudo iptables -A INPUT -m state --state INVALID -j DROP
sudo iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -P INPUT DROP
```

The next step is to create a new user, so we can avoid using the `root` account. The commands listed below are a good solution. You can change the username `thomas` to match your own configuration.

```none
sudo useradd -d /home/thomas -m -G sudo -s /bin/bash thomas
mkdir /home/thomas/.ssh
cp /root/.ssh/authorized_keys /home/thomas/.ssh/
chown -R thomas:thomas /home/thomas/.ssh
chmod 700 /home/thomas/.ssh
chmod 600 /home/thomas/.ssh/authorized_keys
```

As a summary:

- Create a user called `thomas`
- Make a directory called `.ssh` in the new users home folder
- Copy the SSH key used during Droplet creation
- Change the ownership and permissions of the newly created SSH directories/files

Quick caveat... you probably should have a different SSH key for the `root` and normal user account. That would be security best practices.

Finally, create a password for the new account:

```none
passwd thomas
```

And then exit the SSH session with the `root` user.

```none
exit
```

And log back in using the new user account.

```none
ssh -i ssh_key thomas@droplet_public_ip
```

## Install and Configure Wireguard on the Server

So far we have a new VPS, and did a basic setup. Now we will create the encryption keys and configuration file for the WireGuard VPN server. Start by installing the `wireguard` package:

```none
sudo apt install wireguard
```

For the next few steps, we will switch to the `root` account. This makes life easier, as the WireGuard configuration requires `root` access for almost all commands.

```none
sudo -i
```

### Generate the Encryption Keys for the Server

Start by creating some keys for the WireGuard server.

```none
cd /etc/wireguard/
umask 077; wg genkey | tee privatekey | wg pubkey > publickey
```

Verify the keys were created.

```none
cat privatekey
QNZqC+to/q+DQqJV3vDTRGRrO62GHkffRyuJFbtY91M=
cat publickey
6w9lu0iQu5pf2/vKnGzFJYoY3Ci2v3GNj3U6A3a2Gyg=
```

You will need these keys throughout the configuration so make sure you know where to find them. Make sure to keep these keys (especially the private key) safe and secure!

### Configure WireGuard on the Server

You should still be in the same directory from the last section: `/etc/wireguard`. In this directory, we want to create a configuration file to store all the settings for our VPN server. Start by creating the configuration file.

```none
touch /etc/wireguard/wg0.conf
```

And put in the following information. Note, you will need to change the `PrivateKey` value to the value of the `privatekey` that you created in the previous step. Also, note that there is a `PLACEHOLDER` value in the `PublicKey` for the "Peer" or client - we will replace this after configuring at least one client.

```
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = KFjLKgGlI43XzO74QccLvjkhxW4yFL/1eKro7p5ib2I=
PostUp = /etc/wireguard/up.sh
PostDown = /etc/wireguard/down.sh

[Peer]
PublicKey = 3tpwRGFdhPqDJdXufDSQCoDw8WoBHuaa7paoh/FeoF0=
AllowedIPs = 10.0.0.2/24
```

Here is a brief description of these properties we are setting:

- `Interface`: Section for configuration of the server
    - `Address`: The IP address of the server in the VPN network
    - `ListenPort`: The port number WireGuard will run on
    - `PrivateKey`: The servers private key that we just generated
    - `PostUp`: Commands that will be run when the VPN server starts
    - `PostDown`: Commands that will be run when the VPN server stops
- `Peer`: Section for configuration of clients
    - `PublicKey`: The public key of the client, which we have not yet created
    - `AllowedIPs`: The IP address of the client on the VPN network, which we will also configure on the client

### Configure Firewall Rules

In the `wg0.conf` file we had two scripts added, one for `PostUp` and one for `PostDown`. These scripts are run when the WireGuard VPN starts and stops. You can put anything in these scripts, but a common method is to include firewall rules to allow traffic in after starting the server, and remove those rules when the server is stopped.

Start by creating the `up.sh` script.

```none
touch /etc/wireguard/up.sh
```

And enter the following information.

```
#!/bin/bash

iptables -A INPUT -i eth0 -p udp --dport 51820 -j ACCEPT
iptables -A INPUT -i wg0 -j ACCEPT
iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth0 -j MASQUERADE
iptables -A FORWARD -i wg0 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o wg0 -j ACCEPT
```

As a quick summary, these rules will:

- Allow incoming traffic on port `51820`
- Allow incoming traffic on the `wg0` interface
- Allow routed traffic out through `eth0` gets the server's public IP (NAT)
- Allow traffic to be forwarded between `eth0` and `wg0` - in both directions

Make sure the script is executable.

```none
chmod +x /etc/wireguard/up.sh
```

Now we will do the same for the `PostDown` script, called `down.sh`.

```none
touch /etc/wireguard/down.sh
```

And enter the following information.

```
#!/bin/bash

iptables -D INPUT -i eth0 -p udp --dport 51820 -j ACCEPT
iptables -D INPUT -i wg0 -j ACCEPT
iptables -t nat -D POSTROUTING -s 10.0.0.0/24 -o eth0 -j MASQUERADE
iptables -D FORWARD -i wg0 -o eth0 -j ACCEPT
iptables -D FORWARD -i eth0 -o wg0 -j ACCEPT
```

These are the same as the `up.sh` rules, apart from that we are removing all of them. Make sure the script is executable.

```none
chmod +x /etc/wireguard/down.sh
```

### Enable IP Forwarding

The final step on the server is to allow IP forwarding.

```none
vim /etc/sysctl.conf
```

Find the line with `net.ipv4.ip_forward` in it. It is set to a default of false - which is the value `0`. We need to set this to true - the value of `1`, to allow IPv4 traffic to be forwarded.

```none
net.ipv4.ip_forward=1
```

Make sure the changes take effect by running the following command.

```none
sysctl -p
```

## Install and Configure Wireguard on the Client

In my scenario, I configured my VPN client to be a Kali Linux client - but WireGuard supports a variety of clients and some funky methods for easily adding new clients. Start by installing the WireGuard package on the client.

```
sudo apt install wireguard
```

Like the server configuration, we will switch to the `root` account. This makes life easier, as the WireGuard configuration requires `root` access for almost all commands.

```none
sudo -i
```

### Generate the Encryption Keys for the Client

Start by creating some keys for the WireGuard client.

```none
cd /etc/wireguard/
umask 077; wg genkey | tee privatekey | wg pubkey > publickey
```

Verify the keys were created.

```none
cat privatekey 
sg2+yeFqYualz5qop9XiIMxU1cA5BjOkJdCaf8zgNi8=
cat publickey 
eFbLx3CQV5uFh9SIHBuJn/LzPdcWMsUmPYaDk5eeXFo=
```

Again, you will need these keys throughout the configuration so make sure you know where to find them.

### Configure WireGuard on the Client

You should still be in the same directory from the last section: `/etc/wireguard`. In this directory, we want to create a configuration file to store all the settings for our VPN client. Start by creating the configuration file.

```none
touch /etc/wireguard/wg0.conf
```

And enter the following configuration in the file.

```none
[Interface]
Address = 10.0.0.2/24
PostUp = wg set %i private-key /etc/wireguard/privatekey
PostUp = ping -c1 10.0.0.1

[Peer]
PublicKey = 6w9lu0iQu5pf2/vKnGzFJYoY3Ci2v3GNj3U6A3a2Gyg=
Endpoint = PLACEHOLDER:51820
AllowedIPs = 0.0.0.0/0
```

Same as for the server configuration, here is a quick description of the client configuration.

- `Interface`: Configuration of the client
    - `Address`: The IP address for the client on the VPN. This should match the `AllowedIPs` value we set in the server.
    - `PostUp`: Commands run when the client connects to the VPN, in this case setting the private key using the `wg` command.
    `PostUp`: Also ping the VPN server when connecting to make sure we have established a connection. The server will not start if this command fails.
- `Peer`: Configuration of the server
    - `PublicKey`: The server's public key that we created at the start of this tutorial.
    - `EndPoint`: The **public IP** address of your server. You will need to replace `PLACEHOLDER` with the IP address of your server.
    - `AllowedIPs`: The IP addresses the server allows.

## Back to the Server!

So far we have installed and configured the VPN server and client. But we still need to do a couple of things to get them to talk and be friends.

### Add the Client Conf to the VPN Server

Start by opening the WireGuard configuration file on the server. FYI - if you have exited your `sudo` shell, you will need to prefix this command with `sudo`, or switch the user to `root`.

```none
vim /etc/wireguard/wg0.conf
```

We need to add the public key of the client into our VPN server configuration. This will allow us to connect with our VPN client. We couldn't do this before, as we didn't know the public key of the client - as we hadn't created it yet. Additionally, if you add more VPN clients, you will need to rinse and repeat this process.

In the `PublicKey` value, add the value of the client's public key. In this tutorial, the client's public key was `eFbLx3CQV5uFh9SIHBuJn/LzPdcWMsUmPYaDk5eeXFo=`.

Make sure to save and exit the file. Below is a final version of my server configuration file.

```none
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = QNZqC+to/q+DQqJV3vDTRGRrO62GHkffRyuJFbtY91M=
PostUp = /etc/wireguard/up.sh
PostDown = /etc/wireguard/down.sh

[Peer]
PublicKey = eFbLx3CQV5uFh9SIHBuJn/LzPdcWMsUmPYaDk5eeXFo=
AllowedIPs = 10.0.0.2/24
```

### Start the VPN Server

With everything configured, we can go ahead and start the VPN server, on the server. This will start the VPN service and allow clients to connect to the server. Luckily, this is simple with WireGuard.

```none
sudo wg-quick up wg0
```

To see the WireGuard-specific details of the interface, you can run the following command and get some basic information.

```none
wg
```

If you have finished using the VPN server, and want to stop it, issue the following command.

```none
wg-quick down wg0
```

I always start my VPN server manually, as I use it only for specific edge cases. But if you want to automatically start your VPN server on every system reboot, you can issue the following command.

```none
systemctl enable wg-quick@wg0
```

## Connect to the VPN server from the Client!

Now that the VPN server is up and running, and the client is already configured - we can simply connect to the server. This is the same command as used to start the VPN server.

```none
sudo wg-quick up wg0
```

You should get some information similar to below.

```none
└─# sudo wg-quick up wg0

[#] ip link add wg0 type wireguard
[#] wg setconf wg0 /dev/fd/63
[#] ip -4 address add 10.0.0.2/24 dev wg0
[#] ip link set mtu 1420 up dev wg0
[#] wg set wg0 fwmark 51820
[#] ip -4 route add 0.0.0.0/0 dev wg0 table 51820
[#] ip -4 rule add not fwmark 51820 table 51820
[#] ip -4 rule add table main suppress_prefixlength 0
[#] sysctl -q net.ipv4.conf.all.src_valid_mark=1
[#] nft -f /dev/fd/63
[#] wg set wg0 private-key /etc/wireguard/privatekey
[#] ping -c1 10.0.0.1
PING 10.0.0.1 (10.0.0.1) 56(84) bytes of data.
64 bytes from 10.0.0.1: icmp_seq=1 ttl=64 time=397 ms

--- 10.0.0.1 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 397.253/397.253/397.253/0.000 ms
```

To test the connection, try pinging an Internet-accessible site, for example, `google.com`. If not working, try pinging any publicly available IP address, for example, `8.8.8.8`.

Make sure you check your IP address to see if you have connected to the VPN and your traffic is being routered correctly. You can use any "What is my public IP" service on the Internet, or a variety of Linux commands, such as:

```none
dig +short myip.opendns.com @resolver1.opendns.com
```

If you don't have the `dig` command, you can use `host`.

```none
host myip.opendns.com resolver1.opendns.com
```

And to disconnect.

```none
sudo wg-quick down wg0
```

## Troubleshooting

A couple of commands that I found useful when trying to troubleshoot the WireGuard configuration are:

- `wg` on the server to check VPN status, clients, and configuration
- `ip a` on either machine to check IP addresses and the `wg0` network interface

The hardest thing I found when initially configuring WireGuard is that each tutorial has different goals - find the tutorial that matches your goal. Additionally, check you have the correct keys in the configuration files, and that most errors are due to configuration problems! If things are not working, make one change and test again! Then make another change and test again!

## Conclusion

I documented the steps I used to configure WireGuard, and made this tutorial so I can review this information the next time I need to configure a WireGuard VPN. But I hope it was on use to others. This is a very simple configuration, and I only use it on the throw-away VPS server. There are many additional configuration steps you should implement to make your VPN server more secure and robust! Happy hacking everyone!
