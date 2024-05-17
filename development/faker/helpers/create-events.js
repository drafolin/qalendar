const getListOfTimePropertiesForEvents = require("../event-properties/time");
const { NUMBER_OF_EVENTS } = require("../faker-config");
const getRandomElementInArray = require("./get-random-element-in-array");
const eventTitles = require("../event-properties/event-titles");
const names = require("../event-properties/names");
const colors = require("../event-properties/color");
const descriptions = require("../event-properties/descriptions");
const locations = require("../event-properties/locations");
const topics = require("../event-properties/topics");
const urls = require("../event-properties/url");

const createEvents = (monthArg = null) => {
  const events = [];
  const times = getListOfTimePropertiesForEvents(monthArg);

  while (events.length < NUMBER_OF_EVENTS) {
    const time = getRandomElementInArray(times);

    let event = {
      title: getRandomElementInArray(eventTitles),
      with: getRandomElementInArray(names),
      time: {
        start: time.start,
        end: time.end,
      },
      color: getRandomElementInArray(colors),
      isEditable: true,
      id:
        Math.random().toString(16).substring(2, 8) +
        Math.random().toString(16).substring(2, 8),
    };

    if (Math.random() < 0.5)
      event.description = getRandomElementInArray(descriptions);
    if (Math.random() < 0.5)
      event.location = getRandomElementInArray(locations);
    if (Math.random() < 0.4)
      event.topic = getRandomElementInArray(topics);
    if (Math.random() < 0.5)
      event.url = getRandomElementInArray(urls);

    events.push(event);
  }

  // Sort events according to time.start, for easier debugging, if something breaks
  return events.sort((a, b) => {
    if (a.time.start > b.time.start) return 1;
    if (a.time.start < b.time.start) return -1;

    return 0;
  });
};

module.exports = createEvents;
