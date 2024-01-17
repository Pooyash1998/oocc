# User Manual Mirror

[TOC]


# Introduction

MIRROR (Module for Inspecting, Reporting, and Rendering Object Relationships) is a React/Django-based web application designed for data analysis and visualization. It allows users to upload data in XML, XMLOCEL, and Sqlite formats, and focuses on graphically representing object relationships contained within this data. The tool is aimed at providing an intuitive platform for users to understand complex data interactions through visual graphs. This user manual will guide you through the functionalities of MIRROR, from data upload to graph interpretation, offering a clear understanding of how to use the application for data analysis.


# Getting Started


## Dependencies


### Django Dependencies:



1. graphviz: A package for creating and rendering graph descriptions, used for visualizing data structures.
2. lxml: A Python library for processing XML and HTML, offering extensive parsing and formatting capabilities.
3. pandas: An open-source data analysis and manipulation tool, built on top of Python's numpy library.
4. setuptools: A collection of enhancements to the Python distutils for managing and deploying Python packages.
5. tqdm: A fast, extensible progress bar for Python and CLI, used to provide feedback on application processes.


### React Dependencies:



1. mui/material, mui/icons-material, mui/styled-engine-sc: `Material-UI` components and icons for React, offering a wide range of UI elements with a consistent design language.
2. d3, d3-tip: `D3.js` is a JavaScript library for visualizing data using web standards. D3-tip is an extension for tooltips.
3. `eslint` and related plugins: Tools for identifying and reporting on patterns found in ECMAScript/JavaScript code, helping developers to write cleaner code.
4. react, react-dom, react-scripts: Core React libraries. `react` is the main library, `react-dom` is for DOM manipulation, and `react-scripts` includes scripts and configuration for a React app.
5. styled-components: Allows the use of component-level styles in React applications.
6. `typescript`: A superset of JavaScript that adds static types, used for enhancing code quality and maintainability.
7. `chart.js`: A simple yet flexible JavaScript charting library for designers and developers. It allows the creation of various types of charts, such as line charts, bar charts, and pie charts, to visualize metrics effectively.
8. `web-vitals`: A library for measuring performance metrics of web pages.


## Installation Guide


### Prerequisites



* Ensure Python is installed on your system. Python 3.6 or higher is recommended.
* Have pip (Python package manager) installed for managing Python packages.


### Steps:



1. Clone the Repository: if you don't have the project files locally, clone it to your local machine.

    ```
    git clone https://github.com/pooya_sh1998/oocc.git
    cd oocc
    ```

2. Set Up Docker Environment:
* Use Docker Compose to build and run the containers defined in `docker-compose.yml` file.

	`docker-compose up --build`


# UI Overview

The user interface (UI) of `MIRROR` is designed with simplicity and functionality in mind, facilitating a user-friendly experience for analyzing object relationships within data files.

