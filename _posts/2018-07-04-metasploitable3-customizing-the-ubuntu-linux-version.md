---
layout: post
title: "Metasploitable3 - Customizing the Ubuntu Linux Version"
tags:
- Metasploitable3
- PenTesting
- Linux
thumbnail_path: blog/thumbs/padlock.png
---

This post is part of a series on the Ubuntu Linux version of Metasploitable3. The following posts are part of the series:

- Part 1: [Building the Ubuntu Linux Version]( {% post_url 2018-07-03-metasploitable3-building-the-ubuntu-linux-version %})
- Part 2: [Customizing the Ubuntu Linux Version]( {% post_url 2018-07-04-metasploitable3-customizing-the-ubuntu-linux-version %}) (You are here!)
- Part 3: [Pentesting the Ubuntu Linux Version - SQL Injection]( {% post_url 2018-07-08-metasploitable3-pentesting-the-ubuntu-linux-version-part1 %})
- Part 4: [Pentesting the Ubuntu Linux Version - Attacking Services]( {% post_url 2018-07-09-metasploitable3-pentesting-the-ubuntu-linux-version-part2 %})

My previous post was a tutorial about [Metasploitable3]( {% post_url 2018-07-03-metasploitable3-building-the-ubuntu-linux-version %}), where I specified the steps required to build the Metasploitable3 Ubuntu Linux version that is not officially finished or documented. In this tutorial, we go a step further and perform some customization of the Metasploitable3 virtual machine. This is performed during the actual build process of the virtual machine and requires editing various configuration files, then rebuilding the virtual machine. In this post I will cover how to customize the vulnerabilities, users, and flags in the Metasploitable3 virtual machine.

## Cleaning the Build Environment

If you followed my previous tutorial, you will need to clean the Metasploitable3 build environment. If this is not performed, there will be a variety of errors encountered during the rebuild process. For example, you cannot have two virtual machines in VirtualBox with the same name. Unfortunately, there is no quick clean-up script, so we will have to perform these steps manually. If you have not yet build a version of Metasploitable3, you do not need to perform these tasks.

### Remove the Virtual Machine from VirtualBox

Open VirtualBox and locate the previously created virtual machine, it will most likely be named using the default value of: `Metasploitable3-ub1404`. If you want to keep a backup of the original version, you can export it. To achieve this:

- Highlight the virtual machine by left-clicking the machine name
- Left-click `Expert Mode`
- Set the `File` path to save the virtual machine (the default location is the `~/Documents` folder)
- You can export to various formats, but I prefer the Open Virtualization Format 1.0
- This will save a `.ova` file for later import

Once you are happy that you have exported the original virtual machine or just want to remove it, you can delete it using the following steps:

- Right-click the virtual machine (named: `Metasploitable3-ub1404`)
- From the menu, select `Remove`
- Make sure to `Delete all files` so that we can create another virtual machine with the same name

### Removing the Previous Vagrant Box

Like the previous step, you can just delete the `.box` file, or back it up. To save it, I recommend moving the file to the same location as the exported virtual machine. Achieved using the following steps:

- Change to the Metasploitable3 repository folder (if in the home directory: `cd ~/metasploitable3`)
- Move the `.box` file: `mv packer/build/ubuntu_1404_virtualbox_0.1.12.box ~/Documents/`

If you simply want to delete the previous `.box` file:

- Change to the Metasploitable3 repository folder (if in the home directory: `cd ~/metasploitable3`)
- Delete the `.box` file: `rm packer/build/ubuntu_1404_virtualbox_0.1.12.box`

## Customizing Metasploitable3 Ubuntu Linux Version

The default configuration of Metasploitable3 is excellent for training and testing. However, when distributing this machine as an assignment, I wanted to set a variety of custom configurations including changing the default users, changing the hostname, changing the default user (vagrant) password, and turning off the firewall. This section discusses how to perform these changes, and indicates different files and configurations that can be performed.

## Interesting Configuration Files

