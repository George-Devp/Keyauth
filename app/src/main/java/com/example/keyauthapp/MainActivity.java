package com.example.keyauthapp;

import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());

        // Load local HTML file
        webView.loadUrl("file:///android_asset/index.html");

        // Add JavaScript Interface
        webView.addJavascriptInterface(new WebAppInterface(), "Android");
    }

    public class WebAppInterface {
        @JavascriptInterface
        public void onLoginSuccess(String username, String password) {
            // You can call your KeyAuth API here
            // Show Toast message on successful login
            Toast.makeText(MainActivity.this, "Logged in as: " + username, Toast.LENGTH_SHORT).show();
        }
    }
}
