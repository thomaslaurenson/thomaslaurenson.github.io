---
layout: post
title: "Improved BASH history for multiple sessions, unclean shell exits and timestamps for every command executed"
tags:
- Linux
- BASH
- history
thumbnail_path: blog/thumbs/2018/bash.png
---

It is my continual venture to make my job easier. Like my sysadmin roots taught me, try to automate the process, and document thoroughly. In my job as a lecturer I try to automate many aspects of the courses I run. Even though it takes time up front... next semester will be easier!

I learnt a lesson about using VMs for tertiary assessments early on. The more information about what has been performed on a system, the easier (and sometimes faster) it is to assess the tasks performed. For example, in the Linux and Security paper I teach it is very useful to see the complete BASH command history. After my first semester of teaching, I noticed the bash history was somewhat limited in a collection of assignment VMs. It turned out that most of the history was not being retained, due to students having multiple sessions (SSH, TTYs etc.). This needed to be solved. If there is a rich history, it will be better for me (marking) and better for them (reviewing their own command history). The goals:

- Implement a solution to preserve BASH history in multiple sessions
- Add a timestamp to each command stored

The first problem was determining why BASH was not maintaining a complete history. A quick Google and some research discovered. Apparently, each open terminal (SSH session etc.) has an independent history file buffer. This file is known as the `.bash_history` file, a hidden file in the home directory of each user. It has the environment variable of `$HISTFILE`. For example: 

```
thomasl@server:~$ echo $HISTFILE
/home/thomasl/.bash_history
```

Back to the problem: previously entered commands are stored in `$HISTFILE` when the terminal is closed. If you wanted to search for a specific command, for example `iptables`, you would run the following command:

```
history | grep iptables
```

