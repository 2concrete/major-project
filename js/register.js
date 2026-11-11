/*jshint esversion: 6 */

// Script - register.js
// This script validates a form.
// Version 1.0.0

import { addErrorMessage, removeErrorMessage } from "./errorMessages.js";
import { U } from "./utilities.js";

// Function called when the form is submitted.
// Function validates the form data.
function validateForm(e) {
  "use strict";

  // Get the event object:
  if (typeof e == "undefined") e = window.event;

  // Prevent the form from navigating away after submission:
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }

  // Get form references:
  var firstName = U.$("firstName");
  var email = U.$("email");
  var phone = U.$("phone");

  // Flag variable:
  var error = false;

  // Validate the first name:
  if (/^[A-Z \.\-']{2,20}$/i.test(firstName.value)) {
    removeErrorMessage("firstName");
  } else {
    addErrorMessage("firstName", "Please enter your first name.");
    error = true;
  }

  // Validate the email address:
  if (/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(email.value)) {
    removeErrorMessage("email");
  } else {
    addErrorMessage("email", "Please enter your email address.");
    error = true;
  }

  // Validate the phone number:
  if (/^\s*(?:(?:0[2-8])\s?[0-9]{4}\s?[0-9]{4}|04[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}|\+?61\s?[2-8]\s?[0-9]{4}\s?[0-9]{4}|\+?61\s?4[0-9]{2}\s?[0-9]{3}\s?[0-9]{3})\s*$/.test(phone.value)) {
    removeErrorMessage("phone");
  } else {
    addErrorMessage("phone", "wrong format");
    error = true;
  }

  // If an error occurred, stop processing the submission:
  if (error) {
    return false;
  }
} // End of validateForm() function.

// Function called when the terms checkbox changes.
// Function enables and disables the submit button.
function toggleSubmit() {
  "use strict";


  // Get a reference to the submit button:
  var submit = U.$("submit");

  // Toggle its disabled property:
  if (U.$("terms").checked) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
} // End of toggleSubmit() function.

// Establish functionality on window load:
window.onload = function () {
  "use strict";

  // The validateForm() function handles the form:
  U.addEvent(U.$("theForm"), "submit", validateForm);

  // Disable the submit button to start:
  U.$("submit").disabled = true;

  // Watch for changes on the terms checkbox:
  U.addEvent(U.$("terms"), "change", toggleSubmit);

  // Enbable tooltips on the phone number:
  U.enableTooltips("phone");
};
