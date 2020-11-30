# openmrs-esm-primary-navigation
[![Build Status](https://travis-ci.com/openmrs/openmrs-esm-primary-navigation.svg?branch=master)](https://travis-ci.com/openmrs/openmrs-esm-primary-navigation)

An [OpenMRS Microfrontend](https://wiki.openmrs.org/display/projects/Frontend+-+SPA+and+Microfrontends).

## What is this?

openmrs-esm-primary-navigation is an in-browser 
[javascript module](https://github.com/openmrs/openmrs-rfc-frontend/blob/master/text/0002-modules.md) 
that is a [single-spa application](https://single-spa.js.org/docs/building-applications.html).
It is responsible for rendering the top navbar.

## How do I use it?

openmrs-esm-primary-navigation is registered as a
[core application](https://github.com/openmrs/openmrs-esm-root-config/blob/master/src/single-spa-applications/core-applications.js)
inside of openmrs-esm-root-config. This means that it will automatically activate 
whenever you are on one of the frontend routes that it controls.

## Contributing / Development

[Setup local development environment for OpenMRS SPA](https://wiki.openmrs.org/display/projects/Setup+local+development+environment+for+OpenMRS+SPA)
