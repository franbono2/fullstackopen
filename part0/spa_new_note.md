```mermaid
sequenceDiagram;
    sequenceDiagram;
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa/notes
    Note right of browser: { "content": "HTML is easy", "date": "2023-1-1" }
    server-->>browser: 201 created
    Note right of browser: browser exec the event handler that render the note
```