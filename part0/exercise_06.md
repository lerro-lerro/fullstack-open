sequenceDiagram
    participant Browser
    participant Server

    Browser->>Browser: User enters new note and clicks "Save"
    Browser->>Browser: Prevent default form submission
    Browser->>Server: AJAX POST /new_note_spa (with note JSON)
    activate Server
    Server-->>Browser: 201 Created (confirmation)
    deactivate Server
    Browser->>Browser: Append new note to the list without reloading
