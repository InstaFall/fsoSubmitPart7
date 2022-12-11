import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlog from "./NewBlog";

test("NewBlog Form calls the event handler from props", async () => {
  const user = userEvent.setup();
  const fn = jest.fn();
  const container = render(<NewBlog addBlog={fn} />).container;
  //screen.debug()
  const newBlog = {
    title: "A Blog Title",
    author: "John Doe",
    url: "http://example.org",
  };

  const titleInput = container.querySelector('[name="title"]');
  await user.type(titleInput, "A Blog Title");
  const authorInput = container.querySelector('[name="author"]');
  await user.type(authorInput, "John Doe");
  const urlInput = container.querySelector('[name="url"]');
  await user.type(urlInput, "http://example.org");

  const createButton = screen.getByText("create");
  screen.debug(createButton);
  await user.click(createButton);
  expect(fn).toHaveBeenCalledWith(newBlog);
});
