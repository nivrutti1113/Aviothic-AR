import vtkPolyData from '@kitware/vtk.js/Common/DataModel/PolyData';

export class MeshExporter {
  /**
   * Helper to parse points and faces from a vtkPolyData object
   */
  private static parsePolyData(polyData: vtkPolyData): {
    points: [number, number, number][];
    faces: [number, number, number][];
  } {
    const points: [number, number, number][] = [];
    const faces: [number, number, number][] = [];

    const ptsData = polyData.getPoints()?.getData();
    const polysData = polyData.getPolys()?.getData();

    if (!ptsData || !polysData) {
      return { points, faces };
    }

    // Read points
    for (let i = 0; i < ptsData.length; i += 3) {
      points.push([ptsData[i], ptsData[i + 1], ptsData[i + 2]]);
    }

    // Read cell polygons (usually triangles from marching cubes, e.g. [3, id0, id1, id2])
    let i = 0;
    while (i < polysData.length) {
      const numPoints = polysData[i];
      if (numPoints === 3) {
        faces.push([polysData[i + 1], polysData[i + 2], polysData[i + 3]]);
      } else if (numPoints > 3) {
        // Simple fan triangulation for n-gons
        const base = polysData[i + 1];
        for (let j = 2; j < numPoints; j++) {
          faces.push([base, polysData[i + j], polysData[i + j + 1]]);
        }
      }
      i += numPoints + 1;
    }

    return { points, faces };
  }

  /**
   * Helper to calculate a flat normal vector for a triangle face
   */
  private static calculateFaceNormal(
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ): [number, number, number] {
    const u = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
    const v = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];

    const nx = u[1] * v[2] - u[2] * v[1];
    const ny = u[2] * v[0] - u[0] * v[2];
    const nz = u[0] * v[1] - u[1] * v[0];

    const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1.0;
    return [nx / len, ny / len, nz / len];
  }

  /**
   * Export vtkPolyData to ASCII STL format
   */
  public static exportToSTL(polyData: vtkPolyData): string {
    const { points, faces } = this.parsePolyData(polyData);
    let output = 'solid vtk_marching_cubes_mesh\n';

    faces.forEach(([i0, i1, i2]) => {
      const p1 = points[i0];
      const p2 = points[i1];
      const p3 = points[i2];
      const normal = this.calculateFaceNormal(p1, p2, p3);

      output += `  facet normal ${normal[0].toFixed(6)} ${normal[1].toFixed(6)} ${normal[2].toFixed(6)}\n`;
      output += '    outer loop\n';
      output += `      vertex ${p1[0].toFixed(6)} ${p1[1].toFixed(6)} ${p1[2].toFixed(6)}\n`;
      output += `      vertex ${p2[0].toFixed(6)} ${p2[1].toFixed(6)} ${p2[2].toFixed(6)}\n`;
      output += `      vertex ${p3[0].toFixed(6)} ${p3[1].toFixed(6)} ${p3[2].toFixed(6)}\n`;
      output += '    endloop\n';
      output += '  endfacet\n';
    });

    output += 'endsolid vtk_marching_cubes_mesh\n';
    return output;
  }

  /**
   * Export vtkPolyData to OBJ format
   */
  public static exportToOBJ(polyData: vtkPolyData): string {
    const { points, faces } = this.parsePolyData(polyData);
    let output = '# Aviothic 3D Mesh OBJ Export\n';

    points.forEach(([x, y, z]) => {
      output += `v ${x.toFixed(6)} ${y.toFixed(6)} ${z.toFixed(6)}\n`;
    });

    faces.forEach(([i0, i1, i2]) => {
      // OBJ indices are 1-based
      output += `f ${i0 + 1} ${i1 + 1} ${i2 + 1}\n`;
    });

    return output;
  }

  /**
   * Export vtkPolyData to PLY format (ASCII)
   */
  public static exportToPLY(polyData: vtkPolyData): string {
    const { points, faces } = this.parsePolyData(polyData);

    let output = 'ply\n';
    output += 'format ascii 1.0\n';
    output += `element vertex ${points.length}\n`;
    output += 'property float x\n';
    output += 'property float y\n';
    output += 'property float z\n';
    output += `element face ${faces.length}\n`;
    output += 'property list uchar int vertex_indices\n';
    output += 'end_header\n';

    points.forEach(([x, y, z]) => {
      output += `${x.toFixed(6)} ${y.toFixed(6)} ${z.toFixed(6)}\n`;
    });

    faces.forEach(([i0, i1, i2]) => {
      output += `3 ${i0} ${i1} ${i2}\n`;
    });

    return output;
  }
}
export type { MeshExporter as MedicalMeshExporter };