According to [HashiCorp](https://www.packer.io/docs/templates/index.html), templates are JSON files that configure the various components of Packer in order to create one or more machine images. The Metasploitable3 project has a collection of Packer templates. For Linux there are three templates:

- `packer/templates/ubuntu_1404.json` (Normal)
- `packer/templates/pro/ubuntu_1404.json` (Pro)
- `packer/templates/aws/ubuntu_1404_ctf_2017.json` (CTF)

And, although not specifically on topic, there are two Packer templates for the Windows Server 2008 build:

- `packer/templates/windows_2008_r2.json` (Normal)
- `packer/templates/pro/windows_2008_r2.json` (Pro)

So, there are three Ubuntu Linux templates, that I refer to as: 1) Normal, 2) Pro and 3) CTF. The primary difference between the Normal and Pro templates is that there are no Chef recipes in the Pro template. I have not thoroughly tested, but it appears that no additional software or configuration (apart from installing vmtools) is performed. I think that since the Linux version is still under development, there is not a differentiation yet. When compared to the Windows Server version, the Pro template seems much more secure (from solely looking at the configuration files.)

In this post we are going to discuss and customize the **Normal template** available in: `packer/templates/ubuntu_1404.json`. Listed below is a stripped-down version of the `ubuntu_1404.json`. Obviously, the file format is JSON. There first entry is named `builders` which specify what type of virtual machine platform to target. In the previous post, we build a virtual machine for VirtualBox, it seems that we could instead target VMWare. The next entry, named `provisioners` is very interesting. This entry is an array of objects that defines the provisioners that will be used to install and configure software. 

{% highlight json %}
{
  "builders": [
    {
      "type": "vmware-iso",
    },
    {
      "type": "virtualbox-iso",
    }
  ],
  "provisioners": [
    {
      "type": "chef-solo",
      "cookbook_paths": ["{{template_dir}}/../../chef/cookbooks"],
      "run_list": [
        "metasploitable::vm_tools",
        "metasploitable::users",
        "metasploitable::mysql",
        "metasploitable::apache_continuum",
        "metasploitable::apache",
        "metasploitable::php_545",
        "metasploitable::phpmyadmin",
        "metasploitable::proftpd",
        "metasploitable::docker",
        "metasploitable::samba",
        "metasploitable::sinatra",
        "metasploitable::unrealircd",
        "metasploitable::chatbot",
        "metasploitable::payroll_app",
        "metasploitable::readme_app",
        "metasploitable::cups",
        "metasploitable::drupal",
        "metasploitable::knockd",
        "metasploitable::iptables",
        "metasploitable::flags"
      ]
    }
  ],
}
{% endhighlight %}

As we can see from the list above, this template uses `chef-solo` as a provisioner to install and configure software. There is a path specified to the _cookbooks_, which are just Ruby programs. The _cookbook_ directory is located at: `chef/cookbooks/metasploitable/`. And within that specific folder is a subfolder named `recipes` that contains the code. I have never used Chef, but it is a very simple and relatable premise. To build the system there is a complete _cookbook_. Each configuration is a _recipe_ in that _cookbook_. Pretty simple stuff.

If you wanted to disable a specific _recipe_ from the _cookbook_, you could comment out the specific recipe (using a `#` character) or simply delete the line. It would be best practice to create a backup of the original file before deleting anything!

When I built my Metasploitable3 Ubuntu Linux system for my Security course I completely removed a number of the _recipes_ including:

- `docker`: This is a technology that students had not yet used
- `flags`: I wanted to put in my own flags, that were simpler (and more fun!)
- `cups`: I had no real reason for taking this out!

Looking back, I would have probably removed the `iptables` _recipe_ as well. In the end, I removed all the `iptables` rules manually, as implementation of the firewall would make the assessment far too difficult for the level of the paper. The following subsections discuss some more interesting customizations I have performed.

### User Customization

The user _recipe_ file for user configuration (`recipes/users.rb`) points to another file that has the actual configuration properties of the users (`attributes/users.rb`). The user attribute file can be modified to specify different user names, passwords and other configuration. An example of the file structure is below:

