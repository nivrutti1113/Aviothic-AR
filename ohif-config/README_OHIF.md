# AVIOTHIC 3D — OHIF Viewer Foundation & Orthanc Integration Guide

This guide walks through configuring and running **OHIF Viewer** white-labeled as **AVIOTHIC 3D** with **Orthanc DICOMweb PACS** behind an authenticated reverse-proxy.

---

## 1. Architecture Overview

```
AVIOTHIC 3D App Shell (React / Vite)
  │
  ├── Upload DICOM ZIP → FastAPI Backend → Orthanc DICOM Server (Port 8042 - Internal Docker Only)
  │
  └── Embed OHIF Viewer (iframe: http://localhost:3000/viewer?StudyInstanceUIDs=...)
        │
        └── Query DICOMweb via Authenticated Backend Proxy: /api/orthanc-proxy/dicom-web
              │ (Backend validates JWT & injects Orthanc Basic Auth credentials)
              ▼
        Orthanc DICOMweb Engine
```

---

## 2. Step-by-Step Setup

### Step 1: Launch Infrastructure Services (Orthanc, Backend, Redis)
```bash
docker-compose up -d --build
```
- **Orthanc PACS Server:** Running internally on `http://orthanc:8042` (with Basic Auth: `orthanc` / `aviothic_secret_pass`). Note that port `8042` is not published to the public host network for security.
- **FastAPI Backend:** Running on `http://localhost:8000`. Exposes reverse proxy at `/api/orthanc-proxy/...`.

### Step 2: Clone and Configure OHIF Viewer
```bash
git clone https://github.com/OHIF/Viewers.git
cd Viewers
yarn install
```

Copy the custom white-label configuration file `app-config.js` into OHIF:
```bash
cp ../ohif-config/app-config.js platform/app/public/config/aviothic-config.js
```

### Step 3: Run OHIF Viewer with AVIOTHIC 3D Configuration
```bash
# Run OHIF dev server pointing to the custom AVIOTHIC 3D config
APP_CONFIG=config/aviothic-config.js yarn run dev
```
- Default dev server runs on `http://localhost:3000`.

---

## 3. Security & Framing Configuration

- **Authenticated Proxy:** The frontend never connects to Orthanc directly or exposes Orthanc Basic Auth credentials to the client. All DICOMweb requests are routed through `/api/orthanc-proxy/dicom-web`, which validates the user's session JWT before forwarding.
- **Content-Security-Policy (CSP):** The backend proxy returns `Content-Security-Policy: frame-ancestors 'self' http://localhost:* http://127.0.0.1:*` to explicitly permit iframe embedding within the AVIOTHIC 3D app shell.
- **Iframe URL Format:**
  ```
  http://localhost:3000/viewer?StudyInstanceUIDs=<STUDY_INSTANCE_UID>
  ```

---

## 4. Verification

1. Upload a DICOM ZIP in AVIOTHIC 3D (`http://localhost`).
2. Verify the case card reflects `COMPLETED` (or `PARTIAL (DICOMweb failed)` if Orthanc is offline).
3. Click **OHIF Viewer** on the patient case to launch the embedded OHIF Viewer iframe.
4. Confirm OHIF displays the AVIOTHIC 3D logo, cyan branding, and loads 2D/3D series from Orthanc without CSP framing errors.
