import React from "react"


import { Header } from "../src/components/Header"
import { render, fireEvent } from "@testing-library/react"

test("Dropdown menus closed on loading", () => {
  const { getByText } = render(<Header />)

  expect(getByText("Frequently Asked Questions")).not.toBeVisible()
})

test("Dropdown menus can open", async () => {
  const { getByText } = render(<Header />)

  fireEvent.click(getByText("About Us"))

  await expect(getByText("Frequently Asked Questions")).toBeVisible()
})