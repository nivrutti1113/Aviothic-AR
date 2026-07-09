# Web-Based 3D DICOM Slice Viewer (Brain + Breast)

An interactive, clinical-grade 3D medical image visualization and pre-surgical planning dashboard. Built with a React + TypeScript frontend utilizing `@kitware/vtk.js` for GPU-accelerated volume rendering and multi-planar reconstruction (MPR), and a FastAPI backend with `pydicom` for de-identification and 3D volume reconstruction.

---

## Technical Architecture Overview

*   **Frontend:** React (Vite) + TypeScript + Vanilla CSS + `@kitware/vtk.js`.
*   **Backend:** Python FastAPI + SQLite (SQLAlchemy) + `pydicom` + `numpy`.
*   **Pipeline Optimizations:** Heavy ZIP datasets are extracted, parsed, spatially sorted, and reconstructed on the backend into a contiguous, high-performance binary voxel file (`volume.bin`) along with a manifest (`volume.json`). This reduces network download sizes by up to 90% and enables instant client-side rendering.
*   **Legal Position:** Marketed and contracted as a "visualization and pre-surgical planning aid" rather than a primary diagnostic device.

---

## Local Setup & Execution Guide

### Prerequisites
*   Node.js (v18+)
*   Python (3.10+)

---

### Step 1: Install Dependencies

#### 1. Backend Setup
Open a terminal in the project root directory and run:
```bash
# Navigate to backend and install requirements
pip install -r backend/requirements.txt
```

#### 2. Frontend Setup
Open another terminal in the project root directory and run:
```bash
# Navigate to frontend and install npm packages
cd frontend
npm install
```

---

### Step 2: Generate Synthetic Test Datasets

To allow immediate testing without requiring you to download large, sensitive patient clinical datasets, run our phantom generator script. It creates highly realistic concentric-ellipsoid Brain and Breast MRI phantoms (including anatomical layers and high-contrast tumor lesions) and packages them into ZIP archives.

Run the script from the root directory:
```bash
python scripts/generate_synthetic_cases.py
```
This generates:
*   `data/samples/brain_case.zip` (64 slices, MR modality, concentric brain matter/ventricles/tumor phantom)
*   `data/samples/breast_case.zip` (48 slices, MR modality, glandular tissue and spiculated mass phantom)

---

### Step 3: Run the Servers

#### 1. Start the FastAPI Backend
From the root directory:
```bash
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
The API is now running at `http://localhost:8000`.

#### 2. Start the Vite React Frontend
From the `frontend` directory:
```bash
npm run dev
```
The client app is now running at `http://localhost:5173`. Open this URL in your web browser.

---

## Application Walkthrough & User Guide

### 1. Clinical Authentication
*   **Security Access:** To log in, use the secure credentials:
    *   **Clinical User ID:** `radiologist` (or `surgeon`)
    *   **Password:** `clinical123`
*   **Disclaimer:** Note the regulatory warning indicating that this is a pre-surgical planning aid.

### 2. DICOM Uploading & De-identification
*   Click **"Upload Case"** on the patient sidebar directory.
*   Drag and drop the generated `data/samples/brain_case.zip` or select it.
*   Toggle the **"Automatically Strip Patient Health Information (PHI)"** checkbox to test the de-identification engine.
*   Click **"Initiate Volume Processing"**. The backend worker will parse, sort spatially using slice normal cosines, reconstruct the 3D volume, and save the binary assets. The patient list will automatically refresh and show `COMPLETED` when done.

### 3. Sync Viewports & MPR Slicing
*   Click on the patient card (e.g. `Anonymized Patient`) to load the volume.
*   The **4-Panel Grid** will display:
    1.  **Axial (Z Plane)**
    2.  **Sagittal (X Plane)**
    3.  **Coronal (Y Plane)**
    4.  **3D Volume Rendering** (using GPU-accelerated raycasting).
*   Scrub the range sliders at the bottom of the 2D viewports to slice through the volume.
*   Drag inside the 3D viewport to rotate, zoom (scroll), or pan (right-click drag) the 3D volume model.

### 4. Interactive Window/Level presets
*   Select the **Window/Level** tool in the interaction toolbox.
*   Click and drag on any 2D slice viewport:
    *   **Drag horizontally (Left/Right):** Adjusts Window Width (contrast range).
    *   **Drag vertically (Up/Down):** Adjusts Window Level (brightness offset).
*   Or click the clinical preset buttons in the sidebar:
    *   **Brain:** (W: 80, L: 40)
    *   **Bone / Skull:** (W: 2000, L: 500)
    *   **Soft Tissue:** (W: 350, L: 50)
    *   **Breast Tissue:** (W: 400, L: 50)

### 5. Physical Caliper Measurements
*   Select the **Caliper** tool in the sidebar. Slicing camera movement will lock.
*   Click on two distinct points of a tumor/lesion in any of the 2D viewports.
*   The application will convert display pixel coordinates into 3D world space using `vtkCoordinate` and compute the exact Euclidean distance in millimeters.
*   The caliper overlay is rendered dynamically as a dashed green line with measurement tags. You can add notes, save, or delete annotations.
