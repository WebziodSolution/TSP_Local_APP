package com.calcsalary.webapp;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Bridge;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Get the Capacitor Bridge instance
        Bridge bridge = getBridge();

        // Create and set your custom WebChromeClient
        // The constructor now takes the Bridge object.
        bridge.getWebView().setWebChromeClient(new MyWebChromeClient(bridge));

        // Your existing line for media playback is fine here.
        bridge.getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
    }
}