{% highlight bash %}
default[:users][:leia_organa] = { 
    username: 'leia_organa',
    password: 'help_me_obiwan',
    password_hash: '$1$N6DIbGGZ$LpERCRfi8IXlNebhQuYLK/',
    first_name: 'Leia',
    last_name: 'Organa',
    admin: true,
    salary: '9560' }

default[:users][:luke_skywalker] = { 
    username: 'luke_skywalker',
    password: 'like_my_father_beforeme',
    password_hash: '$1$/7D55Ozb$Y/aKb.UNrDS2w7nZVq.Ll/',
    first_name: 'Luke',
    last_name: 'Skywalker',
    admin: true,
    salary: '1080'}
{% endhighlight %}

Basically, each user has an entry which specifies basic user configuration including the username, password, password hash. This information can easily be modified. For example, below is the initial entry for the `darth_vader` user account:

{% highlight bash %}
default[:users][:darth_vader] = { 
    username: 'darth_vader',
    password: 'Dark_syD3',
    password_hash: '$1$rLuMkR1R$YHumHRxhswnfO7eTUUfHJ.',
    first_name: 'Darth',
    last_name: 'Vader',
    admin: false,
    salary: '6666'}
{% endhighlight %}

And here is my modified version for the same `darth_vader` user account:

{% highlight bash %}
default[:users][:darth_vader] = { 
    username: 'darth_vader',
    password: 'daddy_issues2277',
    password_hash: '$1$dqkERFiQ$oMihN1usY.gnbemCa48Pk1',
    first_name: 'Anakin',
    last_name: 'Skywalker',
    admin: true,
    salary: '10000'}
{% endhighlight %}

The only tricky part of this modification was to generate a password for the user. Since the password had changed for `darth_vader`, from `Dark_syD3` to `daddy_issues2277` a new hash is essential. Otherwise the new password would not match the password stored in the Linux encrypted password file (`/etc/shadow`). I have never done this before, but a couple of Google searches found a simple solution using OpenSSL:

{% highlight bash %}
thomasl@server:~$ openssl passwd -1 "daddy_issues2277"
$1$dqkERFiQ$oMihN1usY.gnbemCa48Pk1
{% endhighlight %}

As you can see from the command and output above, the `openssl` tool can generate a MD5 hashed password, and generate a unique salt value... and format the output to adhere to the `md5crypt` syntax that is used many Linux distribution password files. This is the same format used in Ubuntu 14.04 that Metasploitable3 is build on. Once this value is calculated, it can be easily copy/pasted into the user configuration file.

I specifically choose MD5 as the passwords would be easier (read: faster) to crack. Unfortunately, the `openssl` tools does not support the SHA-512 algorithm so another solution is necessary. Here is a simple Python 3 snippet that will generate the correct hash syntax for the `/etc/shadow` file:

{% highlight python %}
python3 -c 'import crypt; print(crypt.crypt("daddy_issues2277", crypt.mksalt(crypt.METHOD_SHA512)))'
{% endhighlight %}

In addition to user names, passwords and password hashes, there are other configurations in the users file. The `admin` setting specifies whether a user should have `sudo` access. This is an important choice, as modification of this can greatly hinder (or help) pentests. Finally, the `salary` value is used in the `payroll_app` _recipe_ which is used to display wages of specific users. From my experience, it is more for fun than anything else.

### Live Customization

So far, we have only customized of the build process. It is very easy to customize some parts of the Metasploitable3 system in a live environment; for example, when running the built virtual machine in VirtualBox. If you are like me and are not an expert using Vagrant, Packer and Chef, this is a highly suitable solution.

#### Changing the vagrant password

By default, Metasploitable3 is configured with a user named: `vagrant` who is used to build the virtual machine. To keep things simple, the password for the account is also `vagrant`. However, the virtual machine cannot be deployed with these default credentials, as it is too easy to break. I have even witnessed other vagrant builds that use the same credentials and could log in without knowing anything about the system (these were not deployed, only in testing environments... but still!). The `vagrant` user configuration can be changed in the build process by editing the following files:

