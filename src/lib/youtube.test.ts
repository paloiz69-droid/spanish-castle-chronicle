import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { getYoutubeVideoId } from "./youtube";

describe("individual documentary identification", () => {
  test("retains Xivert's supplied video ID", () => {
    assert.equal(getYoutubeVideoId("https://youtu.be/E5fFov0byw4"), "E5fFov0byw4");
  });
  test("retains Busot's supplied video ID", () => {
    assert.equal(getYoutubeVideoId("https://www.youtube.com/watch?v=Q7jne0C38uU&t=30"), "Q7jne0C38uU");
  });
  test("does not assign a documentary when no URL exists", () => {
    assert.equal(getYoutubeVideoId(undefined), undefined);
  });
  test("rejects channels, incomplete IDs and unofficial hosts", () => {
    for (const url of ["https://www.youtube.com/@Kdronazo", "https://youtu.be/short", "https://youtube.com.example.org/watch?v=E5fFov0byw4", "not a URL"]) {
      assert.equal(getYoutubeVideoId(url), undefined);
    }
  });
});