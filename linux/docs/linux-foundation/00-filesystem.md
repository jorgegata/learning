# Linux Filesystem

There are different perspectives on what is the filesystem:

1. How the data is **accessed** and **stored** considering the types of data storage format (EXT4, EXT4, XFS)
2. The directory structure starting at the top (/) root directory
3. **Logical volume formatted** with a specific **type** of filesystem that can be mounted on a specific **mount point** on a Linux filesystem 

The linux filesystem are structured rules and conventions of folders, each with an specific purpose and types of files. In Unix, you usually have in the root folder

> The directories with ``T`` are considered an integral part of the filesystem, so those cannot be mounted at startup time. It must be presented at boot time in order to the system to boot properly. The rest can be mounted after boot time and does not have to be present. `/mnt` and `/media` are temporary mountpoints, so those should not contain any data. 

- [T] /: Contains all the files necesary to boot the Linux filesystem and all the other volumes. It contains required executables and libraries and the rest of filesystems are mounted on standard, well-defined mount points as subdirectories of the root filesystem

- [t] /bin: Contains user executable files

- /boot: contains static bootloader and kernel executable and configuration files required to boot a Linux computer

- [t] /dev: contains the device files for every hardware device attached to the system. These are not device drivers, but files that represent each device on the computer and facilitate access to them

- [t] /etc: local system configuration files for the host computer 

- /home: home directory storage for user files. Each user has a subdirectory in /home

- [t] /lib: contained shared library files

- /media: place to mount external removable media devices such as USB

- /mnt: temporary mountpoint for regular filesystems that can be used while admin is repairing or working on a filesystem

- /opt: optional files such as vendor supplied application

- [t] /root: home directory for the root user

- [t] /sbin: system binary files

- /tmp: temporary files here

- /var: variable files here

- /usr: shareable, read-only files, including executable binaries, libraries, and other types of documentation.

## Linux unified directory structure

> In some non-linux, each hard drive has its own separate and complete directory tree

In some non-linux operating system, for each hard drive or multiple partitions, a letter is assigned to know on which hard drive an specific file or program is located, such as `C:` or `D:`

> In linux, there is only one single directory root starting at the top. All directories and sub-directories are located from there, with only one location to search for files or programs.

Extra filesystems (with /home, /var, /tmp...) can be mounted on a specific point as part of the root filesystem tree. Even removable drives such as a USB thum drive or an external ``USB`` or `ESATA` hard drive will be mounted in this unified tree directory.

> There is a difference between being a filesystem and a subdirectory of the root filesystem. 