---
layout: post
title: "Metasploitable3 - Building the Ubuntu Linux Version"
tags:
- Metasploitable3
- PenTesting
- Linux
thumbnail_path: blog/thumbs/padlock.png
add_to_popular_list: true
---

This post is part of a series on the Ubuntu Linux version of Metasploitable3. The following posts are part of the series:

- Part 1: [Building the Ubuntu Linux Version]( {% post_url 2018-07-03-metasploitable3-building-the-ubuntu-linux-version %}) (You are here!)
- Part 2: [Customizing the Ubuntu Linux Version]( {% post_url 2018-07-04-metasploitable3-customizing-the-ubuntu-linux-version %})
- Part 3: [Pentesting the Ubuntu Linux Version - SQL Injection]( {% post_url 2018-07-08-metasploitable3-pentesting-the-ubuntu-linux-version-part1 %})
- Part 4: [Pentesting the Ubuntu Linux Version - Attacking Services]( {% post_url 2018-07-09-metasploitable3-pentesting-the-ubuntu-linux-version-part2 %})

Metasploitable3 is an intentionally vulnerable machine build for exploit testing (aka. pen testing). Back in November, 2016, [Rapid7](https://blog.rapid7.com/2016/11/15/test-your-might-with-the-shiny-new-metasploitable3/) released Metasploitable3. I had used the previous version, [Metasploitable2](https://metasploit.help.rapid7.com/docs/metasploitable-2), to learn the basics of penetration testing. It was an excellent platform for exploratory testing, and I was sure Metasploitable3 was going to be the same experience... it was!

## Metasploitable2, Metasploitable3 and InfoSec Assignments

In my first semester of teaching Introduction to Information Security in Semester 1, 2017, I used Metasploitable2 for in-class practical lab exercises. I did the same again this year. For the first assignment in the paper, students have to perform an information security audit and document all findings in a security audit report. It is a fun assignment! Last year, I choose Metasploitable3 in the hopes that they wouldn't find out what system they were auditing. I went to great lengths to ensure there was no trace of the phrase _Metasploitable3_ in the system. I am pretty sure it went un-noticed! This year I was looking for something new, and I accidentally stumbled across Metasploitable3... the Linux version! It's an exciting story, but in summary, I was building the Windows Server 2008 version on Linux, and noticed the BASH script was expecting an argument...

{% highlight bash %}
case "$1" in
    ubuntu1404)  echo "building ubuntu 1404"
                 os_full="ubuntu_1404"
                 os_short="ub1404"
                 ;;
    windows2008) echo "building windows 2008"
                 os_full="windows_2008_r2"
                 os_short="win2k8"
                 ;;
esac
{% endhighlight %}

