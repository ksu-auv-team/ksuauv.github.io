# KSU Underwater Vehicle Team Website
_For Website Development_

This site is built using basic HTML, CSS, and JavaScript in order to avoid frameworks. Not everyone uses frameworks so there are none here.

## Project Structure

- HTML files are located in the  ``html`` directory.
  - Exception is ``index.html`` which is the root html file.
- All CSS files go in the ``CSS`` directory.
  - All HTML files will use the ``main.css`` file for consistency.
    - ``<link rel="stylesheet" type="text/css" href="css/main.css">``
  - Create another css file for specific pages if needed
  - Use ``var(--color_variable_here)`` from ``base.css`` for general colors.
    - See ``base.css`` for info on which elements will automatically have a style applied.
- All JavaScript files will go in the ``JS`` directory.
- Any photos, videos, sounds, icons, etc. will go in the ``media`` directory.
- Any documentation, indexes, files and research will go in the ``docs`` directory.

## Requirements

- Basic requirements are found in ``Official Website Guidelines.pdf``.
- Information for the site is at ``information.md``.
  - Feel free to add your own suggestion at the bottom.
    - Add like this ``Name: Suggestion``.
- The sites used for reference are the following:
  - https://bumblebee.sg/ | 2022's Website 1st place
  - https://muddsub.org/  | 2022's Website 2nd Place
  - https://www.michiganrobosub.com/ | 2022's Website 4th place

## DO NOT

- Add styles to elements listed in ``base.css`` within html or other css files.
  - Unless you plan to change that element across the whole website, do not change anything here.

## Contact

- Sergio | Primary | discord: Sergio SA
- Juan | Media | discord: TheSaltyJuan