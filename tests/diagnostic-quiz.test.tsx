import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DiagnosticQuiz } from "@/components/diagnostic-quiz";

describe("DiagnosticQuiz", () => {
  it("requires contact details before revealing the transparent result", () => {
    render(<DiagnosticQuiz />);
    fireEvent.click(screen.getByRole("button", { name: /continue to journey/i }));
    fireEvent.click(screen.getByRole("button", { name: /continue to fit/i }));
    fireEvent.click(screen.getByRole("button", { name: /see my result/i }));
    expect(screen.getByLabelText(/work email/i)).toBeRequired();
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Clinic Owner" } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "owner@example.com" } });
    fireEvent.change(screen.getByLabelText(/clinic name/i), { target: { value: "North Clinic" } });
    fireEvent.click(screen.getByLabelText(/send my report/i));
    fireEvent.click(screen.getByRole("button", { name: /reveal my clinic result/i }));
    expect(screen.getByRole("heading", { name: /patient conversion system/i })).toBeVisible();
    expect(screen.getByText(/illustrative estimate, not a guarantee/i)).toBeVisible();
    expect(screen.getByText(/10% relative improvement/i)).toBeVisible();
  });
});
