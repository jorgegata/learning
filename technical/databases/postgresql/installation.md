# PostgreSQL installation guideline

## Word Dictionary

`systemctl`: command-line utility to control the **systemd** system in linux (start, stop, restart, status, enable, disable in linux).

`systemd`: default system and service manager in most Linux distributions.

## Linux

The prerequisites to install PostgreSQL is to be in a WSL with sudo permissions inside it.

```bash
# 1. Add PostgreSQL APT repository (link may vary)
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# 2. Update package list
sudo apt-get update

# 3. Install PostgreSQL and contrib package
sudo apt-get install postgresql

# 4. Verify installation
sudo systemctl status postgresql

# 5. Operations on the service
sudo systemctl enable postgresql
sudo systemctl disable postgresql
sudo systemctl start postgresql
sudo systemctl stop postgresql
```