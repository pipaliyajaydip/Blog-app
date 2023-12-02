import { render, screen } from "@testing-library/react";

import Login from "./Login";

describe("Login page",() => {
    
    test("Should be displayed wipro blog", () => {
        render(<Login />);
        const text = screen.getByText(/Blog/i);
        expect(text).toBeInTheDocument()

    })
})
