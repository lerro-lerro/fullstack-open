sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /spa
    activate Server
    Server-->>Browser: HTML page with SPA layout
    deactivate Server
    Browser->>Server: GET /main.css
    Browser->>Server: GET /spa.js
    Browser->>Server: GET /data.json
    activate Server
    Server-->>Browser: JSON data with notes
    deactivate Server
    Browser->>Browser: Render notes dynamically on the page