However, if any `iptables` command was run in a different shell or session, it is not visible in the current session. To see the full command history you would need to close all shells, open a new shell and run the history command again! In addition, if a shell is not exited cleanly, no history will be saved. According to the [Bash History Facilities](https://www.gnu.org/software/bash/manual/html_node/Bash-History-Facilities.html) man page from GNU, the history is not saved if the terminal is not exited cleanly. An example of this is closing a PuTTY session by using `Ctrl + F4` or closing the window using the `X` button, instead of typing `exit` in the shell itself. Unfortunately, I see students doing this regularly. I shouldn't kid myself, even I do this occasionally!

## How to Save All BASH History

This section discusses each command found to be useful to preserve all BASH commands in the history file. The full script for enhancing BASH history is provided at the end of the article.

To prevent loss of command history, it is possible to append to the history file instead of overwriting previous content from each session. This is configurable using the `histappend` shell option, as illustrated below. Please note that the `shopt` command is a shell builtin to set and unset (enable and disable) various Bash shell options:

```
# Configure BASH to append (rather than overwrite the history):
shopt -s histappend
```

The next configuration specifies that there is an attempt to save each line of a multi-line command in the same history entry. This would add semicolons where necessary to preserve syntactic correctness of the original command. 

```
# Attempt to save all lines of a multiple-line command in the same entry
shopt -s cmdhist
```

The final major setting is to comfigure the history file to reload after every entry. This means that we can append after every executed command, rather than when a shell session is exited. To achieve this, the `PROMPT_COMMAND` setting can be leveraged. Any value specified for the `PROMPT_COMMAND` is executed as a command prior to issuing each primary prompt. We will leverage it to reload the BASH history.

```
# After each command, append to the history file and reread it
export PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND$"\n"}history -a; history -c; history -r"
```

A brief summary of the `history` commands:

- `history -a`: Append to the history file
- `history -c`: Clear the history (of the current shell)
- `history -r`: Read the history file and append its contents to the history list

As you can see, these series of command basically append, clear and reload the contents of the `.bash_history` file. It is essential to clear the file, as if this was not performed... there would be duplicate history entries when the shell session was exited!

The three specified commands and configuration (`histappend`, `cmdhist`, and `PROMPT_COMMAND`) provide the functionality to save all BASH history as soon as it is entered. Excellent!

## Additional BASH History Configuration

The previous discussion specified a robust configuration for saving all BASH command history. However, there are some additional configurations that are also useful.

The `HISTTIMEFORMAT` variable allows the inclusion of a timestamp on each command entry in the history file. It uses the same format string method as the [strftime](https://linux.die.net/man/3/strftime) command. I prefer the following configuration:

```
# Print the timestamp of each command
HISTTIMEFORMAT='%F %T '
```

Which results in the following timestamp: `%Y-%m-%d %H:%M:%S`

For example: `2018-05-17 19:24:05`

However, you could use any type of configuration you like. The [strftime man page](https://linux.die.net/man/3/strftime) has a complete summary of how to use the command.

Another very important setting is the `HISTFILESIZE` configuration. This variable specifies the **maximum number of lines**, which has a default value of `500`. This can be set to `-1` to remove the line count limit.

```
# Set no limit for history file size
HISTFILESIZE=-1
```

Interestingly, there is another variable named `HISTSIZE` which has the exact same description as `HISTFILESIZE`. I have not tested it, but it seems prudent to also set this variable to a value of `-1` to remove any line count limit.

```
# Set no limit for history file size
HISTSIZE=-1
```

The `HISTCONTROL` variable is used to control how commands are saved on the history list. Of the available configurations, the value of `ignoredups` causes lines matching the previous history entry to not be saved. Basically, do not save duplicates of the same command run twice (or more times) in sucession.

```
# Do not store a duplicate of the last entered command
HISTCONTROL=ignoredups
```

## BASH Configuration Overview

There are three configuration methods to enhance BASH history:

- Execute the commands at the prompt of the logged in user
- Enter the commands in a user's `.bashrc` file
- Enter the commands in the system-wide `.bashrc` file

The first option is to execute the specified commands can be executed directly in a shell. However, this approach will only set the configuration until the BASH session is exited. So, if you exit an SSH session, or logout, the configuration would be lost. 

The second option is to enter the commands into the `.bashrc` file of a specific user. This file present in the home directory of each user on the Linux system. For example, when logged in as `nickfury`, the file will be located at `~/.bashrc` or usually `/home/nickfury/.bashrc`, depending on the type of Linux OS installed.

The third option is to enter the commands into the `/etc/bash.bashrc` file. This is the system-wide file for BASH configuration. This file is a shell script that BASH runs whenever it is started interactively. Therefore, it is run every time a BASH session is created, or whenever a SSH or TTY BASH session is started. 

## A BASH Script to Configure Enhanced BASH History

The full script I use for configuring BASH history is provided below for reference. This script applies all the configuration discussed above into the system-wide `/etc/bash.bashrc` file, so that the configuration is enabled for all users.

I have performed testing on this configuration on an Ubuntu Linux 16.04.4 server system. I performed a variety of tests including accessing the VM from Virtual Machine Remote Console (VMRC), the normal Remote Console in a web browser, and through SSH using PuTTY and SSH client on an Ubuntu Desktop system. Everything ran smoothly, and I could see the history command, and `.bash_history` file updating for a variety of users. 

```
echo ">>> Starting"
echo ">>> Loading configuration into /etc/bash.bashrc"

echo "HISTTIMEFORMAT='%F %T '" >> /etc/bash.bashrc
echo 'HISTFILESIZE=-1' >> /etc/bash.bashrc
echo 'HISTSIZE=-1' >> /etc/bash.bashrc
echo 'HISTCONTROL=ignoredups' >> /etc/bash.bashrc

# Custom history configuration
echo '# Configure BASH to append (rather than overwrite the history):' >> /etc/bash.bashrc
echo 'shopt -s histappend' >> /etc/bash.bashrc

echo '# Attempt to save all lines of a multiple-line command in the same entry' >> /etc/bash.bashrc
echo 'shopt -s cmdhist' >> /etc/bash.bashrc

echo '# After each command, append to the history file and reread it' >> /etc/bash.bashrc
echo 'export PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND$"\n"}history -a; history -c; history -r"' >> /etc/bash.bashrc

# Reload BASH for settings to take effect
echo ">>> Reloading BASH"
exec "$BASH"

echo ">>> Finished. Exiting."
```

I have made a GitHub gist with the resultant script called [better_history.sh](https://gist.github.com/thomaslaurenson/ae72d4b4ec683f5a1850d42338a9a4ab). This can be downloaded and run as the root user. An example of how to execute the script is provided below (for an Ubuntu system):

```
sudo su
chmod u+x better_history.sh # permission to execute, if required
./better_history.sh
exit
```

Finally, below is a small snippet of the expected output from the improved BASH history configuration.

```
    1  2018-05-17 19:24:05 vim .bash_history
    2  2018-05-17 19:25:26 clear
    3  2018-05-17 19:25:50 vim validate_numbers.cpp
    4  2018-05-17 19:26:05 g++ validate_numbers.cpp -o validate_numbers
    5  2018-05-17 19:26:10 chmod u+x validate_numbers
    6  2018-05-17 19:26:12 ./validate_numbers
    7  2018-05-17 19:51:31 sudo poweroff
```

Establishing a better BASH history configuration has made my life a lot easier. The script provided in this article is executed on every Linux system I use at work and in personal life to improve general well-being! 
