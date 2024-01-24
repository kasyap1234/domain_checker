const express = require("express");
const whois = require("whois");
const app = express();
const port = 3000;

function checkDomainAvailability(domain) {
  return new Promise((resolve, reject) => {
    whois.lookup(domain, (err, data) => {
      if (err) {
        resolve(false);
      } else {
        const notFoundIndicators = [
          "Domain not found",
          "No match for domain",
          "NOT FOUND",
          "Status: free",
        ];

        const isAvailable = notFoundIndicators.some((indicator) =>
          data.includes(indicator),
        );

        resolve(isAvailable);
      }
    });
  });
}

const domainToCheck = "nike.com";

// Check domain availability
checkDomainAvailability(domainToCheck)
  .then((isAvailable) => {
    if (isAvailable) {
      console.log(`${domainToCheck} is available.`);
    } else {
      console.log(`${domainToCheck} is not available.`);
    }
  })
  .catch((error) => {
    console.error(`Error checking domain availability: ${error.message}`);
  });
