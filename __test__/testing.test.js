import { render, fireEvent } from "@testing-library/react-native";
import LoginMain from "../src/components/LoginMain";
import AsyncStorage from '@react-native-async-storage/async-storage';

test("renders login screen and submits form", () => {
    const { getByPlaceholderText, getByText } = render(<LoginMain />);
    
    const emailInput = getByPlaceholderText("Enter Email");
    const passwordInput = getByPlaceholderText("Enter Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    expect(getByText("Logging in...")).toBeTruthy();
});
