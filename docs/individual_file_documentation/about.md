# Documentation for about.(html,css,js)

The about page contains information regarding the KSU AUV Team's history, current plans, and future plans.

General descriptions regarding the KSU AUV Team and Robosub are provided.

## HTML

- ``<body/>``
  - Side Nav ``<iframe/>``
  - Hero wrapper
    - Background Image, Title, Short Message
  - ``<section/>``
    - Upper offset Row (3 boxes)
      - 3 Info Boxes ``.info_box``
    - Spacer between info boxes and main content
    - ``#general_information``
      - Title and Information
  - ``<section/>`` colored with theme to set apart
    - ``.section_content`` as a row
    - Content (title, text) and image

## CSS

- Define section size and child behavior
- ``.hero`` position and image
- Info Box definition
  - InfoBox left and right have an offset background for ``::before`` and ``::after``
  - ``#general_information`` defines width and content flow

## JavaScript

No JavaScript used for this page