A sense of great interest filled my heart. I had just re-read the [Metasploitable3 Wiki](https://github.com/rapid7/metasploitable3/wiki), perused over the [source code on the GitHub repository](https://github.com/rapid7/metasploitable3) and had seen nothing about a Linux version. I checked the first [Rapid7 blog post](https://blog.rapid7.com/2016/11/15/test-your-might-with-the-shiny-new-metasploitable3/) about Metasploitable3 and noticed the following statement:

>> Although our first image is Windows, the planning part of the Linux version has already begun. If you would like to jump on this train, please feel free to leave a comment on Github, or contribute.

A bit of further digging revealed a [GitHub issue](https://github.com/rapid7/metasploitable3/issues/37) was opened by a user named prateepb who stated that they'd be happy to create a Linux version. There was a bit of chatter back and forth, and even a post summarising a selection of tasty vulnerabilities for the system:

```
SSH with weak passwords
PHPMyAdmin [I'm currently working on this one locally]
WebDAV (with PUT method enabled)
ProFTPD 1.3.5 (proftpd_modcopy_exec)
Apache Continuum 1.4.2 (apache_continuum_cmd_exec) > rapid7/metasploit-framework#6962
VNC (vnc_keyboard_exec)
Cacti 0.8.8 (cacti_tree_sqli)
Samba (samba_symlink_traversal)
Apache with mod_cgi (apache_mod_cgi_bash_env_exec)
Cups 1.7.2 (cups_bash_env_exec)
JBoss AS 6.1.0.Final (JDK 6, 7)
ActionPack 4.2.4 (rails_actionpack_inline_exec)
Custom PHP login page that's vulnerable to SQL injection
Splunk 6.1.1 (splunk_upload_app_exec)
MySQL binding 0.0.0.0
UnreaIRCD IRC daemon (unreal_ircd_3281_backdoor)
Drupal 7.5 (drupal_restws_exec)
Linux kernel >=4.4 bpf_priv_esc
Docker (docker_daemon_privilege_escalation)
Linux Local CVE-2016-4997
```

Very recently, in February, 2018, the user [jbarnett-r7 submitted a push request on GitHub](https://github.com/rapid7/metasploitable3/pull/231) to include the code for the Linux box that was used for the [capture the flag competition hosted by Rapid7](https://blog.rapid7.com/2017/12/11/congrats-to-the-winners-of-our-2017-community-ctf/) in December 2017. This addition was after I built the Metasploitable3 Linux version for my assignment.

Even with the odds against me, I decided to use the Metapsploitable3 Linux version for my assignment. It was new and interesting, and I needed a challenge. Also, I luckily started planning the classes in advance so had the time to tinker and test!

## Building the Metasploitable3 Linux Version

The problem I initially faced was that there was no formal documentation about the Metasploitable3 Linux version. There was no information on building the Linux version, and no (robust) information about the vulnerabilities in the system. I am guessing that is because the build was (and seems to still be) in active development. This was in stark contrast to the Metasplotable3 Windows Server 2008 version, which is heavily documented on the [Rapid7 GitHub Wiki](https://github.com/rapid7/metasploitable3/wiki). There are configuration instructions, tips and tricks and, most importantly, a list of vulnerabilities.

The [README.md](https://github.com/rapid7/metasploitable3/blob/master/README.md) file from the Metasploitable3 repository has the most up-to-date information on building the system. They specify the following system requirements:

- OS capable of running all of the required applications listed below
- VT-x/AMD-V Supported Processor recommended
- 65 GB Available space on drive
- 4.5 GB RAM

In terms of the selected build operating system, the only requirement is that the system can run the applications listed in the next section. Technically, this could be achievable on Microsoft Windows, but building on Linux is much more sensible. This tutorial uses Ubuntu Desktop 18.04 amd64 LTS as the operating system. 

As usual, make sure your system is up-to-date by running the `update` and `upgrade` commands:

{% highlight bash %}
sudo apt update && sudo apt upgrade
{% endhighlight %}

Now it is time to install the application/tool dependencies.

### Install Application Requirements (Dependencies)

In addition to the system requirements specified above, the README file also specifies the following collection of package requirements:

- Packer
- Vagrant
- Vagrant Reload Plugin
- VirtualBox
- Internet connection

When I started trying to build Metasploitable3, I ran into dependency issues. Specifically, I had problems with the versions of the tools I had installed. On a closer inspection of the [build.sh](https://github.com/rapid7/metasploitable3/blob/master/build.sh) script, I noticed there were a collection of variables that checked the tool requirement version numbers. A snippet of the code is displayed below:

{% highlight bash %}
min_vbox_ver="5.1.10"
min_vagrant_ver="1.9.0"
min_packer_ver="0.10.0"
min_vagrantreload_ver="0.0.1"
packer_bin="packer"
packer_build_path="packer/builds"
{% endhighlight %}

The above tools were all marked as _minimum_, guessing that these were the minimum versions required to build Metasploitable3. The following instructions specify how I setup my build environment to match the above requirements.

#### Installing Oracle Virtual Box

[VirtualBox](https://www.virtualbox.org/) is an open source (GPLv2) x86/x64 virtualization product that runs on Windows, Linux, OS X and Solaris systems. In this tutorial, it is used to host the virtualized guest operating system (Metasploitable3) while it is being built. 

In Ubuntu 18.04, VirtualBox is provided in the default `apt` repositories. This is a decent option to install as the application will be tested with Ubuntu and updates provided when a new stable version is added to the package repository. But you could install from the Debian package provided on the [Download VirtualBox for Linux Hosts](https://www.virtualbox.org/wiki/Linux_Downloads) page. This tutorial use the package repository, which (at time of writing) provides version 5.2.10. You can search the package repository using the following command:

{% highlight bash %}
thomasl@server:~$ apt search virtualbox
...
virtualbox/bionic-updates,now 5.2.10-dfsg-6ubuntu18.04.1 amd64
  x86 virtualization solution - base binaries
...
{% endhighlight %}

As specified in the Metasploitable3 README, VirtualBox version 5.1.10 or higher is required. You can be install VirtualBox using the following command:

{% highlight bash %}
thomasl@server:~$ sudo apt install virtualbox
{% endhighlight %}

Once VirtualBox has been installed, check the version by running the `virtualbox` command and the `--help` option to confirm what version you are running:

{% highlight bash %}
thomasl@server:~$ virtualbox --help
Oracle VM VirtualBox Manager 5.2.10_Ubuntu
{% endhighlight %}

One last step for VirtualBox. The Metasploitable3 project requires the VirtualBox Guest Additions. Again, this can easily be installed from the ubuntu repositories using the `apt` command:

{% highlight bash %}
thomasl@server:~$ sudo apt install virtualbox-guest-additions-iso
{% endhighlight %}

#### Installing Vagrant

The second requirement for building Metasploitable3 is the vagrant tool. Developed by HashiCorp, [Vagrant](https://www.vagrantup.com/) is a tool for building and managing virtual machine environments which automates system configuration. We are going to use the Debian package provided by HashiCorp. 

We will start by moving into the `/tmp` directory, a good place for temporary files:

{% highlight bash %}
thomasl@server:~$ cd /tmp
{% endhighlight %}

Now, download the Debian package. This tutorial uses Vagrant version 2.1.2. It would be worth checking if there is an updated Debian 64-bit package when you are building. Check the [Download Vagrant website](https://www.vagrantup.com/downloads.html) and use an updated URL if an update is available. Download Vagrant using the following command:

{% highlight bash %}
thomasl@server:/tmp$ wget https://releases.hashicorp.com/vagrant/2.1.2/vagrant_2.1.2_x86_64.deb
{% endhighlight %}

Install the Debian package using the following command:

{% highlight bash %}
thomasl@server:/tmp$ sudo dpkg -i vagrant_2.1.2_x86_64.deb
{% endhighlight %}

Make sure you check the install:

{% highlight bash %}
thomasl@server:/tmp$ vagrant version
Installed Version: 2.1.2
Latest Version: 2.1.2

You're running an up-to-date version of Vagrant!
{% endhighlight %}

#### Installing Packer

The third requirement for building Metasploitable3 is the [packer](https://www.packer.io/) tool. Again, this tool is produced by HashiCorp, and is used to automates the creation of any type of machine image.

There is only a binary available for packer, distributed in a zip archive. Now, download the Debian package. This tutorial uses Packer version 1.2.4. It would be worth checking if there is an updated version when you are building. Check the [Download Packer website](https://www.packer.io/downloads.html) and use an updated URL if an update is available. Download Packer using the following command:

{% highlight bash %}
thomasl@server:/tmp$ wget https://releases.hashicorp.com/packer/1.2.4/packer_1.2.4_linux_amd64.zip
{% endhighlight %}

Unzip the file. Note the `unzip` tool is provided by default in Ubuntu Desktop 18.04, but has not been in the past. If the following command does not work, make sure to install the `unzip` utility using: `sudo apt install unzip`. Not extract the zip archive:

{% highlight bash %}
thomasl@server:/tmp$ unzip packer_1.2.4_linux_amd64.zip
{% endhighlight %}

The archive only contains one file, named `packer`. We need to make this binary file available. You could add a path, but that is a little more work, so we are going to move the `packer` binary file to the `/usr/local/bin/` directory. Basically, this means that we can run, or execute, the `packer` command from any location in the file system. Move the executable file using the command below:

{% highlight bash %}
thomasl@server:/tmp$ mv packer /usr/local/bin/packer
{% endhighlight %}

If you ever want to remove the file in the future, just delete the file using: `sudo rm /usr/local/bin/packer`.

Check that packer works and is the correct version using the following command:

{% highlight bash %}
thomasl@server:/tmp$ packer version
Packer v1.2.4
{% endhighlight %}

#### Installing Packer Vagrant Reload Plugin

The fourth, and final, requirement is a Vagrant plugin named [vagrant-reload](https://github.com/aidanns/vagrant-reload). This plugin allows a reload during virtual machine provisioning. The Metasploitable3 build requires this plugin, so we must install it. Luckily, the installation is straight forward. Execute the following command:

{% highlight bash %}
thomasl@server:/tmp$ vagrant plugin install vagrant-reload
Installing the 'vagrant-reload' plugin. This can take a few minutes...
Fetching: vagrant-reload-0.0.1.gem (100%)
Installed the plugin 'vagrant-reload (0.0.1)'!
{% endhighlight %}

Done!

### Building Metasploitable3 Linux Version

In the previous section we install all application requirements including VirtualBox, Vagrant, vagrant-reload, and packer. We are now ready to actually build Metasploitable3! 

This tutorial specifies the home directory to download the GitHub repository and build the project. However, you can perform these steps in another location. It shouldn't make a difference, as none of the commands specify a full path.

Go back to your home directory, or somewhere your want to build the project:

{% highlight bash %}
cd ~
{% endhighlight %}

Make sure you have `git` installed. This is required to download the source code of the Metasploitable3 project from GitHub. Use `apt` to install `git` if you do not already have it installed:

{% highlight bash %}
sudo apt install git
{% endhighlight %}

Clone the Metasploitable3 GitHub repository:

{% highlight bash %}
git clone https://github.com/rapid7/metasploitable3.git
{% endhighlight %}

It is approximately 175MB, so be patient! Now, change directory to the downloaded Metasploitable3 source code:

{% highlight bash %}
cd metasploitable3
{% endhighlight %}

**BUG FIX**

This step is very important. When building Metasploitable3 for this tutorial, I found a bug in the configuration for one of the flags... specifically, the `7_of_diamonds` flag. If the following bug fix is not implemented, your build will fail!

Open the `flags.rb` file, where the configuration for the system flags is performed.

{% highlight bash %}
vim chef/cookbooks/metasploitable/recipes/flags.rb
{% endhighlight %}

Locate line 38. Basically, we need to change one of the lines which has an error. The specific flag is the `7_of_diamonds`, and the docker image that is build for this flag refers to an incorrect name. In the code it is specified as `7 of diamonds`, while it should be `7_of_diamonds`. The original code is listed below:

{% highlight bash %}
bash 'build docker image for 7 of diamonds' do
  code <<-EOH
    cd /opt/docker
    docker build -t "7_of_diamonds" .
    docker run -dit --restart always --name 7_of_diamonds 7_of_diamonds
  EOH
end
{% endhighlight %}

Make sure to change the code to the following listing (note the added underscore character to the first line!):

{% highlight bash %}
bash 'build docker image for 7_of_diamonds' do
  code <<-EOH
    cd /opt/docker
    docker build -t "7_of_diamonds" .
    docker run -dit --restart always --name 7_of_diamonds 7_of_diamonds
  EOH
end
{% endhighlight %}

OK! We are ready to start the build process. Run the build script using `ubuntu1404` as an argument to the script. This will specify that we want to build the Linux version, not the Windows Server 2008 version:

{% highlight bash %}
./build.sh ubuntu1404
{% endhighlight %}

Get a coffee, do the dishes or find something else to do for the next 30 to 45 minutes. The build process takes quite a while, but due to the automated tools used (Vagrant and Packer) is requires no intervention from the user. 

When finished you will se output that is similar to the code snippet below. 

{% highlight bash %}
==> Builds finished. The artifacts of successful builds are:
--> virtualbox-iso: 'virtualbox' provider box: /home/thomasl/metasploitable3/packer/templates/../builds/ubuntu_1404_virtualbox_0.1.12.box
Box successfully built by Packer.
Attempting to add the box to Vagrant...
==> box: Box file was not detected as metadata. Adding it directly...
==> box: Adding box 'metasploitable3-ub1404' (v0) for provider:
    box: Unpacking necessary files from: file:///home/thomasl/metasploitable3/packer/builds/ubuntu_1404_virtualbox_0.1.12.box
==> box: Successfully added box 'metasploitable3-ub1404' (v0) for 'virtualbox'!
Box successfully added to Vagrant.
---------------------------------------------------------------------
SUCCESS: Run 'vagrant up' to provision and start metasploitable3.
NOTE: The VM will need Internet access to provision properly.
{% endhighlight %}

The specific build will complete, resulting in a `.box` file. According to [HashiCorp](https://www.vagrantup.com/docs/boxes/format.html), a `.box` file is is a compressed (`tar`, `tar.gz`, `zip`) file that is specific to a single provider (e.g., VirtualBox or VMWare) and can contain anything. In the case of Metasploitable3, it is the virtual machine that we just built. You can find the `.box` file in the `metasploitable3/packer/builds/` directory. 

To start the virtual machine, essentially exporting it to VirtualBox, run the following command:

{% highlight bash %}
vagrant up
{% endhighlight %}

This will export the `.box` file to VirtualBox. More specifically, we should probably run:

{% highlight bash %}
vagrant up ub1404
{% endhighlight %}

The `vagrant up` command looks the the `.Vagrantfile` in the base directory of the Metasploitable3 source code. If we have a look at the code in this file, we can see that running `vagrant up` will try to export both types of virtual machines (Ubuntu Linux and Widnows Server 2008). The Linux-specific part of the `.Vagrantfile` is displayed below:

{% highlight bash %}
Vagrant.configure("2") do |config|
  config.vm.define "ub1404" do |ub1404|
    ub1404.vm.box = "metasploitable3-ub1404"
    ub1404.vm.hostname = "metasploitable3-ub1404"
    config.ssh.username = 'vagrant'
    config.ssh.password = 'vagrant'

    ub1404.vm.network "private_network", ip: '172.28.128.3'

    ub1404.vm.provider "virtualbox" do |v|
      v.name = "Metasploitable3-ub1404"
      v.memory = 2048
    end
  end

  config.vm.define "win2k8" do |win2k8|
    # Base configuration for the VM and provisioner
    win2k8.vm.box = "metasploitable3-win2k8"
...
{% endhighlight %}

As you can see, there are two configurations for each type of virtual machine. The `ub1404` configuration is for the virtual machine we just built. We can see some interesting configuration options including the name of the `.box` file (`metasploitable3-ub1404`), the hostname (`metasploitable3-ub1404`), the username and password (`vagrant/vagrant`), the IP address of the virtual machine (`172.28.128.3`), the name of the virtual machine (`Metasploitable3-ub1404`) and RAM allocation (`2048`). You can edit these values to change any configuration when the virtual machine is exported, or you can change these values through VirtualBox as well.

After running `vagrant up` or `vagrant up ub1404`, the virtual machine will be exported and become available in VirtualBox. You can open the VirtualBox application and see that the `Metasploitable3-ub1404` virtual machine is running and available for use. Like previously mentioned, you can now easily customize the virtual machine using the VirtualBox application; for example, modify the network adapter configuration. 

Hopefully this tutorial got a Metasploitable3 Ubuntu Linux version virtual machine up and running. The platform is excellent for testing and learning in a virtualized environment. Stay tuned for my next Metasploitable3 tutorial, customizing Metasploitable3 Ubuntu Linux version, where we will look at how to customize the vulnerabilities, users, and flags for the virtual machine we build today.
