$ErrorActionPreference = "Stop"

$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$escapedProjectDir = $ProjectDir.Replace("\", "\\")

$processes = Get-CimInstance Win32_Process |
  Where-Object {
    $_.CommandLine -and
    $_.CommandLine -match "server\.mjs" -and
    $_.CommandLine -match [regex]::Escape($ProjectDir)
  }

if (-not $processes) {
  Write-Host "No curriculum needs study site process is running."
  exit 0
}

foreach ($process in $processes) {
  Stop-Process -Id $process.ProcessId -Force
  Write-Host "Stopped site process PID $($process.ProcessId)."
}
