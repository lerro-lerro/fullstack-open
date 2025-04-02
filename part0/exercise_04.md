sequenceDiagram
    participant Browser
    participant Server

    Browser->>Browser: User types new note and clicks "Save"
    Browser->>Server: POST /new_note (with note data)
    activate Server
    Server-->>Browser: 302 Redirect to /notes
    deactivate Server
    Browser->>Server: GET /notes
    activate Server
    Server-->>Browser: HTML page with updated notes list
    deactivate Server
