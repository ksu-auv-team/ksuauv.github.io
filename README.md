# KSU Underwater Vehicle Team Website
_For Website Development_

This site is built using basic HTML, CSS, and JavaScript in order to avoid frameworks. Not everyone uses frameworks so there are none here.

The website is built keeping in mind that multiple people will work on it in the future.
Therefore, the site is made to accommodate updates and changes.

## Requirements

- Basic requirements are found in ``docs/Official Website Guidelines.pdf``.
- Information for the site is at ``docs/information.md``.
  - Feel free to add your own suggestion at the bottom.
    - Add like as shown: ``Name: Suggestion``.
- The sites used for reference are the following:
  - https://bumblebee.sg/ | 2022's Website 1st place
  - https://muddsub.org/  | 2022's Website 2nd Place
  - https://www.michiganrobosub.com/ | 2022's Website 4th place

## Project Structure

- __HTML__: files are located in the  ``html`` directory.
  - Exception is ``index.html`` which is the root html file.
  - HTML documentation for subs is in ``html/sub_documentation``
- __CSS__: files go in the ``CSS`` directory.
  - All HTML files will use the ``main.css`` and ``responsiveness.css`` files for consistency.
    - ``<link rel="stylesheet" type="text/css" href="css/main.css">``
    - ``<link rel="stylesheet" type="text/css" href="css/SPECIFICSTYLINGFILE.css">``
    - ``<link rel="stylesheet" type="text/css" href="css/responsiveness.css">``
    - Ensure the CSS files are in the order shown above as CSS rules take priority based on what is newest.
  - Create another css file for specific pages if needed: *Second \<link> above*.
  - Use ``var(--color_variable_here)`` from ``base.css`` for general colors.
    - See ``base.css`` and ``main.css`` for info on which elements will automatically have a style applied.
    - ``base.css`` => General Queries (h1, p, div, span, etc...)
    - ``main.css`` => Specific classes & ids (.row, #side_nav, etc...)
- __JavaScript__: files will go in the ``JS`` directory.
  - Every HTML file must use the ``main.js`` file for access to global functions.
    - ```<script src="js/main.js"></script>```
    - Create specific JS files for html files as needed.
- __Media__: Photos, videos, sounds, icons, etc. will go in the ``media`` directory.
  - Photos for team members go in ``media/member_photos/YEAR``, 
  but to use them is in ``css/members_photo_styling``.
    - These css files can get long if adding a lot of members.
- __Docs__: Documentation, indexes, files and research will go in the ``docs`` directory.
  - Documentation
    - Leads to information regarding AUVs or specific subjects.
    - Refers to pdf, word, etc. files that would be downloaded or served instead of viewed on a html file.
    - ``documentation_index.json``
      - "title" => title of the document
      - "date_published" => YEAR-MONTH-DAY ... 0000-00-00
      - "documentation_url" => determines link url
        - Note this url is dependent on where the HTML file is located at.
      - "photo_url" => determines photo to fetch
        - Note this url is dependent on where the HTML file is located at.
      - "photo_alt_description" => text to appear should the photo not be found or fail to load
      - "summary" => summary for document
      - "tags" => Array of tags that can be used to filter
        - __Options__: \["auv", "research", "individual_research", "team_research"]
        - Update tags array in ``html/documentation.html`` after ``Line 52`` (Filter Checkboxes)  
        if needed and then in the line above
          - Create a new checkbox to add a new filter
        - __TAGS ARE CASE SENSITIVE__
  - Research
    - Leads to research conducted and performed by the KSU AUV team.
    - Refers to pdf, word, etc. files that would be downloaded or served instead of viewed on a html file.
  - __Indexes__:
    - Refers to a library of objects for easy searching and information injection.
    - Requires JavaScript to fetch the index and display them on the webpage.
- __Extracted Content__
  - Holds text content from HTML files.
  - Used to update ``index.json`` for website search function.
  - ``index.json``
    - "title" => determines the title of the search result
    - "url" => determines the link url. 
      - Note this url is dependent on where the HTML file is located at.
    - "content" => pure text from HTML files from extracted content .txt files

## DO NOT

- Add styles to elements in ``base.css`` or ``main.css``.
  - Unless you plan to change that element across the whole website, do not change anything here.

## Contact

- Sergio | Primary | discord: Sergio SA
- Juan | Media | discord: TheSaltyJuan