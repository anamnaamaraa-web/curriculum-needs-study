$ErrorActionPreference = "Stop"

$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$NodeExe = "C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$Port = 4173

if (-not (Test-Path -LiteralPath $NodeExe)) {
  $NodeExe = "node.exe"
}

function Test-LocalPortOpen {
  param([int]$PortToCheck)

  $client = $null
  try {
    $client = [System.Net.Sockets.TcpClient]::new()
    $async = $client.BeginConnect("127.0.0.1", $PortToCheck, $null, $null)
    $connected = $async.AsyncWaitHandle.WaitOne(500, $false)

    if ($connected -and $client.Connected) {
      $client.EndConnect($async)
      return $true
    }

    return $false
  } catch {
    return $false
  } finally {
    if ($client) {
      $client.Close()
    }
  }
}

function Get-LanIpAddress {
  try {
    $addresses = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction Stop |
      Where-Object {
        $_.IPAddress -notlike "127.*" -and
        $_.IPAddress -notlike "169.254.*" -and
        $_.PrefixOrigin -ne "WellKnown"
      } |
      Sort-Object -Property InterfaceMetric, PrefixLength |
      Select-Object -ExpandProperty IPAddress

    if ($addresses) {
      return $addresses[0]
    }
  } catch {
  }

  try {
    $hostEntry = [System.Net.Dns]::GetHostEntry([System.Net.Dns]::GetHostName())
    $address = $hostEntry.AddressList |
      Where-Object {
        $_.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and
        $_.ToString() -notlike "127.*" -and
        $_.ToString() -notlike "169.254.*"
      } |
      Select-Object -First 1

    if ($address) {
      return $address.ToString()
    }
  } catch {
  }

  return $null
}

function Write-SiteLinks {
  param([int]$PortToShow)

  $lanIp = Get-LanIpAddress
  Write-Host "Local link: http://127.0.0.1:$PortToShow/"

  if ($lanIp) {
    Write-Host "LAN/shared link: http://$lanIp`:$PortToShow/"
    Write-Host "Share the LAN link only with users on the same Wi-Fi or office network."
  } else {
    Write-Host "LAN/shared link: could not detect this computer's IPv4 address."
  }
}

if (Test-LocalPortOpen -PortToCheck $Port) {
  Write-Host "Curriculum needs study site is already running."
  Write-SiteLinks -PortToShow $Port
  exit 0
}

$LogDir = Join-Path $ProjectDir "logs"
New-Item -ItemType Directory -Path $LogDir -Force | Out-Null

$StdOutLog = Join-Path $LogDir "site-server.log"
$StdErrLog = Join-Path $LogDir "site-server-error.log"

"$(Get-Date -Format s) Starting site with $NodeExe" | Out-File -FilePath $StdOutLog -Append -Encoding utf8

$processInfo = [System.Diagnostics.ProcessStartInfo]::new()
$processInfo.FileName = $NodeExe
$processInfo.Arguments = "server.mjs"
$processInfo.WorkingDirectory = $ProjectDir
$processInfo.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden
$processInfo.UseShellExecute = $true

$process = [System.Diagnostics.Process]::Start($processInfo)

if ($process -and $process.Id) {
  "$(Get-Date -Format s) Started PID $($process.Id)" | Out-File -FilePath $StdOutLog -Append -Encoding utf8
} else {
  "$(Get-Date -Format s) Failed to start process" | Out-File -FilePath $StdErrLog -Append -Encoding utf8
}

Start-Sleep -Seconds 2

if (Test-LocalPortOpen -PortToCheck $Port) {
  Write-Host "Curriculum needs study site started."
  Write-SiteLinks -PortToShow $Port
  exit 0
}

Write-Error "Site did not start. See logs: $StdOutLog and $StdErrLog"
exit 1
