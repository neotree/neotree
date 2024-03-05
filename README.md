# Neotree

[![DOI](https://zenodo.org/badge/257850569.svg)](https://zenodo.org/badge/latestdoi/257850569)

The Neotree is an open source platform for improving neonatal care in low-resource settings. 

## Overview of the Neotree

The Neotree platform provides the following functions:

* Data capture at the bedside
* Clinical diagnostic and management support
* Data linkage to local clinical data dashboards

![Architecture Overview](img/neotree-functional-overview.png)

In addition we are currently working on data integration to national aggregate data systems.

The technology consists of different services. Source code for each service is stored in separate Github repositories:

1. [The Neotree Mobile App](https://github.com/neotree/neotree-react-native-app). This application is run on Android tablets and mobile phones in the Neonatal wards and is used by Health Care Workers to guide workflow and data capture when patients are admitted and discharged. In addition, the app is also used to record lab results. Each workflow (e.g. for "admission" or "discharge" is determined via a "script", which can be customized via the web editor. (See below.) This means that the app can quickly be adapted in different environments. The app is designed to work with low or no connectivity: connectivity is only required to sync scripts (if e.g. an admission or discharge form has been updated) and post data to the backend.
2. [The Neotree Web Editor](https://github.com/neotree/neotree-editor). This is an application that clinicians can use to customize each script i.e. what questions, prompts and data is collected when a patient is admitted, discharged etc. The scripts with the configuration information are stored in the Neotree backend (see below).
3. [The Neotree backend](https://github.com/neotree/node-api). The backend stores consists of a database and an API for managing the flow of data from the front end to the database. The database stores two types of data:
  * The script configuration information. This data is customized in the webeditor, and determines what information, question and data is collected through the different workflows. (Admission, discharge etc.)
  * The actual data posted from the app when e.g. a baby is admitted or discharged.
4. [The Neotree Data Pipeline](https://github.com/neotree/neotree-data-pipeline-kedro). This takes the data in the database collected from the app and reshapes it into a format that makes it easier to visualize and dashboard, to serve back to staff in hospital and integrate with aggregate data systems. 

[Neotree data dictionary](https://docs.google.com/spreadsheets/d/1A0tPnsYasLHmFonjtO2OtP8e6OEwW7hFS1egvh7uV80/edit): A comprehensive and evolving list of clinical and sociodemographic data collected via the Neotree app on current implementation sites.

## Demo

An end-to-end demo of the Neotree is available. For login credentials please email neotreedemo@gmail.com. (Login credentials are needed for the demo app, webeditor and Metabase.)

Demo app

* Download the demo Android app [here](https://drive.google.com/file/d/1hYEzko1rH7NQq83hGH2O0f2raT8JNn0_/view?usp=sharing). 
* You can view video instructions to download and setup the video [here](https://youtu.be/H280y_h_ueo), and instructions to use the app [here](https://youtu.be/68wHtgXewM0)
* It includes four demonstration "scripts". You can enter in dummy records (e.g. admissions, discharges) and export the data via the jsonapi

Demo data visualisation

* A demonstration instance of [Metabase](https://github.com/metabase/metabase) setup on top of demo data is available on https://demo-metabase.neotree.org to query, visualize and socialize the Neotree data
* A demo dashboard is available on https://demo-metabase.neotree.org/dashboard/1
* This illustrates the types of view on the data used in neonatal wards runnning the Neotree
* A video showing how data entered in the demo app is then available in Metabase for exploration can be viewed [here](https://youtu.be/MwbjNsB3KDA)

Demo webeditor

* The webeditor enales clinicians and hospital management to tailor the app experience without any need to edit the underlying code
* You can view a demonstration of the webeditor on https://demo-webeditor.neotree.org. Here you can view the functionality for customising the different scripts in the app or adding additional scripts
* A instructional video is available [here](https://youtu.be/FLOFAuZXAjw)
* Instructions on how to use the web editor can be found [here](https://github.com/neotree/neotree-editor/blob/master/editor-usage-instructions.pdf)

## Setting up the Neotree for yourself

Setup instructions for each of the different modeles of the Neotree can be found in their own repos. We would recommend setting up the modules in the following order:

1. [The Neotree backend](https://github.com/neotree/node-api)
2. [The Neotree Web Editor](https://github.com/neotree/neotree-editor). Note that this can be setup on the same instane running the Neotree backend
3. [The Neotree Mobile App](https://github.com/neotree/neotree-react-native-app)
4. [The Neotree Data Pipeline](https://github.com/neotree/neotree-data-pipeline-kedro)

After that we recommend setting up Metabase or a similar visualization to make the data generated by the data pipeline (in the `derived` schema in Postgres) accessible / queryable to staff in the Neonatal ward.
