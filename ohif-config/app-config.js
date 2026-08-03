/**
 * AVIOTHIC 3D — OHIF Viewer White-Labeling & Data Source Configuration
 *
 * Use this configuration file with OHIF Viewer without modifying OHIF core files:
 * yarn run dev --config ../ohif-config/app-config.js
 */

window.config = {
  routerBasename: '/',
  extensions: [],
  modes: [],
  showStudyList: true,
  maxNumberOfWebWorkers: 4,
  showLoadingIndicator: true,
  showNoticeComponent: true,
  strictZSpacingForVolume: true,
  
  // White-labeling configuration (Logo, Name, Theme)
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#06b6d4',
            fontWeight: 800,
            fontSize: '18px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.5px'
          }
        },
        React.createElement(
          'svg',
          {
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2.5',
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          },
          React.createElement('polyline', { points: '22 12 18 12 15 21 9 3 6 12 2 12' })
        ),
        'AVIOTHIC 3D'
      );
    },
  },

  // Default Data Source pointing to AVIOTHIC 3D Authenticated Backend Proxy for Orthanc
  defaultDataSourceName: 'dicomweb',
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'AVIOTHIC Orthanc PACS Proxy',
        // Proxied via AVIOTHIC FastAPI backend (attaches session auth & Orthanc Basic Auth)
        qidoRoot: '/api/orthanc-proxy/dicom-web',
        wadoRoot: '/api/orthanc-proxy/dicom-web',
        wadoUriRoot: '/api/orthanc-proxy/dicom-web',
        qidoSupportsIncludeField: false,
        supportsReject: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoading: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: false,
        singlepart: 'bulkdata,video',
        acceptHeader: ['multipart/related; type=application/octet-stream'],
      },
    },
  ],
};