- `metasploitable3/packer/http/preseed.cfg` on the following lines:

{% highlight bash %}
d-i passwd/user-fullname string vagrant
d-i passwd/username string vagrant
d-i passwd/user-password password vagrant
d-i passwd/user-password-again password vagrant
{% endhighlight %}

- `metasploitable3/packer/templates/ubuntu_1404.json` on the following lines:

{% highlight bash %}
"ssh_username": "vagrant",
"ssh_password": "vagrant",
{% endhighlight %}

- `metasploitable2/Vagrantfile` on the following lines:

{% highlight bash %}
config.ssh.username = 'vagrant'
config.ssh.password = 'vagrant'
{% endhighlight %}

However, I have not fully tested this modification, but it is the only places in the code I have witnessed this coding. Given that, it is probably easier just changing the password in the live system. This is exceptionally simple. Login to the deployed virtual machine (after running `vagrant up`), and execute the following command:

{% highlight bash %}
sudo passwd vagrant
{% endhighlight %}

#### Changing the hostname

The hostname (or computername) is a similar situation. It can, of course, be changed in both the live system and the build process. The only location I could discover that specifies the hostname configuration is in the `Vagrantfile` on the following line:

{% highlight bash %}
ub1404.vm.hostname = "metasploitable3-ub1404"
{% endhighlight %}

Again, it would be simpler to modify this property in the live system by editing the following two files:

{% highlight bash %}
/etc/hosts
/etc/hostname
{% endhighlight %}

#### Uninstalling VirtualBox Guest Additions

I only used VirtualBox for the build process. After that I export the virtual machine, and import it into the VMWare vSphere platform. I know this sounds crazy. I don't have a license for VMWare Workstation for Linux. Additionally, I noted that in the `vmtools.rb` _recipe_ there is not option for VMWare. Not sure if this would be problematic during the building process. Anyway, another good configuration to perform on a live system in removal of the VBoxGuestAdditions package. The following commands will achieve uninstallation of this package.
Uninstall VBox tools

{% highlight bash %}
cd /opt/VBoxGuestAdditions-<version_number>
sudo ./uninstall.sh
{% endhighlight %}

#### Reset firewall/turn off firewall

If you did not remove the `iptables.rb` _recipe_ you can always manually turn off the firewall on a live system. This is easily achieved using the following command:

{% highlight bash %}
sudo iptables --policy INPUT
sudo iptables --policy OUTPUT
sudo iptables --policy FORWARD
sudo iptables -F
{% endhighlight %}

#### Changing the flags

One of the most exciting aspects of Metasploitable3 are the flags. Nested in the capture the flag tournaments, flags offer the chance to find and extract information. They add something fun into the mix. In an assessment, the flags are thoroughly enjoyed by students. Instead of writing a Chef _recipe_ to build custom flags, I simply disable the _recipe_ and manually add them. In my assessment the flags are much easer. For example, in the home directory of `boba_fett` I added a text file to help students find a user account with `sudo` access, and provide them a password at the same time.

```
Darth Vader always forgets his password, so I was told to keep a backup.

Documented the password for darth_vader below:
daddy_issues2277

I mean, for someone so powerful with the force, he is kinda forgetful.
```

## Conclusion

Hopefully this tutorial gave you some guidance and hints about customizing Metasploitable3 Ubuntu Linux version. These changes can be exceptionally useful if you want to have a custom virtual machine that targets different levels of difficulty, or uses different user credentials. Stay tuned for my next Metasploitable3 tutorial, a summary of some vulnerabilities and exploits for the Metasploitable3 Ubuntu Linux version.

If you are interested in the steps/method I used to configure Metasploitable3 Windows Server 2008 version, please leave a comment. I have the notes for 2017, and would happy re-visit and re-build the machine while making notes if anyone is interested! Also, if you have any feedback, ideas or questions, please leave a comment below.
