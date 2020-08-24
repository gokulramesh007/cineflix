import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import { movieService } from "../../../services";
import { moviesMock } from "../../../constants";
import { MovieList } from "../../../components";

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
    render(<MovieList />, container);
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});

it("render with mock data", async () => {
  const movies = await movieService.getMovies();
  //console.log(movies);
  expect(movies[0].title).toEqual("Anand");

  jest
    .spyOn(movieService, "getMovies")
    .mockImplementation(() => Promise.resolve(moviesMock.data));

  await act(async () => {
    render(<MovieList />, container);
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();

  movieService.getMovies.mockRestore();
});
