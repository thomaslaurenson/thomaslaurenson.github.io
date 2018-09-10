---
layout: post
title: "Back To The Future - How to Undo Git Commits and Pushes"
tags:
- Git
thumbnail_path: blog/thumbs/git.png
---

I am exceptionally pedantic about my git commits. However, since I started using git locally, I have become much more relaxed. I put on my headphones, blast some Metallica, get in the zone, and git commit like a mad person! It is a great place to be. Furiously coding and committing at an important juncture. However, this has lead me into bad habits. Reckless is a better word for it. I generally commit with a descriptive message, and push at logical times... but have gotten less precise lately. I have so many accounts and repositories I contribute to that I sometimes enter in the wrong credentials. I have a GitHub account, a GitLab account, and another GitLab account which is for code hosted at my work-place. It gets confusing. And I refuse to use any credential managers (I can hear people screaming in agony at that comment!). Again, this leads to commits that need to be.... _taken 'a back_.

I was asking myself this question: how can I recover from an accidental `git commit` or `git push`? Which is basically summarised as: how to undo commits or pushes in git? After reading a few forum posts, riding the waves of stack overflow answers... I started to get it. I then performed a revert from a git push to my GitHub. The knowledge of how to do it was never achieved, mainly because I barely used this feature. Every time a 

This post will discuss how to undo unfortunate git commits... as well as git pushes. Hopefully, this post is useful to others as it was for me to document.

## Quickstart

If you want a quick answer, here are the following commands to undo a `git commit`: 

- Undo last commit and do not remove the changes:
    - `git reset --soft HEAD~1`
- Undo last commit and remove the changes (from disk):
    - `git reset --hard HEAD~1`
- Undo a specific commit and do not remove the changes:
    - `git reset --soft <commit-object-name>`
- Undo a specific commit and remove the changes (from disk):
    - `git reset --hard <commit-object-name>`

Once you have fixed the _git index_ you can now fix the GitHub repository. Only one command is needed, and it is irrelevant which method you used to undo the original commit:

- `git push origin master --force`

If you want further information on what these commands are actually doing... keep reading!

## How to Undo in Git

In the world of git (as used by GitHub) undoing something can be achieved using the following command:

1. `git reset`

It should be noted that there are other command arguments that sound like they could be useful. For example, the `revert` argument will move a git repository to a specific commit, but it will keep all existing commits. Technically, **this is not undoing** the commit history. 

## Example Scenario

The examples in this post use a simple git repository scenario. There ia a git repository that contains four files: 

1. `task1.py` with the commit message: _First commit: task1.py_
2. `task2.py` with the commit message: _Second commit: task2.py_
3. `task3.py` with the commit message: _Third commit: task3.py_
4. `task4.py` with the commit message: _Fourth commit: task4.py_
 
Using the `git log` command, we can see the following commit history:

```
$ git log --oneline
6f81b42 (HEAD -> master) Fourth commit: task4.py
385c1d1 Third commit: task3.py
25a73a4 Second commit: task2.py
b9fba9e First commit: task1.py
```

The output from the `git log` command is a summary of what has been committed. Each line has the following details:

1. The commit object name (e.g., `6f81b42` and `385c1d1`). This value is actually 40 characters in length, however, the `git log --oneline` command only displays a partial prefix. We can still use this partial object name and do not require the complete name.
2. The commit message (e.g., _Fourth commit: task4.py_ and _Third commit: task3.py_)

Please note the the list displayed by the `git log` command is from _most recent_ commit, to the _oldest commit_. 

## Undoing the Last Commit

We have not discussed this so far, but a git commit is greatly different from a git commit followed by a git push. If you have not _pushed_ the repository yet (say to GitHub) this is the method to use to undo the last commit you made. The basic command to undo the last commit is:

```
git reset HEAD~1
```

The above command is only relevant for undoing the most recent commit. This is very similar to pressing the _Undo_ button in Microsoft Word once. The option `HEAD~1` refers to the parent of the most recent commit. In the scenario example, we can see that the repository `HEAD` is the commit with the object name: `6f81b42` and the commit message: _Fourth commit: task4.py_. Basically, `HEAD~1` moves the `HEAD` value up one, in this case to the third commit.

#### Undo last commit and do not remove the changes

```
git reset --soft HEAD~1
```

The `--soft` option does not remove the changes made. For example, when using `--soft`, the file `task4.py` is not removed from the disk (the file is not deleted), it is just removed from the _git index_.

#### Undo last commit and remove the changes

```
git reset --hard HEAD~1
```

The `--hard` option removes the changes made. For example, when using `--hard`, the file `task4.py` is deleted from the disk (the file is deleted) and from the _git index_.

## Undoing a Specific Commit 

In the last section, we covered how to undo, or remove, the last commit made. In this section, we discuss how to undo a specific commit. You can use a very similar syntax, however, you need to replace `HEAD~1` with a specific object name. The basic command to undo a specific commit is:

```
git reset <commit-object-name>
```

For example:

```
git reset 385c1d1
```

As previously discussed, the method to retrieve the commit history and the _commit object name_ is to use the `git log` command. Specifically, the `--oneline` argument provides an excellent method to display all git commits is a simple and easy to navigate view, as illustrated in the code snippet below:

```
$ git log --oneline
6f81b42 (HEAD -> master) Fourth commit: task4.py
385c1d1 Third commit: task3.py
25a73a4 Second commit: task2.py
b9fba9e First commit: task1.py
```

The following examples rely on finding the specific _commit object name_ to use as input to the `git reset` command. However, `git log` is not the only method to determine this value. You can also see the full _commit object name_ in you GitHub repository on the web interface - but, in my opinion, this is a more complex method.

#### Undo a specific commit and do not remove the changes

```
git reset --soft <commit-object-name>
```

For example:

```
git reset --soft 385c1d1
```

This command resets a git repository back to the specific commit object name of `385c1d1`. Similar to the example above, the `--soft` option does not remove the changes made. For example, when using `--soft`, the file `task4.py` is not removed from the disk (the file is not deleted), it is just removed from the _git index_.

#### Undo a specific commit and remove the changes

```
git reset --hard <commit-object-name>
```

For example:

```
git reset --hard 385c1d1
```

This command resets a git repository back to the specific commit object name of `385c1d1`. Similar to the example above, the `--hard` option removes the changes made. For example, when using `--hard`, the file `task4.py` is deleted from the disk (the file is deleted) and from the _git index_.

## How to Undo a Git Push

Once a `git reset` has been performed, it is relatively straightforward to undo a `git push`. Basically, GitHub will read the git index and display the information. Since we have already fixed (undone) the git index, we simply need to push the git repository again. This can be achieved using:

```
git push origin master --force
```

The `--force` argument will delete previous commits and push the current local git repository.

### Words of Caution

Please be aware that some of these techniques specified in this post to _undo git commits and pushes_ are bad practices for public git repositories... especially when working with multiple developers. Basically, it is bad practice to `force` a push on a public git repository, and you should use `revert` instead. Maybe I have been a solo developer for too long!

## Conclusion

Git is a difficult tool to master. Unfortunately, the best method to understand how it operates is to have a thorough understanding of how the staging, indexing and the remote repository work in conjunction. A fellow work colleague gave me some great advice to learning git. I told her that I had read all these articles and watched videos about how to use git correctly. She said, _"why don't you just create a throw-away repository, and actually try it"_. It was amazing advice, and how I actually learnt git.
