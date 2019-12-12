import React from "react"


import { Header } from "../../src/components/Header"
import { render, fireEvent } from "@testing-library/react"

test("Dropdown menus closed on loading", async () => {
  const { getByText } = render(<Header />)

  await expect(getByText("Frequently Asked Questions")).not.toBeVisible()
})

test("Dropdown menus can open", async () => {
  const { getByText } = render(<Header />)

  fireEvent.click(getByText("About Us"))

  await expect(getByText("Frequently Asked Questions")).toBeVisible()
})

test("Dropdown menus close when other menus clicked", async () => {
  const { getByText } = render(<Header />)

  fireEvent.click(getByText("About Us"))
  fireEvent.click(getByText("Organisation"))

  await expect(getByText("Frequently Asked Questions")).not.toBeVisible()
})