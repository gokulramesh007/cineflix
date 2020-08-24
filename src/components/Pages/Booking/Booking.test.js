import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import { reserveService } from "../../../services";
import { Booking } from "../../../components";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render with no data", async () => {
  await act(async () => {
    render(<Booking />, container);
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});

it("render with mock data", async () => {

  const preferences = await reserveService.getBookingPreferences();
  console.log(preferences);

  jest
    .spyOn(reserveService, "getBookingPreferences")
    .mockImplementation(() => Promise.resolve(preferences));

  jest
    .spyOn(reserveService, "reserveBooking")
    .mockImplementation(() => Promise.resolve({ booking: "success" }));

  await act(async () => {
    render(<Booking />, container);
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();

  reserveService.getBookingPreferences.mockRestore();
  reserveService.reserveBooking.mockRestore();

});
