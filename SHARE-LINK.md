# Share the site with other users

## 1. Same computer

Open:

```text
http://127.0.0.1:4173/
```

This address works only on the computer where the site is running.

## 2. Same Wi-Fi or office network

Start the site:

```powershell
.\start-site.ps1
```

The script prints two links:

```text
Local link: http://127.0.0.1:4173/
LAN/shared link: http://192.168.x.x:4173/
```

Send the `LAN/shared link` to users who are connected to the same Wi-Fi or office network.

## 3. If the LAN link does not open

Allow inbound TCP traffic for port `4173` in Windows Firewall.

PowerShell command for an administrator:

```powershell
New-NetFirewallRule -DisplayName "Curriculum Needs Study 4173" -Direction Inbound -LocalPort 4173 -Protocol TCP -Action Allow
```

## 4. Public internet access

Users outside the local network cannot open `127.0.0.1` or `192.168.x.x` links.
For public access, deploy the site to a hosting service, use a VPN, reverse proxy, or a secure tunnel.