Upon launching the application, users are greeted with a minimalistic dashboard. The main feature is the "`Import File"` button prominently displayed, which, when clicked, reveals a modal window allowing for file uploads. The supported file formats —XML, XMLOCEL, and SQLite — are clearly indicated, ensuring users know which file types are compatible with MIRROR.

For file uploading, the application provides a drag-and-drop area, as well as a `"Browse"` button for manual file selection. After a file is selected or dropped into the area, the `"Upload"` button becomes active for users to initiate the file import process.

The main dashboard also allows users to toggle between `"Explicit Relationships"` and `"Implicit Relationships,"` suggesting that MIRROR can differentiate and display these two types of relationships within the visualized data. Additionally, a search bar is provided, giving users the capability to quickly locate specific elements or relationships within the dataset.

After the data file is uploaded and processed, the central area of the dashboard presents a graph visualization of the object relationships. This graphical representation is interactive, enabling users to explore the data through various nodes and connections, which are color-coded for better distinction and understanding of the data's structure and relationships.

Overall, the MIRROR UI emphasizes a clear and intuitive approach to complex data analysis, allowing for efficient data upload, easy toggling between relationship types, quick searches, and interactive graph exploration.


# Advanced Features


### File Import Compatibility

MIRROR supports various data formats, including, `Xmlocel`, `Xml` and `Sqlite`, accommodating a broad range of data structures. This feature ensures that users can import data from different sources and standards for analysis.


### Drag-and-Drop Upload Interface

The intuitive drag-and-drop interface simplifies the file import process. Users can either drag files into the designated area or use the 'Browse' button to select files from their system, making the upload process seamless and user-friendly.


### Explicit and Implicit Relationship Toggles

The UI includes toggles for viewing either 'Explicit Relationships' or 'Implicit Relationships.' This feature allows users to switch between two modes of data interpretation, enabling a comprehensive analysis of all possible connections within their data.


### Dynamic Graph Coloring Switch

MIRROR introduces a dynamic graph coloring switch. When toggled on, this feature colors nodes according to their object type, with each type assigned a random unique color. This provides users with an additional visual layer to distinguish between different object types in the graph. By default, this feature is set to off, meaning nodes use a color palette for better visibility without representing any specific meaning.


### Object Type Filtering

A dynamic filtering area is integrated into the Sidebar, providing users the ability to filter specific object types quickly by just checking the desired box and updating the Graph. This is particularly useful when dealing with large datasets, where finding individual elements could otherwise be challenging.


### Interactive Graph Visualization

Once the data is uploaded, MIRROR renders an interactive graph that visually represents object relationships. Users can interact with this graph, clicking on nodes to see details or dragging elements to reorganize and better understand the connections, which are color-coded for clarity.


### Graphical Representation of Data Structures

The color-coded nodes and connectors in the graph provide a visual differentiation of various data elements and their relationships. This visual distinction helps in quickly identifying patterns, outliers, or clusters within the data.


### Metrics Calculation

The metrics pie chart in the sidebar provides information about `precision` and `recall` of the analyzed eventlog and helps to quantitatively assess its conformance.


### Stats Report

With the `"Get Report"`- button the user can download a report in .txt format, with a number of statistics about the displayed graph and the object centric eventlog it is based on. The report includes information such as the number of events, process executions, variants and activities in the event log, and the number of the implicit and explicit nodes and edges of the graph such as the precision and recall metrics.


### Graph Save

With the `"Save Graph"`- button the user can save the graph currently displayed in the form of a .svg file for later use.


# Example Run

This section provides a step-by-step walkthrough of an example run in the MIRROR application, illustrating how to upload a file and view the rendered object relationship graph. Follow these steps to understand how to effectively use MIRROR for your data analysis needs.


### File Upload



* Navigate to the MIRROR dashboard.
* Click on the `"Import File"` button to open the file upload modal.
* Use the drag-and-drop feature or click `"Browse"` to select your data file from your computer.


![alt_text](images/image1.png "image_tooltip")


* Ensure the file is in one of the supported formats: XML, XMLOCEL, or SQLite.
* Once the file is selected, click on `"UPLOAD"` to proceed.


### Viewing the Graph



* Following a successful upload and processing, the application will display a progress bar. Once the processing is complete, users will be presented with an interactive graph representing the object relationships derived from the  uploaded object centric eventlog file.


![alt_text](images/image2.png "image_tooltip")


* You can interact with the graph by hovering on nodes or edges to view details about the specific object or relationship that is displayed, or by dragging nodes to reorganize the view.


![drawing](https://docs.google.com/drawings/d/12345/export/png)


![drawing](https://docs.google.com/drawings/d/12345/export/png)


### Customizing the Graph



* After uploading the sidebar can be opened by clicking on the hamburger icon on the left side of the header. Inside the sidebar various tools can be found to further customize and analyze the graph.
* In the top part of the sidebar are 2 toggles to enable or disable the view of implicit and explicit relationships for an easier analysis for the different relationship types found in the event logs.


![alt_text](images/image3.png "image_tooltip")


* Below there is another toggle `"Coloring based on Object Type"` that colors all nodes based on the object type in the event logs, to make it easier to see what object types are connected to each other.


![alt_text](images/image4.png "image_tooltip")
 


### Using the Search Function ( $remove and update ot_checkbox)



* Utilize the search bar to find specific elements within your data.
* Enter the object ID you wanna look up and click “SEARCH” to locate the data point within the graph.



<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")


$ add metrics, zooming and panning (btn and touch gestures) , saving graph and report


### Interpreting Results ($add logic for metrics) + Use case



* Analyze the graph to interpret the object relationships. The color-coded nodes and edges help distinguish different types of connections and data points.
* Use the visual cues to identify patterns, anomalies, or insights relevant to your analysis.

$ names, titles, headings,font size, commands + photos, overall edit -> Convert to Markdown -> Git separate page -> release Tag 
