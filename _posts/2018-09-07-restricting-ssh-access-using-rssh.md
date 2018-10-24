---
layout: post
title: "Restricting SSH Access to Allow Only SCP on Ubuntu 18.04 Using rssh"
tags:
- Security
- Linux
- Ubuntu
- SSH
thumbnail_path: blog/thumbs/padlock.png
---

This post summarizes a simple method to secure, or lock-down, SSH access using the _Restricted SSH_ (`rssh`) package. The basic premise, you can create a user with a restricted shell and allow only specific protocols such as SCP or SFTP. There are many reasons to restrict SSH access, or restrict SSH access on specific accounts. I used `rssh` on an assessment server in one of the papers I teach. I wanted students to be able to submit an assessment using a simple bash script, that SCP transferred a single file to a server. But, I did not want students to be able to log into the machine remotely - as they would be able to see assessment submissions from other students. 

This post documents the method I used to configure Restricted SSH on an Ubuntu Linux 18.04 server system, but the general principles can be applied to other Debian-based operating systems.

## Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Installing RSSH

According to the [Ubuntu Packages documentation for rssh](https://packages.ubuntu.com/bionic/rssh), the `rssh` package is in the _universe_ repository. This specific repository should be enabled by default in Ubuntu server version 18.04, therefore, installation is easy using the following `apt` command:

{% highlight bash %}
sudo apt install rssh
{% endhighlight %}

## Creating a Restricted User Account

The only requirement for restricting a user using the Restricted SSH package is to specify `/usr/bin/rssh` as the users default shell. This would replace the usual default shell, which in most cases would be `/bin/bash`. You can either specify the Restricted SSH shell on user creation (if you wanted to create a new, dedicated user), or change the shell for an existing user.

The following command creates a new user named `student` that has the `rssh` shell specified as the default shell for the user. It also creates a home directory with the same naming convention as the username (`/home/student`). The home directory is not required, however, in my case I use the home directory as the SCP upload target.

{% highlight bash %}
sudo useradd -d /home/student -m -s /usr/bin/rssh student
{% endhighlight %}

You can also change the shell of an existing user account using the `chsh` command. The following command will change the shell for the `student` account to the `rssh` shell. 

{% highlight bash %}
sudo chsh -s /usr/bin/rssh student
{% endhighlight %}

In both scenarios, make sure the user account has a password specified. This can be done with the `passwd` command. For example:

{% highlight bash %}
sudo passwd student
{% endhighlight %}

## Configuring Restricted SSH

The Restricted SSH configuration file is stored at: `/etc/rssh.conf`. Using this configuration file, you can restrict what services a user can access. The following configurations are supported by Restricted SSH:

- `allowscp`: User is allowed to use perform SCP transfers
- `allowsftp`: User is allowed to use SFTP protocol and transfers
- `allowcvs`: User is allowed to use the CVS service
- `allowrdist`: User is allowed to use rdist transfers
- `allowrsync`: User is allowed to use rsync transfers

Once you have Restricted SSH installed, you can configure what services a user is allowed to use. Start by opening the configuration file (feel free to use `nano` if you are not comfortable with `vim`):

{% highlight bash %}
sudo vim /etc/rssh.conf
{% endhighlight %}

The code snippet below displays the start of the Restricted SSH configuration file. I have only made one change, enabling SCP by uncommenting the `allowscp` line. Each configuration is easy to enable, simply remove the comment character (`#`) at the start of the required line.

{% highlight bash %}
# This is the default rssh config file

# set the log facility.  "LOG_USER" and "user" are equivalent.
logfacility = LOG_USER

# Leave these all commented out to make the default action for rssh to lock
# users out completely...

allowscp
#allowsftp
#allowcvs
#allowrdist
#allowrsync
#allowsvnserve

# set the default umask
umask = 022
{% endhighlight %}

Make sure to save the file before exiting. After the changes, the `student` account should only be allowed to perform SCP transfers, and should not have any other access to the system. To test this, try to log into the remote server using an SSH client. In the following example, the IP address of the server is `10.25.1.10`.

{% highlight bash %}
ssh student@10.25.1.10
{% endhighlight %}

It might initially seem that you can login using SSH without error. The SSH session will start and present the user with a login prompt to enter the password. The server information is then displayed... However, an error message will be displayed, informing the user that the account is restricted by `rssh`. The following code snippet provides an example of the error message.

{% highlight bash %}
manager@server:~$ ssh student@10.25.1.10
student@10.25.1.10's password:
...
This account is restricted by rssh.
Allowed commands: scp

If you believe this is in error, please contact your system administrator.

Connection to 10.25.1.10 closed.
{% endhighlight %}

Final test. We should make sure the server allows the `student` account to perform an SCP transfer. The following command attempts to copy a file from the local system to the remote server (`10.25.1.10`). In this case the file being copied is named `kittens.png` and the file is being copied to the `/sharedData` directory on the remote server. It is essential to check that the target directory (`/sharedData` in this case) is accessible (writable) by the `student` account. Therefore, you need to set the ownership/permissions accordingly.

{% highlight bash %}
scp -P 22 kittens.png student@10.25.1.10:"/sharedData/"
{% endhighlight %}

If everything is working correctly, the file should be copied to the remote server without error. The code snippet below displays and example of a successful transfer.

{% highlight bash %}
user@server:~$ scp -P 22 kittens.png student@10.25.1.10:"/sharedData"
student@10.25.1.10's password:
kittens.png                          100%  107KB 107.0KB/s   00:00
{% endhighlight %}

In the case of an error, it might be useful to check the error code returned by the `scp` command. For example, you can use `echo $?` directly after running the `scp` command to see the error code to determine any problems with the transfer. Unfortunately, the `scp` man page does not document the error codes, but [MicroFocus provide a list of SSH and SCP return codes](https://support.microfocus.com/kb/doc.php?id=7021696).

## Conclusion

This post covered a quick summary of how to restrict SSH access on an Ubuntu Linux 18.04 server. The Restricted SSH package could have a number of uses depending on your specific scenario. If you have any feedback or questions please post a comment below. Thanks!
