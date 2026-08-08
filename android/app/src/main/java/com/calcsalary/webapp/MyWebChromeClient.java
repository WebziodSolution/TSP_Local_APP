package com.calcsalary.webapp;

// This is the correct import for the Android WebChromeClient class.
import android.webkit.WebChromeClient;
import android.webkit.PermissionRequest;
import com.getcapacitor.Bridge;

public class MyWebChromeClient extends WebChromeClient {
    // You can't pass the BridgeActivity directly to the super constructor.
    // Instead, you'll need a different way to access the bridge if needed,
    // but the onPermissionRequest method doesn't need it.

    private final Bridge bridge;

    public MyWebChromeClient(Bridge bridge) {
        super(); // Call the default WebChromeClient constructor
        this.bridge = bridge;
    }

    @Override
    public void onPermissionRequest(final PermissionRequest request) {
        // Automatically grant all permissions requested by the web content.
        request.grant(request.getResources());
    }
}
