# Installing Google Cloud SDK on Windows

## Method 1: Using the Installer (Recommended)

1. **Download the Google Cloud SDK Installer**
   - Visit: https://cloud.google.com/sdk/docs/install-sdk#windows
   - Download the installer for Windows

2. **Run the Installer**
   - Run the downloaded `.exe` file
   - Follow the installation wizard
   - The installer will add `gcloud` to your PATH automatically

3. **Restart PowerShell**
   - Close and reopen PowerShell/Command Prompt after installation

4. **Verify Installation**
   ```powershell
   gcloud --version
   ```

## Method 2: Using Chocolatey (If you have it)

```powershell
choco install gcloudsdk
```

## Method 3: Manual Installation

1. **Download the ZIP file**
   - Visit: https://cloud.google.com/sdk/docs/install-sdk#windows
   - Download the ZIP archive

2. **Extract to a folder**
   - Extract to `C:\Program Files (x86)\Google\Cloud SDK\`

3. **Run the install script**
   ```powershell
   cd "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk"
   .\install.bat
   ```

4. **Add to PATH manually** (if needed)
   - Add `C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin` to your system PATH

## After Installation

1. **Restart PowerShell**
   - Close and reopen your terminal

2. **Initialize gcloud**
   ```powershell
   gcloud init
   ```

3. **Login**
   ```powershell
   gcloud auth login
   ```

4. **Set your project**
   ```powershell
   gcloud config set project YOUR_PROJECT_ID
   ```

## Quick Test

```powershell
gcloud --version
```

If this works, you're ready to deploy!

