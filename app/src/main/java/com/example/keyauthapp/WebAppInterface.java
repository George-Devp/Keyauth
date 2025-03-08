package com.example.keyauthapp;

import android.content.Context;
import android.widget.Toast;
import android.webkit.JavascriptInterface;

public class WebAppInterface {

    private Context mContext;

    // Instantiate the interface and set the context
    WebAppInterface(Context c) {
        mContext = c;
    }

    // This method will be called from JavaScript using the 'Android' object
    @JavascriptInterface
    public void onLoginSuccess(String username, String password) {
        // Show a toast message with the login information
        Toast.makeText(mContext, "Logged in successfully! Username: " + username + " Password: " + password, Toast.LENGTH_SHORT).show();

        // You can also send the login data to your API here, e.g., to verify the user with KeyAuth
        // For now, let's simulate a successful login
        verifyLogin(username, password);
    }

    // You can use this method to simulate a login verification with an API
    private void verifyLogin(String username, String password) {
        // Simulating an API call to verify login credentials
        // You can replace this with actual network requests to KeyAuth API

        if (username.equals("test") && password.equals("password123")) {
            Toast.makeText(mContext, "Login Verified! Welcome " + username, Toast.LENGTH_LONG).show();
        } else {
            Toast.makeText(mContext, "Invalid credentials. Please try again.", Toast.LENGTH_LONG).show();
        }
    }
}
